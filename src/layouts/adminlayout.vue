<template>
    <q-layout view="lHr lpr lFf">
  
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Title
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <q-list>
          <q-item clickable v-ripple @click="navigateTo('/stocks')">
            <q-item-section avatar>
              <q-icon name="inventory" />
            </q-item-section>
            <q-item-section>
              Stokları Görüntüle
            </q-item-section>
          </q-item>
  
          <q-item clickable v-ripple @click="navigateTo('/prepare-list')">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
                <div class="abc">
              Liste Hazırla
            </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
  
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
.abc{
    color: red !important;
}
</style>
  