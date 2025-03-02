<template>
  <q-page class="q-pa-md">
    <q-table
      title="Stok Listesi"
      :rows="stoklar"
      :columns="kolonlar"
      row-key="id"
      flat
      bordered
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const stoklar = ref([]);

    const kolonlar = [
      { name: "id", label: "Barkod Numarası", align: "left", field: "id" },
      { name: "urun_adi", label: "Ürün Adı", align: "left", field: "urun_adi" },
      { name: "fiyat", label: "Fiyat (₺)", align: "right", field: "fiyat" }
    ];

    // API'den stok verilerini çekme
    const fetchStoklar = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stoklar");
        stoklar.value = response.data;
      } catch (error) {
        console.error("Stok verileri alınırken hata oluştu:", error);
      }
    };

    onMounted(fetchStoklar);

    return { stoklar, kolonlar };
  }
};
</script>
