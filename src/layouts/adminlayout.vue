<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="q-py-sm">
        <q-btn 
          flat 
          dense 
          round 
          @click="toggleLeftDrawer" 
          class="q-mr-sm hamburger-btn"
        >
          <transition name="rotate" mode="out-in">
            <q-icon 
              :key="leftDrawerOpen ? 'close' : 'menu'" 
              :name="leftDrawerOpen ? 'close' : 'menu'" 
              size="24px"
            />
          </transition>
        </q-btn>
        
        <q-toolbar-title class="text-h5 font-weight-bold">
          <span class="text-accent">📋</span>Admin Panel
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
      class="bg-gradient-menu text-grey-9"
      :width="280"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md flex flex-center">
          <img src="https://r.resimlink.com/FBGpL.png" class="logo" />
        </div>
        
        <q-separator class="q-my-sm" />
        
        <q-list padding class="menu-list">
          <q-item 
            v-for="item in adminMenuItems" 
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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const route = useRoute()
    
    const adminMenuItems = [
      { title: 'Kullanıcı Değiştir', icon: 'login', path: '/' },
      { title: 'Kullanıcı Oluştur', icon: 'person_add', path: '/register' },
      { title: 'Kullanıcıları Görüntüle', icon: 'people', path: '/view-users' },
      { title: 'Liste Hazırla', icon: 'list_alt', path: '/prepare-list' }
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
      leftDrawerOpen: leftDrawerOpen,
      adminMenuItems,
      toggleLeftDrawer,
      navigateTo,
      isActive
    }
  }
}
</script>

<style lang="scss" scoped>
// Orijinal renk paleti
.bg-dark {
  background-color: #2b2b2b;
}

.bg-gradient-menu {
  background: linear-gradient(135deg, #adefff, #ffd5ea);
}

// Logo stil
.logo {
  max-width: 160px;
  height: auto;
  transition: all 0.3s ease;
  margin: 20px 0;
  &:hover {
    transform: scale(1.05);
  }
}

// Menü öğeleri
.menu-list {
  .q-item {
    border-radius: 8px;
    margin: 0 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    &.active-menu-item {
      background: rgba(255, 255, 255, 0.5);
      color: #2b2b2b;
      border-left: 4px solid #2b2b2b;
      
      .q-icon {
        color: #2b2b2b !important;
      }
    }
  }
}

// Başlık aksan rengi
.text-accent {
  color: #ffffff;
}

// Hamburger Menü Animasyonları
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

// Drawer Animasyonu
.q-drawer {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  
  &--on-left {
    transform: translateX(-100%);
    
    &.q-drawer--on {
      transform: translateX(0);
    }
  }
}

// Overlay Efekti
.q-drawer__backdrop {
  transition: opacity 0.3s ease !important;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

// Responsive ayarlar
@media (max-width: 600px) {
  .logo {
    max-width: 120px;
  }
}
</style>