<template>
  <q-page class="q-pa-md">
    <div class="collection-page">
      <div class="collection-card">
        <h2 class="page-title">💰 Tahsilat İşlemleri</h2>

        <q-input
          v-model="search"
          outlined
          dense
          debounce="300"
          clearable
          placeholder="İsim / Ünvan ile ara..."
          color="pink-6"
          class="search-bar"
          :style="{ maxWidth: '400px' }"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="button-row q-my-md">
          <q-btn
            label="Yeni Tahsilat Gir"
            color="pink-6"
            unelevated
            @click="openTahsilatDialog"
            class="btn-action"
          />
          <q-btn
            label="Cari Ekle"
            color="primary"
            unelevated
            @click="goToCustomer"
            class="btn-action"
          />
        </div>

        <div class="markup-table">
          <table>
            <thead>
              <tr>
                <th>İsim / Ünvan</th>
                <th>Tarih</th>
                <th>Açıklama</th>
                <th class="text-right">İşlem Bakiyesi</th>
                <th class="text-right">Son Hesap Bakiyesi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredTahsilatlar" :key="index">
                <td>{{ item.unvan }}</td>
                <td>{{ formatDate(item.tarih) }}</td>
                <td>{{ item.aciklama }}</td>
                <td class="text-right">{{ formatCurrency(item.islemBakiyesi) }}</td>
                <td class="text-right">{{ formatCurrency(item.sonHesapBakiyesi) }}</td>
              </tr>
              <tr v-if="filteredTahsilatlar.length === 0">
                <td colspan="5" class="text-center text-grey">Kayıt bulunamadı.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tahsilat Dialog -->
        <q-dialog v-model="tahsilatDialog" persistent>
          <q-card class="dialog-card">
            <q-card-section class="dialog-header">
              <div class="text-h6">Yeni Tahsilat Gir</div>
              <q-btn
                icon="close"
                flat
                dense
                round
                @click="tahsilatDialog = false"
              />
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-form @submit.prevent="saveTahsilat" class="tahsilat-form">
                <q-select
                  v-model="form.unvan"
                  :options="unvanOptions"
                  label="İsim / Ünvan"
                  outlined
                  color="pink-6"
                  class="input-field"
                  emit-value
                  map-options
                  clearable
                />
                <q-input
                  v-model="form.tarih"
                  label="Tarih"
                  type="date"
                  outlined
                  color="pink-6"
                  class="input-field"
                />
                <q-input
                  v-model="form.aciklama"
                  label="Açıklama"
                  outlined
                  color="pink-6"
                  class="input-field"
                />
                <q-input
                  v-model.number="form.islemBakiyesi"
                  label="İşlem Bakiyesi"
                  type="number"
                  outlined
                  color="pink-6"
                  class="input-field"
                />
                <q-input
                  :value="currentSonHesapBakiyesi"
                  label="Son Hesap Bakiyesi"
                  outlined
                  color="grey-5"
                  readonly
                  class="input-field"
                />
                <div class="dialog-btns">
                  <q-btn
                    label="İptal"
                    color="grey"
                    flat
                    unelevated
                    @click="tahsilatDialog = false"
                  />
                  <q-btn
                    label="Kaydet"
                    color="pink-6"
                    unelevated
                    type="submit"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
const tahsilatDialog = ref(false);

const tahsilatlar = ref([
  {
    unvan: 'ABC Ticaret',
    tarih: '2025-06-01',
    aciklama: 'Fatura ödemesi',
    islemBakiyesi: 1500.5,
    sonHesapBakiyesi: 5000,
  },
  {
    unvan: 'XYZ Ltd.',
    tarih: '2025-06-10',
    aciklama: 'Kredi kartı tahsilatı',
    islemBakiyesi: -300,
    sonHesapBakiyesi: 1200,
  },
  {
    unvan: 'Mehmet Yılmaz',
    tarih: '2025-06-15',
    aciklama: 'Nakit ödeme',
    islemBakiyesi: 0,
    sonHesapBakiyesi: 700,
  },
]);

