<template>
    <div class="login-container">
      <transition name="fade-slide">
        <div class="login-card">
          <img src="src/assets/image11.png" alt="Logo" class="logo" />
          <h2 class="login-title">Giriş Yap</h2>
  
          <q-tabs
            v-model="loginType"
            align="justify"
            active-color="pink-6"
            indicator-color="pink-4"
            class="modern-tabs q-mb-lg"
          >
            <q-tab name="firma" label="Firma" />
            <q-tab name="calisan" label="Çalışan" />
          </q-tabs>
  
          <transition name="fade-slide" mode="out-in">
            <form @submit.prevent="login" :key="loginType" class="form-content">
              <q-input
                v-if="loginType === 'firma'"
                dense
                outlined
                v-model="email"
                label="Firma E-posta"
                class="input-field"
                color="pink-6"
              />
              <q-input
                dense
                outlined
                v-model="username"
                label="Kullanıcı Adı"
                class="input-field"
                color="pink-6"
              />
              <div class="password-field">
                <q-input
                  dense
                  outlined
                  :type="passwordVisible ? 'text' : 'password'"
                  v-model="password"
                  label="Şifre"
                  class="input-field"
                  color="pink-6"
                />
                <span class="eye-icon" @click="togglePasswordVisibility">
                  <q-icon :name="passwordVisible ? 'visibility_off' : 'visibility'" color="grey-7" />
                </span>
              </div>
              <q-btn
                unelevated
                color="pink-6"
                type="submit"
                class="login-button"
                label="Giriş Yap"
                no-caps
              />
            </form>
          </transition>
  
          <p class="register-text">Hesabınız yoksa yöneticinize başvurun.</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  import { loginApi } from 'src/composables/login.ts';
  
  const loginType = ref<'firma' | 'calisan'>('firma');
  const email = ref('');
  const username = ref('');
  const password = ref('');
  const passwordVisible = ref(false);
  
  const router = useRouter();
  const $q = useQuasar();
  const auth = loginApi();
  
  const login = async () => {
    if ((loginType.value === 'firma' && !email.value) || !username.value || !password.value) {
      $q.notify({
        message: 'Lütfen gerekli tüm bilgileri doldurun!',
        color: 'orange',
        position: 'top',
        timeout: 2500,
      });
      return;
    }
  
    try {
      const result = await auth.login({
        email: loginType.value === 'firma' ? email.value : null,
        username: username.value,
        password: password.value,
        type: loginType.value,
      });
  
      if (result.success) {
        localStorage.setItem('username', username.value);
  
        const route = loginType.value === 'firma' ? '/firma-dashboard' : '/welcome';
        $q.notify({
          message: 'Giriş başarılı, yönlendiriliyorsunuz...',
          color: 'green',
          position: 'top',
          timeout: 2000,
        });
  
        setTimeout(() => router.push(route), 2000);
      } else {
        $q.notify({
          message: result.message || 'Giriş başarısız!',
          color: 'red',
          position: 'top',
          timeout: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      $q.notify({
        message: 'Beklenmeyen bir hata oluştu!',
        color: 'red',
        position: 'top',
        timeout: 3000,
      });
    }
  };
  
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #fce4ec, #e3f2fd);
    font-family: 'Poppins', sans-serif;
  }
  
  .login-card {
    background: #fff;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease;
  }
  
  .logo {
    width: 200px;
    margin-bottom: 1rem;
  }
  
  .login-title {
    font-size: 1.7rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 1.2rem;
  }
  
  .input-field {
    margin-bottom: 1rem;
  }
  
  .password-field {
    position: relative;
  }
  
  .eye-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  .login-button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    transition: 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #ec407a !important;
  }
  
  .register-text {
    margin-top: 1.2rem;
    font-size: 0.75rem;
    color: #666;
  }
  
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .modern-tabs {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 5px;
  }
  </style>
  