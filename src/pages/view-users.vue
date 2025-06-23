<template>
  <q-page class="q-pa-md">
    <div class="user-page">
      <div class="user-card">
        <h2 class="table-title">👤 Kullanıcı Listesi</h2>

        <q-input
          v-model="search"
          dense
          outlined
          debounce="300"
          clearable
          placeholder="Kullanıcı adına göre ara..."
          color="pink-6"
          class="search-bar"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="markup-table">
          <table>
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th class="text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="kullanici in filteredUsers" :key="kullanici.id">
                <td>{{ kullanici.username }}</td>
                <td class="text-right">
                  <q-btn
                    color="primary"
                    flat
                    round
                    dense
                    icon="more_vert"
                  >
                    <q-menu cover auto-close>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="silKullanici(kullanici.id)">
                          <q-item-section avatar>
                            <q-icon name="delete" color="negative" />
                          </q-item-section>
                          <q-item-section>Kullanıcıyı Sil</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="sifirlaSifre(kullanici)">
                          <q-item-section avatar>
                            <q-icon name="lock_reset" color="orange" />
                          </q-item-section>
                          <q-item-section>Şifreyi Sıfırla</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { user } from 'src/composables/user';

const $q = useQuasar();
const { getAllUser, deleteUser } = user();

const search = ref("");
const kullanicilar = ref([]);

const fetchKullanicilar = async () => {
  try {
    const response = await getAllUser();
    if (response && response.status === 200) {
      kullanicilar.value = response.data;
    }
  } catch (error) {
    console.error("Kullanıcılar alınamadı:", error);
  }
};

const silKullanici = async (id) => {
  $q.dialog({
    title: "Onay",
    message: "Bu kullanıcıyı silmek istediğinize emin misiniz?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      const response = await deleteUser(id);
      if (response && response.status === 200) {
        $q.notify({ type: "positive", message: "Kullanıcı silindi." });
        await fetchKullanicilar();
      }
    } catch (error) {
      console.error("Silme hatası:", error);
      $q.notify({ type: "negative", message: "Silinemedi!" });
    }
  });
};

const sifirlaSifre = (kullanici) => {
  console.log("Şifre sıfırlanıyor:", kullanici.username);
  $q.notify({
    type: "info",
    message: `${kullanici.username} için şifre sıfırlama özelliği yakında aktif.`,
  });
};

const filteredUsers = computed(() => {
  if (!search.value) return kullanicilar.value;
  return kullanicilar.value.filter((k) =>
    k.username.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(fetchKullanicilar);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

.user-page {
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.user-card {
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.table-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 1rem;
  text-align: center;
}

.search-bar {
  margin-bottom: 1.5rem;
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
</style>