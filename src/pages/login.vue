<template>
  <div>
    <h2>Giriş Yap</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Kullanıcı Adı</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Şifre</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Giriş Yap</button>
    </form>
    <p>Hesabınız yok mu? <router-link to="/register">Kayıt Olun</router-link></p>
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
    // Token'ı localStorage'a kaydediyoruz
    localStorage.setItem('token', response.data.Token);
    router.push('/prepare-list'); // Giriş yaptıktan sonra yönlendirme
  } catch (error) {
  }
};
</script>
