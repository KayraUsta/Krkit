<template>
  <div class="stock-container">
    <transition name="fade-slide">
      <div class="stock-form">
        <h2 class="stock-title">📦 Stok Tanıtım Kaydı</h2>
        <form @submit.prevent="saveStock" class="form-content">

          <q-input
            outlined
            v-model="barcodeNumber"
            label="Barkod Numarası"
            class="input-field"
            color="pink-6"
          >
            <template #prepend>
              <q-icon name="qr_code_scanner" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="productDescription"
            label="Ürün Açıklaması"
            class="input-field"
            color="pink-6"
          >
            <template #prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="price"
            label="Fiyat"
            type="number"
            class="input-field"
            color="pink-6"
            suffix="₺"
          >
            <template #prepend>
              <q-icon name="attach_money" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="quantity"
            label="Miktar"
            type="number"
            class="input-field"
            color="pink-6"
            suffix="Adet"
          >
            <template #prepend>
              <q-icon name="inventory_2" />
            </template>
          </q-input>

          <q-btn
            unelevated
            type="submit"
            class="stock-button"
            label="Kaydet"
            no-caps
          />
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { product } from 'src/composables/product'

const { addProduct } = product()
const $q = useQuasar()

const barcodeNumber = ref('')
const productDescription = ref('')
const price = ref('')
const quantity = ref(1)
const defaultCompanyName = "ABC Şirketi"

const saveStock = async () => {
  if (!barcodeNumber.value || !productDescription.value || !price.value) {
    $q.notify({
      type: 'negative',
      message: 'Lütfen tüm alanları doldurun!',
    })
    return
  }

  try {
    const productRequest = {
      barcode: barcodeNumber.value,
      description: productDescription.value,
      price: Number(price.value),
      companyName: defaultCompanyName,
      quantity: Number(quantity.value)
    }

    const response = await addProduct(productRequest)

    if (!response.ok) throw new Error('Stok kaydedilemedi')

    $q.notify({
      type: 'positive',
      message: 'Stok başarıyla kaydedildi!',
    })

    barcodeNumber.value = ''
    productDescription.value = ''
    price.value = ''
    quantity.value = 1
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Bir hata oluştu: ' + error.message,
    })
    console.error(error)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.stock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  font-family: 'Poppins', sans-serif;
}

.stock-form {
  background: #ffffff;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.stock-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #444;
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-field {
  margin-bottom: 1.5rem;
  transition: all 0.2s ease-in-out;
}

.q-input__control {
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.stock-button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #A566D7;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 14px rgba(165, 102, 215, 0.3);
}

.stock-button:hover {
  background-color: #8e55c5 !important;
  transform: scale(1.02);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
