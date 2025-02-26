<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Eren Hediyelik Liste Uygulaması
        </q-toolbar-title>
        <q-avatar>
          <img src="https://r.resimlink.com/-xGLkwV41O.jpg" class="krkit" />
        </q-avatar>
        <div>Krkit Bilişim</div>
      </q-toolbar>
    </q-header>

    <!-- Sol Menü (Drawer) -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="solrenk">
      <q-list>
        <!-- Logo -->
        <q-img>
          <img src="https://r.resimlink.com/FBGpL.png" class="logo" />
        </q-img>
        <hr />

        <!-- Menü Öğeleri -->


        <q-item clickable v-ripple @click="navigateTo('/prepare-list')">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            Liste Hazırla
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Sayfa İçeriği -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function navigateTo(path) {
      router.push(path)
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      navigateTo
    }
  }
}
</script>

<style>
/* Header Rengi */
.header {
  background-color: #495867; /* Daha koyu bir mavi-gri tonu */
  color: white; /* Yazının görünürlüğü için beyaz renk */
}

/* Sol Menü Rengi */
.solrenk {
  background-color: #ffe6e6; /* Soft kırmızı tonu */
}

/* Logo Stil Ayarları */
.logo {
  max-width: 200px;
  margin-left: 50px;
  margin-top: 35px;
}
</style>
