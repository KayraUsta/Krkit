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
          <img src="src/assets/image11.png" class="logo" />
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
      { title: 'Kullanıcı Değiştir', icon: 'login', path: '/firmalogin' },
      { title: 'Kullanıcı Oluştur', icon: 'person_add', path: '/register' },
      { title: 'Kullanıcıları Görüntüle', icon: 'people', path: '/view-users' },
               { title: 'Müşteri Cari Hesap', icon: 'account_balance', path: '/customer' },
      { title: 'Müşteri Alacak/Verecek', icon: 'account_balance_wallet', path: '/transactions' },
      { title: 'Liste Takibi', icon: 'view_list', path: '/list-tracking' },
               { title: 'Yapılacaklar Listesi', icon: 'checklist', path: '/toDoListAdmin' }
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
.bg-dark {
  background-color: #2b2b2b;
  color: #eee;
}

.bg-gradient-menu {
  background: linear-gradient(135deg, #9c27b0, #e91e63);
  color: white;
  font-weight: 600;
}

.logo {
  max-width: 160px;
  height: auto;
  transition: all 0.3s ease;
  margin: 24px auto;
  display: block;
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

    &:hover {
      background: linear-gradient(90deg, #ba68c8, #f06292);
      color: white;
      box-shadow: 0 0 10px rgba(240, 98, 146, 0.7);
    }

    &.active-menu-item {
      background: linear-gradient(90deg, #7b1fa2, #c2185b);
      color: white;
      border-left: 4px solid #f06292;

      .q-icon {
        color: white !important;
      }
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
  color: #f06292;
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

@media (max-width: 600px) {
  .logo {
    max-width: 120px;
  }
}
</style>
