<template>
  <q-layout view="lhh Lpr fff">
    <!-- SAYFA İÇERİĞİ -->

      <router-view />
  

    <!-- FOOTER -->
    <q-footer bordered class="gradient-footer">
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
                  style="background-color: #ffffff; color: #4c1d95; border-radius: 8px;"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- Footer Bottom: Logo, Social, Legal -->
      <div class="gradient-footer-bottom">
        <div class="row items-center justify-between q-px-xl q-py-md">
          <!-- Logo -->
          <div>
            <img src="src/assets/image11.png" alt="Tarasat Logo" style="height: 50px;" />
          </div>

          <!-- Social Icons -->
          <div class="q-gutter-sm">
            <q-btn flat round icon="fab fa-twitter" href="https://twitter.com/tarasat" style="color: #ffffff;" aria-label="Twitter" />
            <q-btn flat round icon="fab fa-linkedin" href="https://linkedin.com/company/tarasat" style="color: #ffffff;" aria-label="LinkedIn" />
            <q-btn flat round icon="fab fa-instagram" href="https://instagram.com/tarasat" style="color: #ffffff;" aria-label="Instagram" />
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

<script>

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

$primary-gradient-start: #4c1d95; // mor
$primary-gradient-end: #7c3aed;   // eflatun
$button-bg: #a78bfa;              // açık mor
$button-hover-bg: #c4b5fd;        // hoverda daha açık mor

.gradient-header {
  background: linear-gradient(135deg, $primary-gradient-start 0%, $primary-gradient-end 100%);
  height: 100px;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
  font-family: 'Inter', sans-serif;
}

.gradient-footer {
  background: linear-gradient(135deg, $primary-gradient-start 0%, $primary-gradient-end 100%);
  color: #ffffff;
  position: relative;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
}

.gradient-footer-bottom {
  background: linear-gradient(135deg, darken($primary-gradient-start, 10%) 0%, darken($primary-gradient-end, 10%) 100%);
}

.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header-logo img {
  height: 110px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.header-logo img:hover {
  transform: scale(1.05);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header-nav-left {
  position: absolute;
  left: 25%;
}

.header-nav-right {
  position: absolute;
  right: 25%;
  gap: 20px;
}

.nav-item {
  color: #ffffffcc;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 12px;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 6px;
}

.nav-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.active-nav-item {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
}

.nav-hover-box {
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background: #ffffff;
  color: #333;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.35s ease;
  min-width: 240px;
  text-align: center;
  z-index: 100;
}

.nav-item:hover .nav-hover-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
}

.hover-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hover-description {
  margin: 0;
  color: #444;
  font-size: 14px;
  line-height: 1.5;
}

.hover-action-btn {
  align-self: center;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hover-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hover-box-corner {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}

.social-nav-item {
  color: white;
  text-decoration: none;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  position: relative;
}

.social-nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-hover-box {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background: #ffffff;
  color: #333;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.social-nav-item:hover .social-hover-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
}

.social-hover-box-corner {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
}

.button-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.demo-btn, .login-btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-btn:hover, .login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.demo-btn:hover {
  background-color: #b794f4 !important;
}

.login-btn {
  background-color: #6b46c1 !important; // darker purple for Giriş Yap
}

.login-btn:hover {
  background-color: #805ad5 !important; // lighter shade on hover
}

/* Drawer Stilleri */
.mobile-drawer {
  background: linear-gradient(135deg, $primary-gradient-start 0%, $primary-gradient-end 100%);
  color: #ffffff;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-logo img {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.drawer-content .demo-btn {
  margin-top: 16px;
}

/* Footer link styles */
.q-footer .q-item__label {
  color: #ffffff !important;
}

.q-footer .q-item:hover .q-item__label {
  color: #b89cc9 !important;
  transition: color 0.3s;
}

.q-footer .q-btn {
  color: #ffffff;
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

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-icon {
    display: block;
   margin-bottom: -10%;
    transform: translateY(-50%);
    color: #ffffff;
  }

  .header-container {
    justify-content: space-between;
    align-items: center;
  }

  .header-logo img {
    height: 80px;
  }

  .button-group {
    position: absolute;
    right: 35%;
    top: 50%;
    transform: translateY(-50%);
    gap: 8px;
  }

  .login-btn {
    padding: 12px 16px;
    font-size: 12px;
  }
}

@media (min-width: 769px) {
  .mobile-icon {
    display: none;
  }
}

/* Ensure footer border is visible */
.q-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>