const filteredTahsilatlar = computed(() => {
  if (!search.value) return tahsilatlar.value;
  return tahsilatlar.value.filter((item) =>
    item.unvan.toLowerCase().includes(search.value.toLowerCase())
  );
});

const unvanOptions = computed(() => {
  // Benzersiz unvan listesi dropdown için
  const uniqueUnvans = new Set(tahsilatlar.value.map(t => t.unvan));
  return Array.from(uniqueUnvans).map(u => ({ label: u, value: u }));
});

const form = ref({
  unvan: null,
  tarih: '',
  aciklama: '',
  islemBakiyesi: null,
});

const currentSonHesapBakiyesi = computed(() => {
  const found = tahsilatlar.value.find(t => t.unvan === form.value.unvan);
  return found ? found.sonHesapBakiyesi.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' }) : '';
});

watch(() => form.value.unvan, () => {
  // İşlem bakiyesi sıfırlanabilir veya başka mantık eklenebilir
  form.value.islemBakiyesi = null;
});

const formatCurrency = (value) => {
  if (typeof value !== 'number') return '';
  return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

function goToCustomer() {
  router.push('/customer');
}

function openTahsilatDialog() {
  form.value = {
    unvan: null,
    tarih: new Date().toISOString().substring(0, 10), // Bugünün tarihi
    aciklama: '',
    islemBakiyesi: null,
  };
  tahsilatDialog.value = true;
}

function saveTahsilat() {
  if (!form.value.unvan || !form.value.tarih || form.value.islemBakiyesi === null) {
    alert('Lütfen zorunlu alanları doldurun!');
    return;
  }

  // Yeni tahsilatı listeye ekle
  tahsilatlar.value.push({
    unvan: form.value.unvan,
    tarih: form.value.tarih,
    aciklama: form.value.aciklama,
    islemBakiyesi: form.value.islemBakiyesi,
    sonHesapBakiyesi: 
      (tahsilatlar.value.find(t => t.unvan === form.value.unvan)?.sonHesapBakiyesi || 0) + form.value.islemBakiyesi,
  });

  tahsilatDialog.value = false;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.collection-page {
  min-height: 100vh;
  padding: 40px 60px;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  display: flex;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
}

.collection-card {
  background: white;
  width: 100%;
  max-width: 960px;
  border-radius: 20px;
  padding: 40px 35px;
  box-shadow: 0 16px 40px rgba(107, 70, 193, 0.2);
  transition: box-shadow 0.3s ease;
}

.collection-card:hover {
  box-shadow: 0 20px 50px rgba(107, 70, 193, 0.35);
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #4a148c;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.05em;
}

.search-bar {
  margin-bottom: 1.5rem;
  max-width: 100%;
  font-size: 1.1rem;
}

.button-row {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-action {
  min-width: 180px;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(107, 70, 193, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
}

.btn-action:hover {
  box-shadow: 0 10px 25px rgba(107, 70, 193, 0.5);
}

.markup-table {
  overflow-x: auto;
  border-radius: 15px;
  border: 1px solid #ddd;
  box-shadow: 0 6px 20px rgba(107, 70, 193, 0.1);
}

.markup-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.markup-table th {
  background-color: #e9d9ff;
  font-weight: 700;
  color: #6b46c1;
  padding: 16px 18px;
  text-align: left;
  font-size: 1.2rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  user-select: none;
}

.markup-table td {
  background-color: #faf7ff;
  padding: 16px 18px;
  font-size: 1.1rem;
  color: #3c1361;
  vertical-align: middle;
  border-bottom: 10px solid transparent;
  border-radius: 12px;
}

.markup-table td.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-grey {
  color: #999;
}

/* Dialog */
.dialog-card {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(107, 70, 193, 0.3);
  font-family: 'Poppins', sans-serif;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #6b46c1;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
}

.tahsilat-form .input-field {
  margin-bottom: 1.2rem;
  width: 100%;
  font-size: 1.1rem;
}

.dialog-btns {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}
</style>