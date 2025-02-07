<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-md center-container">
      <div class="register-box">
        <!-- Logo -->
        <q-img
          src="https://r.resimlink.com/FBGpL.png"
          class="logo"
          contain
        />

        <!-- Form -->
        <q-form @submit="register" class="q-gutter-md">
          <q-input
            filled
            v-model="registerForm.name"
            label="Kullanıcı Adı"
            required
          />
          <q-input
            filled
            v-model="registerForm.password"
            label="Şifre"
            type="password"
            required
          />
          <q-input
            filled
            v-model="registerForm.confirmPassword"
            label="Şifreyi Onayla"
            type="password"
            required
          />
          <q-btn
            type="submit"
            color="primary"
            label="Kayıt Ol"
            class="full-width"
          />
          <div class="q-mt-md">
            <q-btn
              flat
              label="Hesabınız var mı? Giriş Yap"
              @click="goToLogin"
            />
          </div>
        </q-form>

        <!-- Copyright -->
        <div class="copyright">
          <span>© 2025 Krkit Bilişim</span>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const registerForm = ref({
      name: '',
      password: '',
      confirmPassword: ''
    })

    const router = useRouter()

    const register = () => {
      if (registerForm.value.password === registerForm.value.confirmPassword) {
        console.log('Kayıt oluyorsunuz...', registerForm.value)
        // Burada API'ye post isteği gönderebilirsiniz.
      } else {
        console.log('Şifreler eşleşmiyor')
      }
    }

    const goToLogin = () => {
      router.push('/login') // Giriş yap sayfasına yönlendirme
    }

    return {
      registerForm,
      register,
      goToLogin
    }
  }
}
</script>

<style scoped>
/* Sayfanın dikey ve yatayda ortalanması */
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Tam ekran yükseklik */
  background-color: #f8f4f4; /* Arka plan rengi eklendi */
}

/* Register kutusu için */
.register-box {
  max-width: 500px;
  width: 100%;
  text-align: center;
  background-color: #ffffff; /* Beyaz kutu arka planı */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Hafif gölge */
}

/* Logo stil ayarları */
.logo {
  max-width: 400px;
  margin: 0 auto 20px auto; /* Altta boşluk ekler */
}

/* Copyright kısmı */
.copyright {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #888;
}
</style>
