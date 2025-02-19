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
      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.token);
        return { success: true }; // Return an object indicating success
      } else {
        return { success: false, message: 'Login failed' }; // Handle non-200 responses
      }
    } catch (error: any) {
      let response = error.response;
      console.log(error);

      if (response.status === 401) {
        router.replace("/unauthorize");
        return { success: false, message: 'Unauthorized' };
      }

      if (error.response.status === 403) {
        router.replace("/is-not-auth");
        return { success: false, message: 'Forbidden' };
      }

      return { success: false, message: error.response.data.errors.errors || 'Unknown error' };
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


