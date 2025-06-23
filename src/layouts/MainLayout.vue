<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-gradient-header text-white">
      <q-toolbar class="q-py-sm">
        <q-btn flat dense round @click="toggleLeftDrawer" class="q-mr-sm hamburger-btn">
          <transition name="rotate" mode="out-in">
            <q-icon 
              :key="leftDrawerOpen ? 'close' : 'menu'" 
              :name="leftDrawerOpen ? 'close' : 'menu'" 
              size="24px"
            />
          </transition>
        </q-btn>
        <q-toolbar-title class="text-h5 font-weight-bold">
          <span class="text-accent">📋</span>
        </q-toolbar-title>
        
        <q-space />
        
        <div class="row items-center q-gutter-x-sm">
          <q-icon name="notifications" size="24px" class="cursor-pointer" />
          <q-separator vertical inset color="white-50" />
          <div class="column items-end">
            <div class="text-caption">KRKIT Bilişim</div>
            <div class="text-caption text-weight-light"></div>
          </div>
          <q-avatar size="36px" class="cursor-pointer">
            <img src="https://r.resimlink.com/-xGLkwV41O.jpg" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sol Menü (Drawer) -->
    <q-drawer 
      show-if-above 
      v-model="leftDrawerOpen" 
      side="left" 
      bordered 
      class="bg-menu text-grey-9"
      :width="280"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md flex flex-center">
          <img src="src/assets/image11.png" class="logo" />
        </div>
        
        <q-separator class="q-my-sm" />
        
        <q-list padding class="menu-list">
          <q-item 
            v-for="item in menuItems" 
            :key="item.title"
            clickable 
            v-ripple 
            @click="navigateTo(item.path)"
            class="q-my-xs q-py-sm"
            :active="isActive(item.path)"
            active-class="active-menu-item"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="isActive(item.path) ? 'primary' : 'grey-7'" />
            </q-item-section>
            <q-item-section>
              <div class="text-weight-medium">{{ item.title }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Sayfa İçeriği -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const route = useRoute()
    
    const menuItems = [
      { title: 'Kullanıcı Değiştir', icon: 'login', path: '/' },
      { title: 'Liste Hazırla', icon: 'list_alt', path: '/prepare-list' },
      { title: 'Stok Kaydı Yap', icon: 'inventory_2', path: '/stocks' },
      { title: 'Stokları Görüntüle', icon: 'storefront', path: '/views-stocks' },
      { title: 'Yapılacaklar Listesi', icon: 'checklist', path: '/toDoList' },
    ]

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function navigateTo(path) {
      router.push(path)
    }
    
    function isActive(path) {
      return route.path === path
    }

    return {
      leftDrawerOpen,
      menuItems,
      toggleLeftDrawer,
      navigateTo,
      isActive
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-gradient-header {
  background: linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%);
}

.bg-menu {
  background: #f8f9fa;
}

.logo {
  max-width: 160px;
  height: auto;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.menu-list {
  .q-item {
    border-radius: 8px;
    margin: 0 8px;
    transition: all 0.3s ease;
    color: #555;

    // Hoverda mor-pembe degrade arası renk animasyonu
    &:hover {
      background: linear-gradient(90deg, #9c27b0, #e91e63);
      color: white;
      box-shadow: 0 0 8px rgba(156, 39, 176, 0.7);
    }

    // Aktif menü öğesi
    &.active-menu-item {
      background: linear-gradient(90deg, #9c27b0, #e91e63);
      color: white;
      border-left: 4px solid #e91e63;
      box-shadow: 0 0 10px rgba(233, 30, 99, 0.9);
    }

    .q-item__section {
      transition: color 0.3s ease;
    }

    &.active-menu-item .q-icon {
      color: white !important;
    }
  }
}

.text-accent {
  color: #4fc3f7;
}

@media (max-width: 600px) {
  .logo {
    max-width: 120px;
  }
}

.hamburger-btn {
  transition: transform 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg);
}

.q-drawer {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;

  &--on-left {
    transform: translateX(-100%);
    &.q-drawer--on {
      transform: translateX(0);
    }
  }
}

.q-drawer__backdrop {
  transition: opacity 0.3s ease !important;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
</style>
