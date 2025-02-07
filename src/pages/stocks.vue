<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <!-- Table Container with centered content -->
      <div class="table-container center-container">
        <!-- Header Section -->
        <h4>Stok Kaydı Yap</h4>
        <div class="header-section q-mb-md">
          <!-- Firma İsmi ve Listeyi Hazırlayan Kişi -->
          <div class="input-section">
            <q-input
              filled
              v-model="companyName"
              label="Barkod Numarası"
              class="q-mb-sm"
              dense
              style="width: 500px;"
            />
            <q-input
              filled
              v-model="preparedBy"
              label="Ürün Açıklaması"
              class="q-mb-sm"
              dense
              style="width: 500px;"
            />
            <q-input
              filled
              v-model="price"
              label="Fiyat"
              class="q-mb-sm"
              dense
              style="width: 500px;"
            />
          </div>
        </div>

        <!-- Kaydet Button -->
        <div class="save-button-container">
          <q-btn
            color="primary"
            label="Kaydet"
            class="full-width"
            @click="saveStock"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const companyName = ref('')
    const preparedBy = ref('')
    const price = ref('')

    // Sayfa yüklendikten sonra ekranda kaybolmayan bir işlev
    onMounted(() => {
      console.log("Sayfa başarıyla yüklendi.")
    })

    const saveStock = () => {
      if (companyName.value && preparedBy.value && price.value) {
        console.log("Stok kaydedildi:", {
          companyName: companyName.value,
          preparedBy: preparedBy.value,
          price: price.value,
        })
      } else {
        console.log("Lütfen tüm alanları doldurun.")
      }
    }

    return {
      companyName,
      preparedBy,
      price,
      saveStock,
    }
  }
}
</script>

<style scoped>
/* Sayfanın ortalanması */
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh; /* Tam ekran yüksekliği */
}

/* Başlık Stil */
h4 {
  font-size: 2rem;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(90deg, #000000, #000000);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
}

/* Kaydet Butonu */
.save-button-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
}

/* Input alanlarının hizalanması */
.input-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
</style>
