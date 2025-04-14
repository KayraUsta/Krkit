<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <!-- Minimal HEADER -->
    <q-header class="bg-white text-dark q-px-xl q-py-xs shadow-1">
      <q-toolbar class="flex justify-between items-center">
        <!-- Logo -->
        <q-toolbar-title>
          <q-img
            src="src/assets/image11.png"
            alt="Tarasat Logo"
            style="width: 100px; height: auto"
            class="q-my-xs"
          />
        </q-toolbar-title>

        <!-- Centered Slogan -->
        <div class="slogan text-black text-weight-regular">
          Tarasat: Lİste ve Takİp Uygulaması
        </div>

        <!-- Menu Buttons -->
        <div class="row items-center q-gutter-md">
          <q-btn flat to="/" class="text-black elegant-btn">
            GİrİŞ Yap
          </q-btn>
          <q-btn flat class="text-black elegant-btn" @click="scrollToSection('pricing')">
            <q-icon name="shopping_cart" size="sm" class="q-mr-sm" />
            İletİşİm
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-grey-1 text-grey-8 text-center q-py-md">
      © 2025 Tarasat • Barkodla Kolay Takip
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const scrollToSection = (sectionId) => {
  // Eğer Home sayfasındaysak, doğrudan kaydır
  if (router.currentRoute.value.path === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Farklı bir sayfadaysak, önce Home'a yönlendir, sonra kaydır
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Küçük bir gecikme, sayfa yüklenmesini bekler
    });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.q-header {
  height: 110px;
}

.q-toolbar {
  min-height: 48px;
}

.slogan {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 550;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #000000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.elegant-btn {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #000000;
  border-radius: 0;
  background-color: transparent;
}

.elegant-btn:hover {
  /* Hover efekti tamamen kaldırıldı */
}

.q-icon {
  font-size: 1.1rem;
  color: #000000;
}

.elegant-btn:hover .q-icon {
  /* Hover ikon efekti kaldırıldı */
}
</style>