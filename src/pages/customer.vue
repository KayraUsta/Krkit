<template>
  <q-page class="q-pa-md">
    <div class="cari-page">
      <div class="cari-card">
        <!-- Yeni Buton -->
        <div class="q-mb-md" style="text-align: right;">
          <q-btn
            label="📄 Kayıtlı Carileri Gör"
            class="see-button"
            to="/view-customer"
            unelevated
          />
        </div>

        <h2 class="form-title">➕ Cari Hesap Ekle</h2>

        <div class="q-gutter-md q-mb-lg">
          <q-input v-model="form.unvan" label="İsmi / Ünvanı" outlined color="pink-6">
            <template #prepend><q-icon name="business" /></template>
          </q-input>

          <q-input v-model="form.vergiDairesi" label="Vergi Dairesi" outlined color="pink-6">
            <template #prepend><q-icon name="account_balance" /></template>
          </q-input>

          <q-input v-model="form.vergiNo" label="Vergi / TC Kimlik No" outlined color="pink-6">
            <template #prepend><q-icon name="badge" /></template>
          </q-input>

          <q-input v-model="form.yetkili" label="Yetkili Kişi" outlined color="pink-6">
            <template #prepend><q-icon name="person" /></template>
          </q-input>

          <q-input
            v-model="form.telefon1"
            label="Telefon Numarası 1"
            outlined
            color="pink-6"
            mask="(###) ### ## ##"
          >
            <template #prepend><q-icon name="call" /></template>
          </q-input>

          <q-input
            v-model="form.telefon2"
            label="Telefon Numarası 2"
            outlined
            color="pink-6"
            mask="(###) ### ## ##"
          >
            <template #prepend><q-icon name="phone_iphone" /></template>
          </q-input>

          <q-input
            v-model="form.bakiye"
            label="Açılış Bakiyesi (Firma sizden alacaklı ise eksi girin)"
            outlined
            color="pink-6"
            type="number"
            suffix="₺"
          >
            <template #prepend><q-icon name="account_balance_wallet" /></template>
          </q-input>
        </div>

        <!-- Kaydet Butonu -->
        <q-btn
          label="Kaydet"
          class="full-width save-button"
          @click="kaydet"
          unelevated
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const form = ref({
  unvan: '',
  vergiDairesi: '',
  vergiNo: '',
  yetkili: '',
  telefon1: '',
  telefon2: '',
  bakiye: ''
});

const kaydet = () => {
  if (!form.value.unvan) {
    $q.notify({ type: 'negative', message: 'İsim/Ünvan zorunludur.' });
    return;
  }

  console.log("Cari Ekleme Verileri:", form.value);
  $q.notify({ type: 'positive', message: 'Cari başarıyla eklendi!' });
};

const goruntule = () => {
  console.log('Kayıtlı cariler görüntülenecek.');
  // Örneğin: router.push('/cariler');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.cari-page {
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.cari-card {
  max-width: 700px;
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 1.5rem;
  text-align: center;
}

.full-width {
  width: 100%;
}

.save-button {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #A566D7;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(165, 102, 215, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-button:hover {
  background-color: #8e55c5 !important;
  transform: scale(1.02);
}

.see-button {
  font-weight: 500;
  background-color: #A566D7;
  color: white;
  border-radius: 8px;
  padding: 8px 18px;
  transition: 0.3s ease;
  font-size: 0.95rem;
}

.see-button:hover {
  background-color: #8e55c5 !important;
}
</style>
