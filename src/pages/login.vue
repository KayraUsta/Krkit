<template>
  <div class="login-container">
    <div class="login-card">
      <img src="https://r.resimlink.com/FBGpL.png" alt="Logo" class="logo" />
      <h2 class="login-title">Giriş Yap</h2>
      <form @submit.prevent="login">
        <q-input dense outlined v-model="username" label="Kullanıcı Adı" class="input-field" />
        <q-input dense outlined type="password" v-model="password" label="Şifre" class="input-field" />
        <q-btn unelevated color="primary" type="submit" class="login-button">Giriş Yap</q-btn>
      </form>
      <p class="register-text">Hesabınız yok mu? <router-link to="/register">Kayıt Olun</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('https://localhost:7213/api/auth/login', {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('token', response.data.Token);
    router.push('/prepare-list');
  } catch (error) {
    console.error('Giriş başarısız', error);
  }
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

.login-button {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
}

.register-text {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
