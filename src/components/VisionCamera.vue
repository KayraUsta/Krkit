<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const scannedCodes = ref<string[]>([]);
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
        // Success callback
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        // Error callback
        // console.log(errorMessage);
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

const handleScanSuccess = (decodedText: string) => {
  // Show scanning effect
  $q.notify({
    type: 'positive',
    message: 'Barcode detected!',
    position: 'center',
    timeout: 500
  });

  // Add to scanned codes list if not already present
  if (!scannedCodes.value.includes(decodedText)) {
    scannedCodes.value.unshift(decodedText);

  }

  // Flash effect
  $q.loading.show({
    message: 'Scanning...',
    backgroundColor: 'primary',
    spinnerColor: 'white'
  });

  setTimeout(() => {
    $q.loading.hide();
  }, 300);
};

const toggleScanner = () => {
  if (isScanning.value) {
    stopScanner();
  } else {
    startScanner();
  }
};

onMounted(() => {
  // Auto-start scanner
  startScanner();
});

onUnmounted(() => {
  // Clean up
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

      <div class="scanner-overlay" v-if="isScanning">
        <div class="scanner-line"></div>
      </div>
    </div>

    <div class="scanned-codes q-pa-md">
      <h3>Scanned Barcodes:</h3>
      <q-list bordered separator>
        <q-item v-for="(code, index) in scannedCodes" :key="index">
          <q-item-section>
            <q-item-label>{{ code }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="scannedCodes.length === 0">
          <q-item-section>
            <q-item-label class="text-grey">No barcodes scanned yet</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
