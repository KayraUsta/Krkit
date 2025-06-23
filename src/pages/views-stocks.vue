<template>
  <q-page class="page-container">
    <div class="stock-content">
      <h2 class="table-title">📦 Stok Listesi</h2>

      <q-input
        v-model="search"
        dense
        outlined
        placeholder="Ürün adı, barkod ya da açıklama ile ara..."
        class="search-bar"
        color="purple-6"
        clearable
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="markup-table">
        <table>
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.name">{{ col.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filteredRows" :key="index">
              <td>
                <q-input
                  dense
                  filled
                  v-model="row.barkodNo"
                  placeholder="Barkod"
                  class="table-input"
                />
              </td>
              <td>
                <q-input
                  dense
                  filled
                  v-model="row.aciklama"
                  placeholder="Açıklama"
                  class="table-input"
                />
              </td>
              <td>
                <q-input
                  dense
                  filled
                  type="number"
                  v-model="row.fiyat"
                  placeholder="Fiyat"
                  suffix="₺"
                  class="table-input"
                />
              </td>
              <td>
                <q-input
                  dense
                  filled
                  type="number"
                  v-model="row.adet"
                  placeholder="Adet"
                  suffix="Adet"
                  class="table-input"
                />
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0">
              <td colspan="4" class="text-center text-grey">Kayıt bulunamadı.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { product } from 'src/composables/product';

const { getAllProduct } = product();

const search = ref('');
const rows = ref([]);

const columns = [
  { name: "barkodNo", label: "Barkod Numarası" },
  { name: "aciklama", label: "Açıklama" },
  { name: "fiyat", label: "Fiyat" },
  { name: "adet", label: "Adet" },
];

const filteredRows = computed(() => {
  if (!search.value) return rows.value;
  const s = search.value.toLowerCase();
  return rows.value.filter(row =>
    row.barkodNo?.toString().toLowerCase().includes(s) ||
    row.aciklama?.toLowerCase().includes(s)
  );
});

const fetchProducts = async () => {
  try {
    const response = await getAllProduct();
    if (response?.data && Array.isArray(response.data)) {
      rows.value = response.data.map(product => ({
        barkodNo: product.barcode,
        aciklama: product.description,
        fiyat: product.price,
        adet: product.quantity,
      }));
    }
  } catch (error) {
    console.error("Hata:", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

.page-container {
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.stock-content {
  max-width: 1100px;
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

.table-input {
  font-size: 1.1rem;
  border-radius: 12px;
}

.text-center {
  text-align: center;
}

.text-grey {
  color: #999;
}
</style>