<template>
  <div>
    <h2>Kayıt Ol</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Kullanıcı Adı</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Şifre</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Kayıt Ol</button>
    </form>
    <p>Zaten hesabınız var mı? <router-link to="/login">Giriş Yapın</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post('https://localhost:7213/api/auth/register', {
      username: username.value,
      password: password.value,
    });
    alert(response.data);
    router.push('/login'); // Kayıt olduktan sonra giriş sayfasına yönlendir
  } catch (error) {
  }
};
</script>
