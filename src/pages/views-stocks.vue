<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md text-center">
          <q-img
            src="https://r.resimlink.com/FBGpL.png"
            alt="logo"
            height="130px"
            width="300px"
            class="q-mb-md"
          />
        </div>

        <div class="markup-table">
          <table>
            <thead>
              <tr>
                <th v-for="col in columns" :key="col.name">
                  {{ col.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows" :key="index">
                <td v-for="col in columns" :key="col.name">
                  <q-input
                    v-if="col.name !== 'toplamFiyat'"
                    v-model="row[col.name]"
                    :placeholder="col.label"
                    dense
                    filled
                    @input="calculateTotal(row)"
                  />
                  <q-input
                    v-else
                    v-model="row[col.name]"
                    dense
                    filled
                    readonly
                    class="text-right"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
.header-section {
  display: flex;
  justify-content: center;
  width: 100%;
}

.markup-table {
  width: 100%;
  border-collapse: collapse;
}

.markup-table table {
  width: 100%;
  border: 1px solid #ddd;
}

.markup-table th {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.markup-table td {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.markup-table tr:last-child td {
  border-bottom: none;
}

.markup-table tr:hover {
  background-color: #f9f9f9;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}
</style>
