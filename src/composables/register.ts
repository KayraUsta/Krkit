import { api } from 'boot/axios'; // Axios instance'ı

export function registerApi() {
  const register = async (data: { name: string; password: string }) => {
    try {
      const response = await api.post('/Auth/register', data);
      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false, message: response.data };
      }
    } catch (error) {
      console.error('Kayıt hatası: ', error);
      return { success: false, message: 'Bir hata oluştu, lütfen tekrar deneyin.' };
    }
  };

  return { register };
}
