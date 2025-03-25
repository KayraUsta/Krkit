<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <h4 class="text-h4">Müşteri Borç Takip Sistemi</h4>
    </div>

    <!-- Yeni Müşteri Ekleme Formu -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Yeni Müşteri Ekle</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="addCustomer" class="q-gutter-md">
          <q-input
            v-model="newCustomer.name"
            label="Müşteri Adı"
            filled
            required
          />
          <q-input
            v-model="newCustomer.debt"
            label="Başlangıç Borcu"
            filled
            type="number"
            required
          />
          <div>
            <q-btn label="Ekle" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Müşteri Listesi -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Müşteri Listesi</div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="customers"
          :columns="columns"
          row-key="id"
          :loading="loading"
        >
          <!-- Borç Güncelleme Slot'u -->
          <template v-slot:body-cell-remainingDebt="props">
            <q-td :props="props">
              {{ props.row.remainingDebt }} TL
              <q-popup-edit v-model="props.row.payment" buttons v-slot="scope">
                <q-input
                  v-model="scope.value"
                  type="number"
                  label="Ödenen Miktar"
                  autofocus
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>

          <!-- İşlemler Butonları -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="edit"
                color="orange"
                dense
                flat
                @click="editCustomer(props.row)"
              />
              <q-btn
                icon="delete"
                color="red"
                dense
                flat
                @click="deleteCustomer(props.row.id)"
              />
              <q-btn
                icon="check"
                color="green"
                dense
                flat
                @click="updatePayment(props.row)"
                v-if="props.row.payment > 0"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { customer } from 'src/composables/customer';

const $q = useQuasar();
const customerService = customer();

// Müşteri veri yapısı
const customers = ref([]);
const loading = ref(false);

// Yeni müşteri formu
const newCustomer = ref({
  name: '',
  debt: 0
});

// Tablo sütunları
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id'
  },
  {
    name: 'name',
    required: true,
    label: 'Müşteri Adı',
    align: 'left',
    field: 'name'
  },
  {
    name: 'totalDebt',
    label: 'Toplam Borç',
    align: 'left',
    field: 'totalDebt',
    format: val => `${val} TL`
  },
  {
    name: 'remainingDebt',
    label: 'Kalan Borç',
    align: 'left',
    field: 'remainingDebt',
    format: val => `${val} TL`
  },
  {
    name: 'actions',
    label: 'İşlemler',
    align: 'right',
    field: 'actions'
  }
];

// API'den müşterileri çek
const fetchCustomers = async () => {
  loading.value = true;
  try {
    const response = await getAllCustomer();
    if (response && response.data) {
      customers.value = response.data.map(c => ({
        ...c,
        payment: 0 // Ödeme alanını başlangıçta sıfırla
      }));
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Müşteriler yüklenirken hata oluştu'
    });
  } finally {
    loading.value = false;
  }
};

// Yeni müşteri ekle
const addCustomer = async () => {
  try {
    const response = await customerService.addCustomer({
      name: newCustomer.value.name,
      totalDebt: parseFloat(newCustomer.value.debt),
      remainingDebt: parseFloat(newCustomer.value.debt),
      payment: 0
    });

    if (response.ok === 'Success') {
      $q.notify({
        type: 'positive',
        message: 'Müşteri başarıyla eklendi'
      });
      newCustomer.value = { name: '', debt: 0 };
      await fetchCustomers();
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Müşteri eklenirken hata oluştu'
    });
  }
};

// Müşteri sil
const deleteCustomer = async (id) => {
  $q.dialog({
    title: 'Silme Onayı',
    message: 'Bu müşteriyi silmek istediğinize emin misiniz?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const response = await customerService.deleteCustomer({ id });
      if (response.ok === 'Success') {
        $q.notify({
          type: 'positive',
          message: 'Müşteri başarıyla silindi'
        });
        await fetchCustomers();
      }
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Müşteri silinirken hata oluştu'
      });
    }
  });
};

// Ödeme güncelle
const updatePayment = async (customer) => {
  try {
    const updatedDebt = customer.remainingDebt - parseFloat(customer.payment);

    const response = await customerService.updateCustomer({
      id: customer.id,
      name: customer.name,
      totalDebt: customer.totalDebt,
      remainingDebt: updatedDebt,
      payment: 0 // Ödeme alanını sıfırla
    });

    if (response.ok === 'Success') {
      $q.notify({
        type: 'positive',
        message: 'Ödeme başarıyla güncellendi'
      });
      await fetchCustomers();
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Ödeme güncellenirken hata oluştu'
    });
  }
};

// Müşteri düzenle
const editCustomer = (customer) => {
  $q.dialog({
    title: 'Müşteri Düzenle',
    message: 'Müşteri bilgilerini güncelleyin',
    prompt: {
      model: customer.name,
      type: 'text',
      label: 'Müşteri Adı'
    },
    cancel: true,
    persistent: true
  }).onOk(async (name) => {
    try {
      const response = await customerService.updateCustomer({
        ...customer,
        name
      });

      if (response.ok === 'Success') {
        $q.notify({
          type: 'positive',
          message: 'Müşteri başarıyla güncellendi'
        });
        await fetchCustomers();
      }
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: error.message || 'Müşteri güncellenirken hata oluştu'
      });
    }
  });
};

// Sayfa yüklendiğinde müşterileri çek
onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
.q-table {
  width: 100%;
}
</style>
