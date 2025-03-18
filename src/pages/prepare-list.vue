<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md">
      <div class="table-container">
        <div class="header-section q-mb-md">
          <q-img
            src="https://r.resimlink.com/FBGpL.png"
            alt="logo"
            height="130px"
            width="300px"
            class="q-mb-md"
          />

          <div class="input-section">
            <q-input
              filled
              v-model="companyName"
              label="Firma İsmi"
              class="q-mb-sm"
              dense
              style="width: 400px"
              :rules="[(val) => !!val || 'Firma ismi gereklidir.']"
            />
            <q-input
              filled
              v-model="preparedBy"
              label="Listeyi Hazırlayan Kişi"
              class="q-mb-sm"
              dense
              style="width: 400px"
              disable
            />
          </div>
          <div v-if="!companyName" class="text-negative q-mt-sm">
            * Firma ismi zorunludur!
          </div>
          <q-table :rows="rows" :columns="columns" class="q-mb-md">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name">
                  <template v-if="col.name === 'adet' || col.name === 'fiyat'">
                    <q-input
                      v-model.number="props.row[col.name]"
                      dense
                      type="number"
                      min="0"
                      @update:model-value="updateTotal(props.row)"
                    />
                  </template>
                  <template v-else>
                    <span>{{ props.row[col.name] }}</span>
                  </template>
                </q-td>
                <q-td>
                  <q-btn
                    icon="delete"
                    dense
                    flat
                    color="negative"
                    @click="deleteRow(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>

          <div class="button-container">
            <q-btn
              label="Yazdır"
              color="primary"
              class="q-mr-sm"
              @click="generatePDF"
            />
            <q-btn
              label="Yeni Satır Ekle"
              color="secondary"
              class="q-mr-sm"
              @click="showAddModal"
            />

            <q-btn label="Geri Dön" color="accent" @click="goBack" />
          </div>
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
              label="Barkod Numarası"
              class="q-mb-sm"
              dense
              :rules="[(val) => !!val || 'Barkod Numarası gereklidir.']"
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
            <q-btn
              label="İptal"
              color="negative"
              flat
              @click="isAddModalOpen = false"
            />
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
        <div class="scanner-container">
          <div class="scanner-header">
            <h2>Barcode Scanner</h2>
            <q-btn
              :color="isScanning ? 'negative' : 'primary'"
              :label="isScanning ? 'Stop Scanner' : 'Start Scanner'"
              @click="toggleScanner"
              :icon="isScanning ? 'stop' : 'play_arrow'"
            />
          </div>

          <div class="scanner-view q-pa-md">
            <div id="scanner" ref="scannerRef" class="scanner-box"></div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useQuasar } from "quasar";
import { product } from "src/composables/product";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Html5Qrcode } from "html5-qrcode";
const updateTotal = (row) => {
  if (row.adet < 0) row.adet = 0; // Negatif değer engelle
  if (row.fiyat < 0) row.fiyat = 0;

  row.toplamFiyat = (row.adet * row.fiyat).toFixed(2);
};
const $q = useQuasar();
const { getAllProduct, addProduct } = product();

interface Product {
  barkodNo: string;
  aciklama: string;
  fiyat: number;
  adet: number;
  toplamFiyat?: string;
}
const generatePDF = () => {
  if (!companyName.value) {
    $q.notify({
      type: "negative",
      message: "Lütfen firma ismini giriniz!",
    });
    return;
  }
  const doc = new jsPDF();

  // Sayfanın başına Firma İsmi, Hazırlayan Kişi ve Tarih bilgisi ekleyelim
  const currentDate = new Date().toLocaleDateString("tr-TR");
  const fileName = `${currentDate}_${companyName.value}_${preparedBy.value}.pdf`;

  doc.setFontSize(16);
  doc.text("Ürün Listesi", 14, 20);
  doc.setFontSize(12);
  doc.text(`Firma İsmi: ${companyName.value}`, 14, 30);
  doc.text(`Listeyi Hazırlayan: ${preparedBy.value}`, 14, 40);
  doc.text(`Tarih: ${currentDate}`, 14, 50);

  // Tablo başlıkları
  const tableHeaders = [
    "Barkod Numarası",
    "Açıklama",
    "Fiyat",
    "Adet",
    "Toplam Fiyat",
  ];

  // Tablo içeriği ve toplam hesaplama
  let grandTotal = 0;
  const tableData = rows.value.map((row) => {
    const total = row.fiyat * row.adet; // Satır toplamını hesapla
    grandTotal += total; // Genel toplamı güncelle
    return [row.barkodNo, row.aciklama, row.fiyat, row.adet, total.toFixed(2)];
  });

  // Tabloyu oluştur
  autoTable(doc, {
    startY: 60, // Tablo başlangıç noktası
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [63, 81, 181] }, // Başlık rengi (Mavi)
  });

  // Toplam Tutarı yazdır
  // Toplam Tutarı yazdır (Sayfanın en sağına hizala)
  const finalY = doc.lastAutoTable.finalY + 10; // Tablo sonrasına ekle
  doc.setFontSize(12);

  const pageWidth = doc.internal.pageSize.width; // Sayfanın genişliğini al
  const textWidth = doc.getTextWidth(
    `Toplam Tutar: ${grandTotal.toFixed(2)} TL`
  ); // Metnin genişliğini hesapla
  const xPosition = pageWidth - textWidth - 14; // Sağ kenara hizala (sağdan biraz boşluk bırak)

  doc.text(`Toplam Tutar: ${grandTotal.toFixed(2)} TL`, xPosition, finalY);

  // PDF'i kaydet
  doc.save(fileName);
};

