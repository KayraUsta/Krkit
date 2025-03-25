<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          📋 Eren Hediyelik Liste Uygulaması
        </q-toolbar-title>

        <q-space />

        <q-avatar size="40px">
          <img src="https://r.resimlink.com/-xGLkwV41O.jpg" class="krkit" />
        </q-avatar>
        <div class="company-name">KRKIT Bilişim</div>
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

        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            Kullanıcı Değiştir
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/prepare-list')">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            Liste Hazırla
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/stocks')">
          <q-item-section avatar>
            <q-icon name="inventory" />
          </q-item-section>
          <q-item-section>
            Stok Kayıdı Yap
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/views-stocks')">
          <q-item-section avatar>
            <q-icon name="storefront" />
          </q-item-section>
          <q-item-section>
            Stokları Görüntüle
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="navigateTo('/toDoList')">
          <q-item-section avatar>
            <q-icon name="check_box" />
          </q-item-section>
          <q-item-section>
           Yapılacaklar Listesi
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/customer')">
          <q-item-section avatar>
            <q-icon name="check_box" />
          </q-item-section>
          <q-item-section>
           Müşteri Cari Hesap
          </q-item-section>
        </q-item>







        <!-- <q-item clickable v-ripple @click="navigateTo('/stocks')">
          <q-item-section avatar>
            <q-icon name="inventory" />
          </q-item-section>
          <q-item-section>
            Stok Kaydı Yap
          </q-item-section>
        </q-item> -->

        <!-- Güncellenmiş İkon -->



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
  background-color: #2b2b2b;
  color: #ffffff;
  padding: 0 16px;
}

/* Şirket İsmi */
.company-name {
  font-size: 1rem;
  font-weight: bold;
  margin-left: 10px;
  color: #ffffff;
}

/* Sol Menü Rengi */
.solrenk {
  background: linear-gradient(135deg, #adefff, #ffd5ea);
  color: #2b2b2b;
}

/* Logo Stil Ayarları */
.logo {
  max-width: 200px;
  margin-left: 50px;
  margin-top: 35px;
}
</style>
