import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

// API çağrılarını yöneten fonksiyonlar
export function toDoList() {
  const router = useRouter();

  // Tüm görevleri al
  const getAllToDo = async () => {
    try {
      let response = await api.get('/ToDo');

      // console.log("response", response);
      if (response.status === 200) {
        return response; // Backend'den dönen tüm görev verilerini döndürüyoruz
      }
    } catch (error: any) {
      console.log("Hata:", error);

      if (error.response) {
        if (error.response.status === 401) {
          router.replace("/unauthorize");
          return { ok: "Error" };
        }

        if (error.response.status === 403) {
          router.replace("/is-not-auth");
          return { ok: "Error" };
        }

        return { errors: error.response.data.errors.errors };
      } else {
        console.error("Network or other error:", error);
        return { ok: "Network Error" };
      }
    }
  };

  // Belirli bir görevi güncelle
  const updateToDo = async (data: any) => {
    try {
      let response = await api.put(`/ToDo/update`, data); // Endpoint'teki id'yi dinamik hale getiriyoruz
      if (response.status === 200) {
        return { ok: "Success" };
      }
    } catch (error: any) {
      console.log("Hata:", error);

      if (error.response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }

      if (error.response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }

      return { errors: error.response.data.errors.errors };
    }
  };

  // Yeni görev ekle
  const addToDo = async (data: any) => {
    try {
      let response = await api.post('/ToDo/add', data);
      if (response.status === 201) { // Backend'den dönen yanıtın `Created` olması bekleniyor (201)
        return { ok: "Success" };
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }

      if (error.response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }

      return { errors: error.response.data.errors.errors };
    }
  };

  // Görev sil
  const deleteToDo = async (data: any) => {
    try {
      let response = await api.delete(`/ToDo/delete`, {data}); // Endpoint'teki id'yi dinamik hale getiriyoruz
      if (response.status === 200) { // Silme işlemi başarılıysa (No Content, 204)
        return { ok: "Success" };
      } else {
        return { error: "Beklenmeyen durum kodu" };
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }

      if (error.response.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }

      return { errors: error.response.data.errors.errors };
    }
  };

  return {
    getAllToDo,
    addToDo,
    updateToDo,
    deleteToDo,
  };
}
