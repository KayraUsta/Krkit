<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          
        </div>

        <q-table :rows="rows" :columns="columns" class="q-mb-md" row-key="barkodNo">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name">{{ props.row[col.name] }}</q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="button-container">
          <q-btn color="primary" label="Excel Olarak Kaydet" @click="exportToExcel" />

        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { product } from "src/composables/product";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const $q = useQuasar();
const { getAllProduct } = product();
const companyName = ref("");
const rows = ref([]);
const columns = [
  { name: "barkodNo", label: "Barkod No", align: "left" },
  { name: "aciklama", label: "Ürün Açıklaması", align: "left" },
  { name: "fiyat", label: "Fiyat", align: "left" },
];

const fetchProducts = async () => {
  try {
    const response = await getAllProduct();
    if (response?.data) {
      rows.value = response.data.map(product => ({
        barkodNo: product.barcode,
        aciklama: product.description,
        fiyat: product.price.toFixed(2),
        adet: product.quantity,
        toplamFiyat: (product.price * product.quantity).toFixed(2)
      }));
    }
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error);
  }
};

import * as XLSX from "xlsx";

const exportToExcel = () => {


  const date = new Date().toLocaleDateString();
  const fileName = `urun_listesi_${companyName.value}_${date}.xlsx`;

  // Excel için veri formatı
  const worksheetData = [
    ["Barkod Numarası", "Ürün Açıklaması", "Fiyat", "Adet", "Toplam Fiyat"],
    ...rows.value.map(row => [row.barkodNo, row.aciklama, row.fiyat, row.adet, row.toplamFiyat])
  ];

  // SheetJS ile Excel dosyası oluştur
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ürün Listesi");

  // Excel dosyasını indir
  XLSX.writeFile(workbook, fileName);
};


onMounted(fetchProducts);
</script>

<style scoped>
.table-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.button-container {
  margin-top: 20px;
}
.text-negative {
  color: red;
  font-size: 14px;
}
</style>