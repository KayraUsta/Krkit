<template>
  <q-page-container class="bg-custom-gradient" style="padding-top: 0; padding-bottom: 0; position: relative;">
    <q-header class="bg-transparent text-white">
      <q-toolbar class="q-px-xl q-pt-md">
        <!-- Desktop Menu -->
        <div class="text-h6 row items-center q-gutter-sm desktop-only">
          <q-btn flat label="Neden Tarasat?" class="q-mx-sm text-white" />
          <q-btn flat label="Fiyatlandırma" class="q-mx-sm text-white" />
          <q-btn flat label="İletişim" class="q-mx-sm text-white" />
        </div>

        <q-space />

        <!-- Social Media Icons (Desktop Only) -->
        <q-btn flat round dense icon="fab fa-facebook" class="text-white desktop-only" />
        <q-btn flat round dense icon="fab fa-instagram" class="text-white desktop-only" />
        <q-btn flat round dense icon="fab fa-twitter" class="text-white desktop-only" />
        <q-btn flat round dense icon="fab fa-github" class="text-white desktop-only" />

        <!-- Hamburger Menu for Mobile -->
        <q-btn flat round dense icon="menu" class="mobile-only q-mr-md text-white" @click="drawerOpen = !drawerOpen" />

        <!-- Login Button -->
        <q-btn
          class="q-ml-md neumorphic-btn"
          label="Giriş Yap"
          color="primary"
          text-color="white"
          icon="login"
          unelevated
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer for Mobile Navigation -->
    <q-drawer
      v-model="drawerOpen"
      side="left"
      overlay
      behavior="mobile"
      class="bg-gradient-drawer text-white"
    >
      <q-list>
        <q-item clickable @click="drawerOpen = false">
          <q-item-section>
            <q-btn flat label="Neden Tarasat?" class="text-white full-width" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="drawerOpen = false">
          <q-item-section>
            <q-btn flat label="Fiyatlandırma" class="text-white full-width" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="drawerOpen = false">
          <q-item-section>
            <q-btn flat label="İletişim" class="text-white full-width" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page class="gradient-bg column items-center justify-center q-py-xl text-center text-white">
      <br><br><br><br><br>
      <!-- Logo Placeholder -->
      <div class="logo-container">
        
      </div>
      <div class="text-h3 text-weight-bold q-mt-md">Tarasat</div>
      <div class="q-mt-md text-subtitle1">
        Her Listede Kolaylık, Her Adımda Kontrol: <br />
        Tarasat Liste, Takip ve Ön Muhasebe Programı
      </div>

      <div class="q-mt-xl row q-gutter-md">
        <q-btn class="neumorphic-btn" color="primary" label="İncele" icon="search" unelevated />
        <q-btn class="neumorphic-btn" color="secondary" text-color="white" label="Giriş Yap" icon="login" unelevated />
      </div>

      <div class="absolute-bottom q-pb-md">
        <div class="text-caption q-mt-xs">Coded by
          <q-icon name="apps" />
          <span class="text-bold">KRKİT</span>
        </div>
      </div>
      <br><br><br>
      <br><br><br>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      drawerOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body, .q-btn, .text-h3, .text-subtitle1, .text-caption {
  font-family: 'Inter', sans-serif;
}

.gradient-bg {
  background: linear-gradient(to bottom right, #4b2ca0, #b66ddf);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.gradient-bg::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  top: 10%;
  left: 5%;
}
.gradient-bg::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: 5%;
  right: 5%;
}

.bg-gradient-drawer {
  background: linear-gradient(to bottom, #4b2ca0, #7e57c2);
}

/* Hide desktop menu and social icons on mobile */
.desktop-only {
  @media (max-width: 599px) {
    display: none;
  }
}

/* Show mobile menu on small screens */
.mobile-only {
  @media (min-width: 600px) {
    display: none;
  }
}

/* Neumorphic button styles */
.neumorphic-btn {
  border-radius: 12px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  padding: 10px 20px;
}

.neumorphic-btn:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.q-btn.primary {
  background-color: #26A69A; /* Vibrant teal for primary actions */
}
.q-btn.secondary {
  background-color: #9575CD; /* Soft purple for secondary actions */
}

.full-width {
  width: 100%;
}

.logo-container {
  width: 64px;
  height: 64px;
}
</style>