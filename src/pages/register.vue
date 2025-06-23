<template>
  <div class="login-container">
    <transition name="fade-slide">
      <div class="login-card">
        <img src="src/assets/image11.png" alt="Logo" class="logo" />
        <h2 class="login-title">Kayıt Oluştur</h2>

        <form @submit.prevent="register" class="form-content">
          <q-input
            outlined
            v-model="username"
            label="Kullanıcı Adı"
            class="input-field"
            color="pink-6"
          >
            <template #prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <div class="password-field">
            <q-input
              outlined
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
              label="Şifre"
              class="input-field"
              color="pink-6"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <span class="eye-icon" @click="togglePasswordVisibility">
              <q-icon :name="passwordVisible ? 'visibility_off' : 'visibility'" color="grey-7" />
            </span>
          </div>

          <q-btn
            unelevated
            type="submit"
            class="login-button"
            label="Kayıt Ol"
            no-caps
          />
        </form>

        <p class="register-text">Zaten hesabınız varsa giriş yapabilirsiniz.</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);
const router = useRouter();
const $q = useQuasar();

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return passwordRegex.test(password);
};

const register = async () => {
  if (!username.value || !password.value) {
    $q.notify({
      message: 'Lütfen kullanıcı adı ve şifrenizi girin!',
      color: 'orange',
      position: 'top',
      timeout: 2500,
    });
    return;
  }

  if (!validatePassword(password.value)) {
    $q.notify({
      message: 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.',
      color: 'red',
      position: 'top',
      timeout: 2500,
    });
    return;
  }

  try {
    const response = await axios.post('https://testapi.sitrancelik.com/api/auth/register', {
      username: username.value,
      password: password.value,
    });

    $q.notify({
      message: 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...',
      color: 'green',
      position: 'top',
      timeout: 2500,
    });

    setTimeout(() => router.push('/login'), 2000);
  } catch (error: any) {
    console.error('Kayıt başarısız', error);
    let errorMessage = 'Kayıt başarısız, lütfen tekrar deneyiniz.';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    $q.notify({
      message: errorMessage,
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
  margin-bottom: 1.4rem;
}

.password-field {
  position: relative;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
}

.q-input__control {
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.login-button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #A566D7;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 14px rgba(165, 102, 215, 0.3);
}

.login-button:hover {
  background-color: #8e55c5 !important;
  transform: scale(1.02);
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
</style>
