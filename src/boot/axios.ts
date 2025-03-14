import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { useQuasar } from 'quasar';
import { App } from 'src/stores/App';

var project = App().project;
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: project.value.apiUrl
})


// Request interceptor: Her isteğe otomatik olarak token ekler
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // LocalStorage'dan token'ı al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Header'a ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
