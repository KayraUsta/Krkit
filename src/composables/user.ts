import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

// API çağrılarını yöneten fonksiyonlar
export function user() {
  const router = useRouter();

  // Tüm görevleri al
  const getAllUser = async () => {
    try {
      let response = await api.get('/User');

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


  const deleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/User/delete`, {
        data: {
          id: id
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        return { ok: "Success" };
      } else {
        return { error: "Beklenmeyen durum kodu" };
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.replace("/unauthorize");
        return { ok: "Error" };
      }

      if (error.response?.status === 403) {
        router.replace("/is-not-auth");
        return { ok: "Error" };
      }

      return { errors: error.response?.data?.errors?.errors };
    }
  };



  return {
    getAllUser,
    deleteUser,
  };
}
