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
          <q-table
  :rows="rows"
  :columns="columns"
  class="q-mb-md"
  row-key="id"
  dense
  :rows-per-page-options="[5, 10, 15, 20]"
  :pagination="pagination"
>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td v-for="col in props.cols" :key="col.name">
        <!-- Tüm sayısal değerler için input (price, quantity) -->
        <template v-if="col.name === 'price' || col.name === 'quantity'">
          <q-input
            v-model.number="props.row[col.name]"
            dense
            type="number"
            min="0"
            @update:model-value="updateTotal(props.row)"
          />
        </template>
        <!-- Barkod ve açıklama için düzenlenebilir input -->
        <template v-else-if="col.name === 'barcode' || col.name === 'description'">
          <q-input
            v-model="props.row[col.name]"
            dense
            @blur="saveChanges(props.row)"
          />
        </template>
        <!-- Toplam fiyat (salt okunur) -->
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
            <div class="row justify-center q-mb-sm">
              <q-btn
                :color="isScanning ? 'negative' : 'primary'"
                :label="isScanning ? 'Stop Scanner' : 'Start Scanner'"
                @click="toggleScanner"
                :icon="isScanning ? 'stop' : 'play_arrow'"
              />
            </div>
            <!-- Kamera sadece isScanning TRUE iken gözüksün -->
            <div class="q-pa-md">
              <div class="scanner-container">
                <div class="scanner-view q-pa-md">
                  <div id="scanner" ref="scannerRef" class="scanner-box"></div>
                </div>
              </div>
            </div>
            <q-input
              filled
              v-model="newProduct.barcode"
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
  if (row.quantity < 0) row.quantity = 0; // Negatif değer engelle
  if (row.price < 0) row.price = 0;

  row.toplamFiyat = (row.quantity * row.price).toFixed(2);
};
const $q = useQuasar();
const { getAllProduct, addProduct } = product();
const pagination = ref({
  rowsPerPage: 10, // Varsayılan olarak 10 kayıt göster
});
interface Product {
  barcode: string;
  description: string;
  price: number;
  quantity: number;
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
  const currentDate = new Date().toLocaleDateString("tr-TR");
  const fileName = `${currentDate}_${companyName.value}_${preparedBy.value}.pdf`;

  doc.setFont("helvetica", "normal");

  // Başlık yazıları
  doc.setFontSize(18);
  doc.text("Ürün Listesi", 14, 20);

  // Firma ismi, Hazırlayan kişi ve tarih bilgisi
  doc.setFontSize(14);
  doc.text(`Firma Ismi: ${companyName.value}`, 14, 30);
  doc.text(`Listeyi Hazirlayan: ${preparedBy.value}`, 14, 40);
  doc.text(`Tarih: ${currentDate}`, 14, 50);

  // Tablo başlıkları
  const tableHeaders = [
    "Barkod Numarasi",
    "Açıklama",
    "Fiyat",
    "Adet",
    "Toplam Fiyat",
  ];

  // Tablo içeriği ve toplam hesaplama
  let grandTotal = 0;
  const tableData = rows.value.map((row) => {
    const total = row.price * row.quantity;
    grandTotal += total;
    return [row.barcode, row.description, row.price, row.quantity, total.toFixed(2)];
  });

  // En uzun "Açıklama" metnini bul ve genişliği hesapla
  const maxDescriptionLength = Math.max(
    ...rows.value.map((row) => row.description.length)
  );
  const descriptionWidth = Math.min(maxDescriptionLength * 5, 80); // Her karakter için yaklaşık 5 birim genişlik, maksimum 80 birim

  // Tabloyu oluştur
  autoTable(doc, {
    startY: 60,
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 12 },
    headStyles: { fillColor: [63, 81, 181] }, // Başlık rengi (Mavi)
    columnStyles: {
      0: { cellWidth: 40 }, // Barkod Numarası
      1: { cellWidth: descriptionWidth }, // Açıklama sütunu dinamik genişlik
      2: { cellWidth: 30 }, // Fiyat
      3: { cellWidth: 20 }, // Adet
      4: { cellWidth: 40 }, // Toplam Fiyat
    },
  });

  // Toplam Tutarı yazdır
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);

  const pageWidth = doc.internal.pageSize.width;
  const totalText = `Toplam Tutar: ${grandTotal.toFixed(2)} TL`;
  const textWidth = doc.getTextWidth(totalText);
  const xPosition = pageWidth - textWidth - 14;

  doc.text(totalText, xPosition, finalY);

  // KDV Hesaplama (Toplam Tutarın %20'si)
  const vat = grandTotal * 0.20;
  const vatText = `KDV : ${vat.toFixed(2)} TL`;
  const vatTextWidth = doc.getTextWidth(vatText);
  const vatXPosition = pageWidth - vatTextWidth - 14;

  doc.text(vatText, vatXPosition, finalY + 10);

  // KDV'li Toplam Fiyat
  const totalWithVat = grandTotal + vat;
  const totalWithVatText = `KDV'li Toplam Fiyat: ${totalWithVat.toFixed(2)} TL`;
  const totalWithVatTextWidth = doc.getTextWidth(totalWithVatText);
  const totalWithVatXPosition = pageWidth - totalWithVatTextWidth - 14;

  doc.text(totalWithVatText, totalWithVatXPosition, finalY + 20);

  doc.save(fileName);
};



