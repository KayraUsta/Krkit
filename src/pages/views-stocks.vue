<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          <q-img src="https://r.resimlink.com/FBGpL.png" alt="logo" height="130px" width="300px" class="q-mb-md" />



        <q-table :rows="rows" :columns="columns" :rows-per-page="rows.length" class="q-mb-md">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name">
                <q-input
                  v-if="col.name !== 'toplamFiyat'"
                  v-model="props.row[col.name]"
                  :placeholder="col.label"
                  dense
                  filled
                  @input="calculateTotal(props.row)"
                />
                <q-input v-else v-model="props.row[col.name]" dense filled readonly class="text-right" />
              </q-td>
              <q-td>

              </q-td>
            </q-tr>
          </template>
        </q-table>



      </div>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";


import { product } from 'src/composables/product';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { getAllProduct } = product();


const rows = ref([]);

const columns = [
  { name: "barkodNo", label: "Barkod Numarası", align: "left" },
  { name: "aciklama", label: "Açıklama", align: "left" },
  { name: "fiyat", label: "Fiyat", align: "left" },
];

const calculateTotal = (row) => {
  const price = parseFloat(row.fiyat);
  const quantity = parseInt(row.adet);
  if (price && quantity) {
    row.toplamFiyat = (price * quantity).toFixed(2);
  } else {
    row.toplamFiyat = "";
  }
};

const veriModeli = ref({
  Barcode: "",

});
const fetchProducts = async (verimodeli) => {
  try {
    const response = await getAllProduct(veriModeli.value);
    console.log("API Yanıtı:", response);

    if (response && response.data && Array.isArray(response.data)) {
      rows.value = response.data.map(product => ({
        barkodNo: product.barcode,
        aciklama: product.description,
        fiyat: product.price,
        adet: product.quantity,
        toplamFiyat: (product.price * product.quantity).toFixed(2)
      }));
      console.log("Tabloya Eklenen Veriler:", rows.value);
    } else {
      console.error("Beklenmeyen API Yanıtı:", response);
    }
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error);
  }
};
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>


</style>
