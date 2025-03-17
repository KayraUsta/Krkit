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
    <q-page-container class="q-pa-md flex flex-center">
      <q-card class="form-card">
        <q-card-section class="text-center">
          <h4>📦 Stok Kaydı Yap</h4>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-md">
          <q-input
            filled
            v-model="barcodeNumber"
            label="Barkod Numarası"
            class="full-width"
            dense
          />
          <q-input
            filled
            v-model="productDescription"
            label="Ürün Açıklaması"
            class="full-width"
            dense
          />
          <q-input
            filled
            v-model="price"
            label="Fiyat"
            type="number"
            class="full-width"
            dense
          />
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-btn
            color="primary"
            label="Kaydet"
            class="save-button"
            @click="saveStock"
          />
        </q-card-section>
      </q-card>
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
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const barcodeNumber = ref('')
    const productDescription = ref('')
    const price = ref('')
    const $q = useQuasar()

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
    const saveStock = async () => {
      if (!barcodeNumber.value || !productDescription.value || !price.value) {
        $q.notify({
          type: 'negative',
          message: 'Lütfen tüm alanları doldurun!',
        })
        return
      }

      try {
        const response = await fetch('https://api.example.com/stocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            barcode: barcodeNumber.value,
            description: productDescription.value,
            price: price.value,
          }),
        })

        if (!response.ok) throw new Error('Stok kaydedilemedi')

        $q.notify({
          type: 'positive',
          message: 'Stok başarıyla kaydedildi!',
        })

        barcodeNumber.value = ''
        productDescription.value = ''
        price.value = ''
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Bir hata oluştu!',
        })
        console.error(error)
      }
    }

    return {
      barcodeNo,
      preparedBy,
      barcodeNumber,
      productDescription,
      price,
      saveStock,
    }
  }
}
</script>

<style scoped>
/* Sayfa Ortalamak İçin */
.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh; /* Flexible screen height */
  padding: 20px; /* Padding for better spacing */

  height: 80vh;
}

/* Kart Tasarımı */
.form-card {
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Başlık Stili */
h4 {
  font-size: 1.5rem;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(90deg, #000000, #000000);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  text-align: center; /* Center the header */
  color: #333;
}

/* Kaydet Butonu */
.save-button {
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

  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}

.save-button:hover {
  background: #1976d2;
  color: white;
}

/* Responsive için Genişlik Ayarı */
.full-width {
  width: 100%;
}
</style>
