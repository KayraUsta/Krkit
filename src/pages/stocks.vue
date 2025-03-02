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
              v-model="barcodeNo"
              label="Barkod Numarası"
              class="q-mb-sm"
              dense
              style="width: 100%; max-width: 500px;"
            />
            <q-input
              filled
              v-model="preparedBy"
              label="Ürün Açıklaması"
              class="q-mb-sm"
              dense
              style="width: 100%; max-width: 500px;"
            />
            <q-input
              filled
              v-model="price"
              label="Fiyat"
              class="q-mb-sm"
              dense
              style="width: 100%; max-width: 500px;"
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
import { useRouter } from 'vue-router'
import { product } from 'src/composables/product' // product.ts dosyasındaki fonksiyonu import ediyoruz
const { addProduct } = product() // product.ts dosyasındaki fonksiyonu kullanabilmek için import ediyoruz


export default {
  setup() {
    const router = useRouter()
    const barcodeNo = ref('')
    const preparedBy = ref('')
    const price = ref('')

    // Sayfa yüklendikten sonra ekranda kaybolmayan bir işlev
    onMounted(() => {
      console.log("Sayfa başarıyla yüklendi.")
    })

    // Stok kaydını kaydetme fonksiyonu
    const saveStock = async () => {
      if (barcodeNo.value && preparedBy.value && price.value) {
        const data = {
          companyName: barcodeNo.value,
          description: preparedBy.value,
          price: parseFloat(price.value),
          quantity: 1, // Varsayılan olarak 1 ekledim, gerekirse değiştirilebilir
          barcode: barcodeNo.value,
        }

        // product.ts dosyasındaki addProduct fonksiyonunu çağırıyoruz
        const result = await addProduct(data) // API'yi burada çağırıyoruz

        if (result.ok === "Success") {
          console.log("Stok kaydedildi:", data)
        } else {
          console.log("Hata oluştu:", result.errors)
        }
      } else {
        console.log("Lütfen tüm alanları doldurun.")
      }
    }

    return {
      barcodeNo,
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
  height: 75vh; /* Flexible screen height */
  padding: 20px; /* Padding for better spacing */
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
  text-align: center; /* Center the header */
}

/* Kaydet Butonu */
.save-button-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
}

/* Input alanlarının hizalanması */
.input-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
}
</style>
