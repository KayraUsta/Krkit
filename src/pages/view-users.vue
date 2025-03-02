<template>
  <q-page class="q-pa-md">
    <q-table
      title="Kullanıcı Listesi"
      :rows="kullanicilar"
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
    const kullanicilar = ref([]);

    const kolonlar = [

      { name: "kullanici_adi", label: "Kullanıcı Adı", align: "left", field: "kullanici_adi" },
      { name: "sifre", label: "Şifre", align: "right", field: "sifre" }
    ];

    // API'den kullanıcıları çekme
    const fetchKullanicilar = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/kullanicilar");
        kullanicilar.value = response.data;
      } catch (error) {
        console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      }
    };

    onMounted(fetchKullanicilar);

    return { kullanicilar, kolonlar };
  }
};
</script>
