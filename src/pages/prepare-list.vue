<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          <q-img src="https://r.resimlink.com/FBGpL.png" alt="logo" height="130px" width="300px" class="q-mb-md" />

          <div class="input-section">
            <q-input
              filled
              v-model="companyName"
              label="Firma İsmi"
              class="q-mb-sm"
              dense
              style="width: 400px;"
              :rules="[(val) => !!val || 'Firma ismi gereklidir.']"
            />
            <q-input filled v-model="preparedBy" label="Listeyi Hazırlayan Kişi" class="q-mb-sm" dense style="width: 400px;" />
          </div>
        </div>

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
                <q-btn
                  v-if="props.cols.some(col => col.name === 'barkodNo')"
                  icon="camera_alt"
                  @click="scanBarcode(props.row)"
                  dense
                  flat
                  color="primary"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div class="button-container">
          <q-btn label="Yazdır" color="primary" class="q-mr-sm" @click="printTable" />
          <q-btn label="Yeni Satır Ekle" color="secondary" class="q-mr-sm" @click="showAddModal" />
          <q-btn label="Satır Sil" color="negative" class="q-mr-sm" @click="deleteRow" />
          <q-btn label="Geri Dön" color="accent" @click="goBack" />
        </div>
      </div>

      <!-- Ürün Ekleme Modali -->
      <q-dialog v-model="isAddModalOpen">
        <q-card style="width: 400px">
          <q-card-section>
            <div class="text-h6">Yeni Ürün Ekle</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              filled
              v-model="newProduct.companyName"
              label="Firma İsmi"
              class="q-mb-sm"
              dense
              :rules="[(val) => !!val || 'Firma ismi gereklidir.']"
            />
            <q-input
              filled
              v-model="newProduct.description"
              label="Açıklama"
              class="q-mb-sm"
              dense
              :rules="[(val) => !!val || 'Açıklama gereklidir.']"
            />
            <q-input
              filled
              type="number"
              v-model="newProduct.price"
              label="Fiyat"
              class="q-mb-sm"
              dense
              :rules="[(val) => val > 0 || 'Fiyat 0’dan büyük olmalıdır.']"
            />
            <q-input
              filled
              type="number"
              v-model="newProduct.quantity"
              label="Adet"
              class="q-mb-sm"
              dense
              :rules="[(val) => val > 0 || 'Adet 0’dan büyük olmalıdır.']"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="İptal" color="negative" flat @click="isAddModalOpen = false" />
            <q-btn label="Ekle" color="primary" @click="addRow" />
          </q-card-actions>
        </q-card>
      </q-dialog>



      <!-- Kamera Kapat Butonu -->
      <q-dialog v-model="isCameraOpen" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-btn
              icon="close"
              color="negative"
              @click="closeCamera"
              label="Kamerayı Kapat"
            />
          </q-card-section>
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
import { product } from 'src/composables/product';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useQuasar } from 'quasar';
import VisionCamera from 'components/VisionCamera.vue';





const isActive = ref(false);

const startCamera = () => {
  isActive.value = true;
};

const closeCamera = () => {
  isActive.value = false;
};

const devicesLoaded = (devices) => {
  console.log(devices);
};

const opened = (camera) => {
  console.log(arguments);
  console.log(camera);
  console.log("emit opened");
};

const closed = () => {
  console.log("emit closed");
};



const $q = useQuasar();
const { getAllProduct, addProduct } = product();

const companyName = ref("");
const preparedBy = ref("");
const rows = ref([]);
const isAddModalOpen = ref(false);
const isCameraOpen = ref(false); // Kamera açık/kapalı durumu

const newProduct = ref({
  companyName: "",
  barcode: "",
  description: "",
  price: 0,
  quantity: 0
});

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

const showAddModal = () => {
  isAddModalOpen.value = true;
};

const addRow = async () => {
  try {
    if (!newProduct.value.companyName || !newProduct.value.barcode || !newProduct.value.description || newProduct.value.price <= 0 || newProduct.value.quantity <= 0) {
      console.log("Eksik ya da hatalı veri girildi.");
      return;
    }

    const response = await addProduct({
      companyName: newProduct.value.companyName,
      barcode: newProduct.value.barcode,
      description: newProduct.value.description,
      price: newProduct.value.price,
      quantity: newProduct.value.quantity
    });

    if (response && response.isSuccessful) {
      rows.value.push({
        barkodNo: response.data.barcode,
        aciklama: response.data.description,
        fiyat: response.data.price,
        adet: response.data.quantity,
        toplamFiyat: (response.data.price * response.data.quantity).toFixed(2)
      });

      console.log("Yeni ürün başarıyla eklendi:", response.data);
      isAddModalOpen.value = false;
      newProduct.value = { companyName: "", barcode: "", description: "", price: 0, quantity: 0 };
    } else {
      console.error("Ürün eklenirken hata oluştu:", response);
    }
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
  }
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

const fetchProducts = async () => {
  try {
    const response = await getAllProduct();
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

const scanBarcode = async (row) => {
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

    // Kamera açıldığını belirt
    isCameraOpen.value = true;

    // Kamerayı başlat
    await BarcodeScanner.startScan();

    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      row.barkodNo = result.content;
      $q.notify({
        type: 'positive',
        message: 'Barkod başarıyla okundu.'
      });

      // Barkod okunduğunda kamerayı kapat
      closeCamera();
    } else {
      $q.notify({
        type: 'negative',
        message: 'Barkod okunamadı.'
      });
    }
  } catch (error) {
    console.error("Barkod tarama hatası:", error);
    $q.notify({
      type: 'negative',
      message: 'Barkod tarama sırasında bir hata oluştu.'
    });
  }
};



onMounted(() => {
  fetchProducts();
});
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
.vision-camera {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.close-btn {
  top: 0;
  right: 0;
  position: absolute;
}

</style>