const companyName = ref<string>("");
const preparedBy = ref<string>(localStorage.getItem("username") || "");
const isAddModalOpen = ref<boolean>(false);
const isScanning = ref<boolean>(false);
const scannerRef = ref<HTMLDivElement | null>(null);
let html5QrCode: Html5Qrcode | null = null;

const newProduct = ref({
  barcode: "",
  description: "",
  price: 0,
  quantity: 0,
});

const rows = ref([]);
const columns = [
  { name: "barcode", label: "Barkod Numarası", align: "left" },
  { name: "description", label: "Açıklama", align: "left" },
  { name: "price", label: "Fiyat", align: "left" },
  { name: "quantity", label: "Adet", align: "left" },
  { name: "toplamFiyat", label: "Toplam Fiyat", align: "right" },
];

const showAddModal = () => {
  isAddModalOpen.value = true;
};

const addRow = async () => {
  // Validasyon (barcode hariç, diğer alanlar zorunlu)
  if (!newProduct.value.description ||
      !newProduct.value.price ||
      !newProduct.value.quantity ||
      newProduct.value.price <= 0 ||
      newProduct.value.quantity <= 0) {

    let errorMessage = "Lütfen zorunlu alanları doldurun!";

    // Özel hata mesajları
    if (newProduct.value.price <= 0) {
      errorMessage = "Fiyat sıfırdan büyük olmalıdır!";
    } else if (newProduct.value.quantity <= 0) {
      errorMessage = "Miktar sıfırdan büyük olmalıdır!";
    }

    $q.notify({ type: "negative", message: errorMessage });
    return;
  }

  try {
    // Barkod boşsa 1 ata, değilse kendi değerini kullan
    const barcodeValue = newProduct.value.barcode.trim() === ""
  ? "FKS" + Math.floor(Math.random() * 1000000).toString()
  : newProduct.value.barcode;


      // API'ye gönderilecek veri
    const payload = {
      ...newProduct.value,
      barcode: barcodeValue, // Boşsa 1, değilse orijinal değer
      CompanyName: "DEFAULT_COMPANY", // Sabit şirket adı
    };

    const response = await addProduct(payload);
    console.log("API Yanıtı:", response);

    // Yeni ürünü listeye ekle
    const newItem = {
      barcode: barcodeValue, // Burada da aynı değeri kullan
      description: newProduct.value.description,
      price: newProduct.value.price,
      quantity: newProduct.value.quantity,
      toplamFiyat: (newProduct.value.price * newProduct.value.quantity).toFixed(2),
    };

    rows.value.push(newItem);

    // Modal'ı kapat ve formu temizle
    isAddModalOpen.value = false;
    newProduct.value = { barcode: "", description: "", price: 0, quantity: 0 };

    $q.notify({ type: "positive", message: "Ürün başarıyla eklendi!" });
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    $q.notify({
      type: "negative",
      message: error.response?.data?.errors?.CompanyName
        ? `Hata: ${error.response.data.errors.CompanyName}`
        : "Ürün eklenirken hata oluştu!",
    });
  }
};
const deleteRow = (row: Product) => {
  rows.value = rows.value.filter((item) => item.barcode !== row.barcode);
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
    const existingBarcodes = new Set(rows.value.map((row) => row.barcode));

    const newProducts = response.data
      .filter((item) => !existingBarcodes.has(item.barcode)) // Daha önce eklenmemiş ürünleri filtrele
      .map((item) => ({
        barcode: item.barcode,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
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

    // 🟢 Ürün zaten varsa, dialogu kapat
    stopScanner();
    isAddModalOpen.value = false;
  } else {
    console.log("Barkod bulunamadı:", decodedText);
    $q.notify({
      type: "warning",
      message: "Ürün bulunamadı!",
      position: "center",
    });
  }
};

const toggleScanner = async () => {
  if (isScanning.value) {
    await stopScanner();
  } else {
    await startScanner();
  }
};

// onMounted(() => startScanner());
onUnmounted(() => stopScanner());


const goBack = () => {
  if (window.history.length > 1) {
    window.history.back(); // Tarayıcı geçmişinde bir önceki sayfaya git
  } else {
    // Eğer geçmiş yoksa, ana sayfaya yönlendir
    this.$router.push("/"); 
  }
};

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
