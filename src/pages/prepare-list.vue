<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          <q-img src="https://r.resimlink.com/FBGpL.png" alt="logo" height="130px" width="300px" class="q-mb-md" />

          <div class="input-section">
            <!-- Firma İsmi Label olarak eklendi -->
            <div class="q-mb-sm"></div>
            
            <q-input
              filled
              v-model="companyName"
              label="Firma İsmi"
              class="q-mb-sm"
              dense
              style="width: 400px;"
              :rules="[(val) => !!val || 'Firma ismi gereklidir.']"
            />
            <q-input filled v-model="preparedBy" label="Listeyi Hazırlayan Kişi" class="q-mb-sm" dense style="width: 400px;" disable />
          </div>

          <!-- Firma İsmi boşsa uyarı label'ı ekleniyor -->
          <div v-if="!companyName" class="q-mt-sm text-negative">
            Firma ismi gereklidir.
          </div>
        </div>

        <q-table :rows="rows" :columns="columns" class="q-mb-md">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name">
                <span>{{ props.row[col.name] }}</span>
              </q-td>
              <q-td>
                <q-btn icon="edit" dense flat color="primary" @click="showEditModal(props.row)" />
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="button-container">
          <q-btn icon="camera_alt" label="Ürün Ekle" color="primary" class="q-mr-sm" @click="showAddModal" />
          <q-btn label="Son Satırı Sil" color="negative" class="q-mr-sm" @click="deleteRow" />
          <q-btn label="Yazdır" color="secondary" class="q-mr-sm" @click="printTable" />
          <q-btn label="Geri Dön" color="accent" @click="goBack" />
        </div>
      </div>

      <!-- Ürün Ekleme Modal'ı -->
      <q-dialog v-model="addModalOpen">
        <q-card style="width: 600px;">
          <q-card-section>
            <div class="text-h6">Yeni Ürün Ekle</div>
            <q-input v-model="newProduct.barcode" label="Barkod Numarası" />
            <q-input v-model="newProduct.description" label="Ürün Açıklaması" />
            <q-input v-model="newProduct.price" label="Fiyat" type="number" />
            <q-input v-model="newProduct.quantity" label="Adet" type="number" />
          </q-card-section>
          <q-card-actions>
            <q-btn flat label="İptal" color="negative" @click="addModalOpen = false" />
            <q-btn flat label="Ekle" color="primary" @click="addProduct" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Ürün Düzenleme Modal'ı -->
      <q-dialog v-model="editModalOpen">
        <q-card style="width: 600px;">
          <q-card-section>
            <div class="text-h6">Seçilen Ürünü Düzenle</div>
            <q-input v-model="editProduct.barcode" label="Barkod Numarası" />
            <q-input v-model="editProduct.description" label="Ürün Açıklaması" />
            <q-input v-model="editProduct.price" label="Fiyat" type="number" />
            <q-input v-model="editProduct.quantity" label="Adet" type="number" />
          </q-card-section>
          <q-card-actions>
            <q-btn flat label="İptal" color="negative" @click="editModalOpen = false" />
            <q-btn flat label="Güncelle" color="primary" @click="updateProduct" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="q-pa-md">
        <VisionCamera />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from 'quasar';
  import { product } from 'src/composables/product';
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import VisionCamera from 'components/VisionCamera.vue';
  import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
  
  const $q = useQuasar();
  const { getAllProduct } = product();
  const companyName = ref("");
  const preparedBy = ref(localStorage.getItem('username') || ""); 
  
  const rows = ref([]);
  const columns = [
    { name: "barkodNo", label: "Barkod Numarası", align: "left" },
    { name: "aciklama", label: "Ürün Açıklaması", align: "left" },
    { name: "fiyat", label: "Fiyat", align: "left" },
    { name: "adet", label: "Adet", align: "left" },
    { name: "toplamFiyat", label: "Toplam Fiyat", align: "right" }
  ];
  
  const addModalOpen = ref(false);
  const editModalOpen = ref(false);
  const isCameraOpen = ref(false);
  
  const newProduct = ref({ barcode: "", description: "", price: "", quantity: "" });
  const editProduct = ref({ barcode: "", description: "", price: "", quantity: "" });
  
  const fetchProducts = async () => {
    try {
      const response = await getAllProduct();
      if (response && response.data) {
        rows.value = response.data.map(product => ({
          barkodNo: product.barcode,
          aciklama: product.description,
          fiyat: product.price,
          adet: product.quantity,
          toplamFiyat: (product.price * product.quantity).toFixed(2)
        }));
      }
    } catch (error) {
      console.error("Ürünler getirilirken hata oluştu:", error);
    }
  };
  
  const showAddModal = () => {
    addModalOpen.value = true;
  };
  
  const addProduct = () => {
    if (!newProduct.value.barcode || !newProduct.value.description || !newProduct.value.price || !newProduct.value.quantity) {
      $q.notify({ color: 'negative', message: 'Tüm alanları doldurmalısınız!', icon: 'warning' });
      return;
    }
  
    const price = parseFloat(newProduct.value.price);
    const quantity = parseInt(newProduct.value.quantity);
  
    if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      $q.notify({ color: 'negative', message: 'Geçerli bir fiyat ve adet giriniz!', icon: 'warning' });
      return;
    }
  
    rows.value.push({
      barkodNo: newProduct.value.barcode,
      aciklama: newProduct.value.description,
      fiyat: price.toFixed(2),
      adet: quantity,
      toplamFiyat: (price * quantity).toFixed(2)
    });
  
    newProduct.value = { barcode: "", description: "", price: "", quantity: "" };
    addModalOpen.value = false;
  
    $q.notify({ color: 'positive', message: 'Ürün başarıyla eklendi!', icon: 'check' });
  };
  
  const scanBarcode = async () => {
    try {
      const permission = await BarcodeScanner.checkPermission({ force: true });
  
      if (!permission.granted) {
        $q.dialog({
          title: 'Kamera İzni Gerekli',
          message: 'Barkod taramak için kameraya erişim izni vermelisiniz.',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await BarcodeScanner.checkPermission({ force: true });
        });
        return;
      }
  
      isCameraOpen.value = true;
      const result = await BarcodeScanner.startScan();
  
      if (result.hasContent) {
        newProduct.value.barcode = result.content;
        $q.notify({ type: 'positive', message: 'Barkod başarıyla okundu.' });
        isCameraOpen.value = false;
      } else {
        $q.notify({ type: 'negative', message: 'Barkod okunamadı.' });
      }
    } catch (error) {
      console.error("Barkod tarama hatası:", error);
      $q.notify({ type: 'negative', message: 'Barkod tarama sırasında bir hata oluştu.' });
    }
  };
  
  const printTable = () => {
    if (!companyName.value) {
      $q.notify({ color: 'negative', message: 'Firma ismi gereklidir!', icon: 'warning' });
      return;
    }
  
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const fileName = `urun_listesi_${companyName.value}_${date}.pdf`;
  
    doc.text("Ürün Listesi", 10, 10);
    doc.text(`Firma: ${companyName.value}`, 10, 20);
    doc.text(`Tarih: ${date}`, 10, 30);
  
    autoTable(doc, {
      startY: 40,
      head: [["Barkod Numarası", "Ürün Açıklaması", "Fiyat", "Adet", "Toplam Fiyat"]],
      body: rows.value.map(row => [row.barkodNo, row.aciklama, row.fiyat, row.adet, row.toplamFiyat]),
    });
  
    doc.save(fileName);
  };
  
  const deleteRow = () => {
    if (rows.value.length === 0) {
      $q.notify({
        color: 'negative',
        message: 'Silinecek satır yok!',
        icon: 'warning'
      });
      return;
    }

    rows.value.pop();

    $q.notify({
      color: 'positive',
      message: 'Son satır başarıyla silindi!',
      icon: 'check'
    });
  };
  
  const showEditModal = (row) => {
    editProduct.value = { ...row }; // Set the data for the product to be edited
    editModalOpen.value = true; // Open the modal
  };

  const updateProduct = () => {
    // Update the row with the new values from editProduct
    const index = rows.value.findIndex((row) => row.barkodNo === editProduct.value.barcode);
    if (index !== -1) {
      rows.value[index] = { ...editProduct.value };
      $q.notify({ color: 'positive', message: 'Ürün başarıyla güncellendi!', icon: 'check' });
    } else {
      $q.notify({ color: 'negative', message: 'Ürün bulunamadı!', icon: 'warning' });
    }
    editModalOpen.value = false; // Close the modal after updating
  };
  
  onMounted(() => {
    fetchProducts();
  });
</script>

<style scoped>
  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
  }
  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .header-section {
    text-align: center;
  }
  .q-pa-md {
    max-width: 1100px;
    margin: 0 auto;
  }
</style>
