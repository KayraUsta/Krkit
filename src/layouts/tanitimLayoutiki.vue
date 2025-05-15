<template>
  <q-layout view="lhh Lpr fff">
    <!-- HEADER -->
    <q-header elevated style="background-color: #5e4b7b; color: white;">
      <q-toolbar class="q-px-xl q-py-sm justify-between">
        <!-- Logo -->
        <div class="row items-center">
          <img src="src/assets/image11.png" alt="Tarasat Logo" style="height: 105px;" />
        </div>

        <!-- Hamburger Menu for Mobile -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="lt-md"
          @click="toggleDrawer"
        />

        <!-- Menü Linkleri (Web) -->
        <div class="q-gutter-lg row items-center gt-sm">
          <q-btn flat label="Ana Sayfa" class="text-weight-medium" style="color: #ffffff;" />
          <q-btn flat label="Neden Tarasat" class="text-weight-medium" style="color: #ffffff;" />
          <q-btn flat label="Fiyatlandırma" class="text-weight-medium" style="color: #ffffff;" />
          <q-btn flat label="İletişim" class="text-weight-medium" style="color: #ffffff;" />
        </div>

        <!-- Giriş ve Ücretsiz Dene Butonları (Web) -->
        <div class="row items-center q-gutter-sm gt-sm">
          <q-btn flat label="Giriş Yap" class="text-weight-medium" style="color: #ffffff;" />
          <q-btn
            unelevated
            label="Ücretsiz Dene"
            class="q-px-md"
            style="background-color: #b89cc9; color: #ffffff; border-radius: 8px;"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer for Mobile Menu -->
    <q-drawer
      v-model="drawer"
      side="right"
      overlay
      behavior="mobile"
      style="background-color: #5e4b7b; color: white;"
    >
      <q-list class="q-pa-md">
        <q-item clickable>
          <q-item-section>
            <q-btn flat label="Ana Sayfa" class="text-weight-medium" style="color: #ffffff;" stretch />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn flat label="Neden Tarasat" class="text-weight-medium" style="color: #ffffff;" stretch />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn flat label="Fiyatlandırma" class="text-weight-medium" style="color: #ffffff;" stretch />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn flat label="İletişim" class="text-weight-medium" style="color: #ffffff;" stretch />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn flat label="Giriş Yap" class="text-weight-medium" style="color: #ffffff;" stretch />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-btn
              unelevated
              label="Ücretsiz Dene"
              class="q-px-md"
              style="background-color: #b89cc9; color: #ffffff; border-radius: 8px;"
              stretch
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- SAYFA İÇERİĞİ -->
    <q-page-container style="background-color: #ffffff;">
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer bordered style="background-color: #5e4b7b; color: #ffffff; position: relative; z-index: 1000;">
      <div class="q-pa-xl row justify-between">
        <!-- Column 1: Ürün -->
        <div class="col-12 col-md-2 q-mb-md">
          <q-list>
            <q-item class="q-px-none">
              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">Ürün</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/neden-tarasat">
              <q-item-section>
                <q-item-label>Neden Tarasat</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/ozellikler">
              <q-item-section>
                <q-item-label>Özellikler</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/entegrasyonlar">
              <q-item-section>
                <q-item-label>Entegrasyonlar</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Column 2: Fiyatlandırma -->
        <div class="col-12 col-md-2 q-mb-md">
          <q-list>
            <q-item class="q-px-none">
              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">Fiyatlandırma</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/fiyatlandirma">
              <q-item-section>
                <q-item-label>Fiyat Planları</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/indirimler">
              <q-item-section>
                <q-item-label>İndirimler</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Column 3: Destek -->
        <div class="col-12 col-md-2 q-mb-md">
          <q-list>
            <q-item class="q-px-none">
              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">Destek</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/iletisim">
              <q-item-section>
                <q-item-label>İletişim</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/sss">
              <q-item-section>
                <q-item-label>Sıkça Sorulan Sorular</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/destek-merkezi">
              <q-item-section>
                <q-item-label>Destek Merkezi</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Column 4: Kurumsal -->
        <div class="col-12 col-md-2 q-mb-md">
          <q-list>
            <q-item class="q-px-none">
              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">Kurumsal</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/hakkimizda">
              <q-item-section>
                <q-item-label>Hakkımızda</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/kariyer">
              <q-item-section>
                <q-item-label>Kariyer</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/blog">
              <q-item-section>
                <q-item-label>Blog</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Column 5: İletişim ve CTA -->
        <div class="col-12 col-md-3 q-mb-md">
          <q-list>
            <q-item class="q-px-none">
              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm">Bize Ulaşın</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>E-posta: info@tarasat.com</q-item-label>
                <q-item-label>Telefon: +90 212 555 1234</q-item-label>
                <q-item-label>Adres: İstanbul, Türkiye</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-px-none q-mt-sm">
              <q-item-section>
                <q-btn
                  unelevated
                  label="Ücretsiz Dene"
                  class="q-px-md"
                  style="background-color: #b89cc9; color: #ffffff; border-radius: 8px;"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- Footer Bottom: Logo, Social, Legal -->
      <div style="background-color: #6a5788;">
        <div class="row items-center justify-between q-px-xl q-py-md">
          <!-- Logo -->
          <div>
            <img src="src/assets/image11.png" alt="Tarasat Logo" style="height: 50px;" />
          </div>

          <!-- Social Icons -->
          <div class="q-gutter-sm">
            <q-btn flat round icon="fab fa-twitter" href="https://twitter.com/tarasat" style="color: #ffffff;" />
            <q-btn flat round icon="fab fa-linkedin" href="https://linkedin.com/company/tarasat" style="color: #ffffff;" />
            <q-btn flat round icon="fab fa-instagram" href="https://instagram.com/tarasat" style="color: #ffffff;" />
          </div>

          <!-- Legal Links -->
          <div class="q-gutter-sm">
            <q-btn flat label="Gizlilik Politikası" to="/gizlilik" style="color: #ffffff;" />
            <q-btn flat label="Kullanım Şartları" to="/sartlar" style="color: #ffffff;" />
            <q-btn flat label="Çerez Politikası" to="/cerez" style="color: #ffffff;" />
          </div>
        </div>
        <!-- Copyright -->
        <div class="text-center q-mt-md" style="color: #ffffff;">
          © 2025 Tarasat. Tüm hakları saklıdır.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

// Control the drawer state
const drawer = ref(false);

// Toggle drawer function
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
.q-header {
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.15);
}

/* Ensure buttons in drawer take full width */
.q-btn.stretch {
  width: 100%;
  justify-content: flex-start;
}

/* Footer link hover effect */
.q-item:hover .q-item__label {
  color: #b89cc9;
  transition: color 0.3s;
}

/* Responsive column padding */
.q-pa-xl {
  padding: 16px;
}
@media (min-width: 1024px) {
  .q-pa-xl {
    padding: 32px 64px;
  }
}

/* Ensure footer border is visible */
.q-footer {
  border-top: 1px solid #ffffff;
}

</style>