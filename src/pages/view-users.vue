<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5 text-primary">Kullanıcı Listesi</div>
      </q-card-section>
      <q-markup-table flat bordered dense>
        <thead>
          <tr>
            <th class="text-left">Kullanıcı Adı</th>
            <th class="text-left">Şifre</th>
            <th class="text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kullanici in kullanicilar" :key="kullanici.id">
            <td class="text-left">{{ kullanici.username }}</td>
            <td class="text-left">{{ kullanici.passwordHash }}</td>
            <td class="text-right">
              <q-btn
                color="negative"
                icon="delete"
                dense
                round
                size="sm"
                @click="silKullanici(kullanici.id)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { user } from 'src/composables/user';
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const kullanicilar = ref([]);
    const { getAllUser, deleteUser } = user();

    // API'den kullanıcıları çekme
    const fetchKullanicilar = async () => {
      try {
        const response = await getAllUser();
        if (response && response.status === 200) {
          kullanicilar.value = response.data;
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      }
    };

    // Kullanıcı silme işlemi
    const silKullanici = async (id) => {
      $q.dialog({
        title: "Onay",
        message: "Bu kullanıcıyı silmek istediğinize emin misiniz?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          const response = await deleteUser(id);
          if (response && response.status === 200) {
            $q.notify({
              type: "positive",
              message: "Kullanıcı başarıyla silindi!",
            });
            await fetchKullanicilar(); // Listeyi yenile
          }
        } catch (error) {
          console.error("Kullanıcı silinirken hata oluştu:", error);
          $q.notify({
            type: "negative",
            message: "Kullanıcı silinemedi!",
          });
        }
      });
    };

    onMounted(fetchKullanicilar);

    return { kullanicilar, silKullanici ,fetchKullanicilar};
  }
};
</script>

<style scoped>
/* İsteğe bağlı olarak stil ekleyebilirsiniz */
</style>
