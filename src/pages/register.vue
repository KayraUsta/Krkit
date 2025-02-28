<template>
  <div class="login-container">
    <div class="login-card">
      <img src="https://r.resimlink.com/FBGpL.png" alt="Logo" class="logo" />
      <h2 class="login-title">Kayıt Oluştur</h2>
      <form @submit.prevent="register">
        <q-input 
          dense 
          outlined 
          v-model="username" 
          label="Kullanıcı Adı" 
          class="input-field" 
        />
        <div class="password-field">
          <q-input 
            dense 
            outlined 
            :type="passwordVisible ? 'text' : 'password'" 
            v-model="password" 
            label="Şifre" 
            class="input-field"
          />
          <span 
            class="eye-icon" 
            @click="togglePasswordVisibility"
          >
            <q-icon :name="passwordVisible ? 'visibility_off' : 'visibility'" />
          </span>
        </div>
        <q-btn unelevated color="primary" type="submit" class="login-button">Kayıt Oluştur</q-btn>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';

const username = ref('');
const password = ref('');
const passwordVisible = ref(false); // Şifre görünürlüğünü kontrol eden değişken
const router = useRouter();
const $q = useQuasar();

// Şifre validasyon fonksiyonu (Büyük harf, küçük harf ve rakam zorunlu)
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
      message: 'Şifreniz en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.',
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
      message: 'Kayıt başarılı! Giriş yapabilirsiniz.',
      color: 'green',
      position: 'top',
      timeout: 2500,
    });

    router.push('/admin');
  } catch (error) {
    console.error('Kayıt başarısız', error);

    let errorMessage = 'Kayıt başarısız, lütfen tekrar deneyiniz.';
    if (error.response && error.response.data && error.response.data.message) {
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

// Şifre görünürlüğünü değiştiren fonksiyon
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #adefff, #ffd5ea);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}

.logo {
  width: 280px;
}

.login-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
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
  padding: 10px;
  border-radius: 6px;
}
</style>
