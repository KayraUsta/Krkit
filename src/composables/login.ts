import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export function loginApi() {
  const router = useRouter();


  const isSignedIn = () => {
    return localStorage.getItem('token') ? true : false;
  }
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const login = async (data: any) => {
    try {
      let response = await api.post('/Auth/login', data);
      console.log('Full API response:', response); // Yanıtı incele

      // Token'i doğru yoldan almayı dene
      const token = response.data.token || response.data.data?.token;

      if (token) {
        localStorage.setItem('token', token);
        return { success: true };
      } else {
        return { success: false, message: 'Token not found in response' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        if (error.response.status === 401) {
          router.replace("/unauthorize");
          return { success: false, message: 'Unauthorized' };
        }
        if (error.response.status === 403) {
          router.replace("/is-not-auth");
          return { success: false, message: 'Forbidden' };
        }
        return { 
          success: false,
          message: error.response.data?.errors?.errors || error.response.data?.message || 'Unknown error'
        };
      }
      return { success: false, message: 'Network error' };
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    router.replace('/login');

  };

  const isNotAuth = () => {
    router.replace('/is-not-auth');
  };


  return {
    login,
    logout,
    isSignedIn,
    getToken,
    isNotAuth
  }

}


