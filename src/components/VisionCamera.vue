<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import { useQuasar } from 'quasar';
import { product } from 'src/composables/product';

const $q = useQuasar();
const { getAllProduct } = product();

const rows = ref([]);
const columns = ref([
  { name: "barkodNo", label: "Barkod No", field: "barkodNo", align: "left" },
  { name: "aciklama", label: "Açıklama", field: "aciklama", align: "left" },
  { name: "fiyat", label: "Fiyat", field: "fiyat", align: "right" },
  { name: "adet", label: "Adet", field: "adet", align: "right" },
  { name: "toplamFiyat", label: "Toplam Fiyat", field: "toplamFiyat", align: "right" }
]);

const loading = ref(false);
const veriModeli = ref({}); // API çağrısına gönderilecek model

const scannedCodes = ref<string[]>([]);
const scannedProducts = ref<any[]>([]);
const isScanning = ref(false);
const scannerRef = ref<HTMLDivElement | null>(null);
let html5QrCode: Html5Qrcode | null = null;

const startScanner = async () => {
  if (!scannerRef.value) return;

  try {
    html5QrCode = new Html5Qrcode("scanner");
    isScanning.value = true;

    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  } catch (err) {
    console.error("Error starting scanner:", err);
    $q.notify({
      type: 'negative',
      message: 'Failed to start camera. Please check permissions.'
    });
    isScanning.value = false;
  }
};

const stopScanner = async () => {
  if (html5QrCode && html5QrCode.isScanning) {
    try {
      await html5QrCode.stop();
      isScanning.value = false;
    } catch (err) {
      console.error("Error stopping scanner:", err);
    }
  }
};

const handleScanSuccess = async (decodedText: string) => {
  if (!scannedCodes.value.includes(decodedText)) {
    scannedCodes.value.unshift(decodedText);
  }

  // API'yi çağırarak ürünü getir
  try {
    const response = await getAllProduct({ barcode: decodedText });

    if (response && 'data' in response && Array.isArray(response.data) && response.data.length > 0) {
      scannedProducts.value.unshift(...response.data);
      $q.notify({
        type: 'positive',
        message: 'Ürün bulundu!',
        position: 'center',
        timeout: 1000
      });
    } else {
      $q.notify({
        type: 'warning',
        message: 'Ürün bulunamadı!',
        position: 'center',
        timeout: 1000
      });
    }
  } catch (error) {
    console.error("Ürün bilgisi alınırken hata:", error);
    $q.notify({
      type: 'negative',
      message: 'Ürün bilgisi alınamadı!',
      position: 'center'
    });
  }
};



const toggleScanner = () => {
  if (isScanning.value) {
    stopScanner();
  } else {
    startScanner();
  }
};

onMounted(() => {
  startScanner();
});

onUnmounted(() => {
  stopScanner();
});

</script>




<template>
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
</template>



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
</style>