const companyName = ref<string>("");
const preparedBy = ref<string>(localStorage.getItem("username") || "");
const rows = ref<Product[]>([]);
const isAddModalOpen = ref<boolean>(false);
const isScanning = ref<boolean>(false);
const scannerRef = ref<HTMLDivElement | null>(null);
let html5QrCode: Html5Qrcode | null = null;

const newProduct = ref<Product>({
  barkodNo: "",
  aciklama: "",
  fiyat: 0,
  adet: 0,
});

const columns = [
  { name: "barkodNo", label: "Barkod Numarası", align: "left" },
  { name: "aciklama", label: "Açıklama", align: "left" },
  { name: "fiyat", label: "Fiyat", align: "left" },
  { name: "adet", label: "Adet", align: "left" },
  { name: "toplamFiyat", label: "Toplam Fiyat", align: "right" },
];

const showAddModal = () => {
  isAddModalOpen.value = true;
};

const addRow = async () => {
  if (
    !newProduct.value.barkodNo ||
    !newProduct.value.aciklama ||
    newProduct.value.fiyat <= 0 ||
    newProduct.value.adet <= 0
  ) {
    $q.notify({
      type: "negative",
      message: "Lütfen tüm alanları eksiksiz doldurun!",
    });
    return;
  }

  try {
    const response = await addProduct(newProduct.value);
    if (response) {
      const existingItem = rows.value.find(
        (item) => item.barkodNo.trim() === response.data.barcode.trim()
      );

      if (!existingItem) {
        rows.value = [
          ...rows.value,
          {
            barkodNo: response.data.barcode,
            aciklama: response.data.description,
            fiyat: response.data.price,
            adet: response.data.quantity,
            toplamFiyat: (response.data.price * response.data.quantity).toFixed(
              2
            ),
          },
        ];
        await nextTick();
        isAddModalOpen.value = false;
        newProduct.value = { barkodNo: "", aciklama: "", fiyat: 0, adet: 0 };
      } else {
        console.log("Ürün zaten eklenmiş:", existingItem);
      }
    }
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
  }
};

const deleteRow = (row: Product) => {
  rows.value = rows.value.filter((item) => item.barkodNo !== row.barkodNo);
  $q.notify({
    color: "positive",
    message: "Ürün başarıyla silindi!",
    icon: "check",
  });
};

const startScanner = async () => {
  if (!scannerRef.value) return;
  html5QrCode = new Html5Qrcode("scanner");
  isScanning.value = true;

  await html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => handleScanSuccess(decodedText),
    (errorMessage) => console.log(errorMessage)
  );
};

const stopScanner = async () => {
  if (html5QrCode?.isScanning) {
    await html5QrCode.stop();
    isScanning.value = false;
  }
};

const handleScanSuccess = async (decodedText: string) => {
  const response = await getAllProduct({ barcode: decodedText });

  if (response?.data?.length > 0) {
    console.log("Taranan ürün bilgileri:", response.data);

    // Zaten eklenmiş ürünleri kontrol et
    const existingBarcodes = new Set(rows.value.map((row) => row.barkodNo));

    const newProducts = response.data
      .filter((item) => !existingBarcodes.has(item.barcode)) // Daha önce eklenmemiş ürünleri filtrele
      .map((item) => ({
        barkodNo: item.barcode,
        aciklama: item.description,
        fiyat: item.price,
        adet: item.quantity,
        toplamFiyat: (item.price * item.quantity).toFixed(2),
      }));

    if (newProducts.length > 0) {
      rows.value = [...rows.value, ...newProducts];
      await nextTick();
      $q.notify({
        type: "positive",
        message: "Yeni ürün(ler) listeye eklendi!",
        position: "center",
      });
    } else {
      console.log("Barkod zaten listede:", decodedText);
      $q.notify({
        type: "info",
        message: "Bu ürün zaten listede!",
        position: "center",
      });
    }
  } else {
    console.log("Barkod bulunamadı:", decodedText);
    $q.notify({
      type: "warning",
      message: "Ürün bulunamadı!",
      position: "center",
    });
  }
};

const toggleScanner = () => {
  isScanning.value ? stopScanner() : startScanner();
};

onMounted(() => startScanner());
onUnmounted(() => stopScanner());
</script>
<style scoped>
.scanner-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.scanner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.scanner-view {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #000;
}

.scanner-box {
  width: 100%;
  height: 100%;
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border: 2px solid #42b883;
  box-sizing: border-box;
  border-radius: 8px;
}

.scanner-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #42b883;
  animation: scan 2s linear infinite;
}

.scanned-codes {
  margin-top: 1rem;
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

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
@media (max-width: 960px) {
  .input-section {
    display: block;
  }
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
