<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          <q-img src="https://r.resimlink.com/FBGpL.png" alt="logo" height="130px" width="300px" class="q-mb-md" />

          <!-- Firma İsmi ve Listeyi Hazırlayan Kişi -->
          <div class="input-section">
            <q-input
              filled
              v-model="companyName"
              label="Firma İsmi"
              class="q-mb-sm"
              dense
              style="width: 400px;"
            />
            <q-input
              filled
              v-model="preparedBy"
              label="Listeyi Hazırlayan Kişi"
              class="q-mb-sm"
              dense
              style="width: 400px;"
            />
          </div>
        </div>

        <!-- Tablo -->
        <q-table
  :rows="rows"
  :columns="columns"
  :rows-per-page="rows.length"
  class="q-mb-md"
>
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
        <q-input
          v-else
          v-model="props.row[col.name]"
          dense
          filled
          readonly
          class="text-right"
        />
      </q-td>
    </q-tr>
  </template>
</q-table>


        <!-- Butonlar -->
        <div class="button-container">
          <q-btn label="Yazdır" color="primary" class="q-mr-sm" @click="printTable" />
          <q-btn label="Yeni Satır Ekle" color="secondary" class="q-mr-sm" @click="addRow" />
          <q-btn label="Satır Sil" color="negative" class="q-mr-sm" @click="deleteRow" />
          <q-btn label="Geri Dön" color="accent" @click="goBack" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const companyName = ref("");
    const preparedBy = ref("");
    const rows = ref([
      {
        barkodNo: "",
        aciklama: "",
        fiyat: "",
        adet: "",
        toplamFiyat: ""
      }
    ]);

    const columns = [
      { name: "barkodNo", label: "Barkod Numarası", align: "left" },
      { name: "aciklama", label: "Açıklama", align: "left" },
      { name: "fiyat", label: "Fiyat", align: "left" },
      { name: "adet", label: "Adet", align: "left" },
      { name: "toplamFiyat", label: "Toplam Fiyat", align: "right" }
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

    const addRow = () => {
      rows.value.push({
        barkodNo: "",
        aciklama: "",
        fiyat: "",
        adet: "",
        toplamFiyat: ""
      });
    };

    const deleteRow = () => {
      if (rows.value.length > 1) {
        rows.value.pop();
      }
    };

    const printTable = () => {
      window.print();
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      companyName,
      preparedBy,
      rows,
      columns,
      addRow,
      deleteRow,
      calculateTotal,
      printTable,
      goBack
    };
  }
};
</script>

<style scoped>
.table-container {
  max-width: 1500px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.q-table {
  max-width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.q-table th {
  background-color: #f4f4f4;
  color: #563164;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.q-btn {
  flex: 1;
}
</style>
