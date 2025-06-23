<template>
  <q-page class="page-container">
    <div class="cards-wrapper">
      <div
        v-for="(item, index) in customers"
        :key="index"
        class="customer-card"
      >
        <h3 class="firm-title">{{ item.unvan }}</h3>
        <p class="detail-line">
          <q-icon name="person" size="24px" class="q-mr-md" />
          {{ item.yetkili }}
        </p>
        <p class="detail-line">
          <q-icon name="badge" size="24px" class="q-mr-md" />
          {{ item.vergiNo }}
        </p>

        <q-btn
          label="Detay Gör"
          class="detail-button"
          @click="openDialog(item)"
          color="deep-purple-5"
          unelevated
          no-caps
        />
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card class="dialog-card">
        <q-card-section>
          <div class="text-h5 text-center text-deep-purple-7">📋 Cari Detayı</div>
        </q-card-section>

        <q-card-section class="q-gutter-lg">
          <q-input
            v-model="selected.unvan"
            label="İsmi / Ünvanı"
            outlined
            color="deep-purple-5"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="business" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.vergiDairesi"
            label="Vergi Dairesi"
            outlined
            color="deep-purple-5"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="account_balance" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.vergiNo"
            label="Vergi / TC Kimlik No"
            outlined
            color="deep-purple-5"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="badge" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.yetkili"
            label="Yetkili Kişi"
            outlined
            color="deep-purple-5"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="person" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.telefon1"
            label="Telefon Numarası 1"
            outlined
            color="deep-purple-5"
            mask="(###) ### ## ##"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="call" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.telefon2"
            label="Telefon Numarası 2"
            outlined
            color="deep-purple-5"
            mask="(###) ### ## ##"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="phone_iphone" size="28px" /></template>
          </q-input>

          <q-input
            v-model="selected.bakiye"
            label="Açılış Bakiyesi"
            outlined
            color="deep-purple-5"
            type="number"
            suffix="₺"
            readonly
            :dense="false"
            class="large-input"
          >
            <template #prepend><q-icon name="account_balance_wallet" size="28px" /></template>
          </q-input>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-lg">
          <q-btn
            label="Kapat"
            color="deep-purple-5"
            text-color="white"
            unelevated
            @click="dialog = false"
            class="full-width q-py-md"
            rounded
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const selected = ref({});

const customers = ref([
  {
    unvan: "KRK İnşaat Ltd.",
    vergiDairesi: "Şişli VD",
    vergiNo: "12345678901",
    yetkili: "Kayra Usta",
    telefon1: "(531) 123 45 67",
    telefon2: "(533) 987 65 43",
    bakiye: "-1200"
  },
  {
    unvan: "ABC Yazılım A.Ş.",
    vergiDairesi: "Kadıköy VD",
    vergiNo: "10987654321",
    yetkili: "Ali Veli",
    telefon1: "(555) 111 22 33",
    telefon2: "(555) 444 55 66",
    bakiye: "4500"
  }
]);

function openDialog(item) {
  selected.value = { ...item };
  dialog.value = true;
}
</script>

<style scoped>
.page-container {
  padding: 40px 120px;
  background: linear-gradient(135deg, #f3e5f5, #e8f5e9);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
}

.customer-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
}

.customer-card:hover {
  transform: translateY(-4px);
}

.firm-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a148c;
  margin-bottom: 16px;
}

.detail-line {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.detail-button {
  margin-top: auto;
  font-weight: 500;
  font-size: 1rem;
  transition: 0.3s ease;
  border-radius: 8px;
  padding: 12px;
}

.dialog-card {
  width: 90vw;
  max-width: 600px;
  border-radius: 16px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.large-input {
  font-size: 1.1rem;
}

.full-width {
  width: 100%;
}
</style>