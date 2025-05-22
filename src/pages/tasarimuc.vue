<template>
  <q-page-container class="bg-custom-gradient" style="padding-top: 0; padding-bottom: 0; position: relative;">
    <q-header class="bg-transparent text-white">
      <q-toolbar class="q-px-xxl q-pt-lg">
        <!-- Desktop Menu -->
        <div class="text-h6 row items-center q-gutter-md desktop-only" style="margin-left: 10%;">
          <q-btn flat label="Neden Tarasat?" class="q-mx-md text-white" />
          <q-btn flat label="Fiyatlandırma" class="q-mx-md text-white" />
          <q-btn flat label="İletişim" class="q-mx-md text-white" />
        </div>

        <q-space />

        <!-- Social Media Icons (Desktop Only) -->
        <q-btn flat round dense icon="fab fa-facebook" class="text-white q-mx-md desktop-only" />
        <q-btn flat round dense icon="fab fa-instagram" class="text-white q-mx-md desktop-only" />
        <q-btn flat round dense icon="fab fa-twitter" class="text-white q-mx-md desktop-only" />
        <q-btn flat round dense icon="fab fa-github" class="text-white q-mx-md desktop-only" />

        <!-- Hamburger Menu for Mobile -->
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="text-white q-mx-md mobile-only"
          @click="toggleDrawer"
          title="Menüyü Aç"
          aria-label="Menüyü Aç"
        />

        <!-- Login Button - Always visible -->
        <q-btn
          class="q-ml-xl neumorphic-btn"
          label="Giriş Yap"
          color="primary"
          text-color="white"
          icon="login"
          unelevated
          style="margin-right: 10%;"
        />
      </q-toolbar>
    </q-header>

    <!-- Modern Drawer for Mobile Navigation -->
    <q-drawer
      v-model="drawerOpen"
      side="left"
      overlay
      elevated
      behavior="mobile"
      :width="280"
      class="bg-dark text-white"
    >
      <div class="column full-height">
        <!-- Drawer Header -->
        <div class="drawer-header q-pa-md bg-primary text-white flex column items-center">
          <img src="src/assets/image11.png" alt="Tarasat Logo" style="width: 64px; height: 64px;" class="q-mb-sm" />
          <div class="text-h5 text-weight-bold">Tarasat</div>
          <div class="text-caption">Liste Takip Sistemi</div>
        </div>

        <!-- Navigation Items -->
        <q-scroll-area class="col q-pt-sm">
          <q-list padding>
            <q-item 
              clickable 
              v-ripple
              class="q-mb-sm"
              active-class="active-menu-item"
              @click="navigateTo('home')"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>Ana Sayfa</q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-ripple
              class="q-mb-sm"
              active-class="active-menu-item"
              @click="navigateTo('why')"
            >
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>
              <q-item-section>Neden Tarasat?</q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-ripple
              class="q-mb-sm"
              active-class="active-menu-item"
              @click="navigateTo('pricing')"
            >
              <q-item-section avatar>
                <q-icon name="attach_money" />
              </q-item-section>
              <q-item-section>Fiyatlandırma</q-item-section>
            </q-item>

            <q-item 
              clickable 
              v-ripple
              class="q-mb-sm"
              active-class="active-menu-item"
              @click="navigateTo('contact')"
            >
              <q-item-section avatar>
                <q-icon name="mail" />
              </q-item-section>
              <q-item-section>İletişim</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!-- Social Media & Footer -->
        <div class="drawer-footer q-pa-md">
          <div class="row justify-around q-mb-md">
            <q-btn flat round dense icon="fab fa-facebook" color="white" />
            <q-btn flat round dense icon="fab fa-instagram" color="white" />
            <q-btn flat round dense icon="fab fa-twitter" color="white" />
            <q-btn flat round dense icon="fab fa-github" color="white" />
          </div>
          <div class="text-center text-caption text-grey-4">
            © 2023 Tarasat - KRKIT
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page class="gradient-bg column items-center q-py-md text-center text-white">
      <!-- Ana içerik -->
      <div class="logo-container"></div>
      <img src="src/assets/image11.png" alt="Tarasat Logo" style="width: 200px; height: 200px;" class="q-mb-sm" />
 
      <div class="text-h3 text-weight-bold q-mt-sm">Tarasat</div>
      <div class="q-mt-md text-subtitle1">
        Her Listede Kolaylık, Her Adımda Kontrol: <br />
        Tarasat Liste, Takip ve Ön Muhasebe Programı
      </div>

      <div class="q-mt-xl row q-gutter-md">
        <q-btn class="neumorphic-btn" color="primary" label="İncele" icon="search" unelevated />
        <q-btn class="neumorphic-btn" color="secondary" text-color="white" label="Giriş Yap" icon="login" unelevated />
      </div>

<br><br><br>
  </q-page>
      <!-- NEDEN TARASAT BÖLÜMÜ -->
      <div class="q-pa-xl" style="background: linear-gradient(135deg, #6B46C1 0%, #A78BFA 100%);">
        <div class="text-h3 text-weight-bolder text-center text-white q-mb-xl" style="letter-spacing: 0.5px; font-family: 'Inter', sans-serif;">
          Neden Tarasat?
        </div>
        <div class="row q-col-gutter-lg justify-center">
          <!-- Kart 1: Barkodlu Takip -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="assessment" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Barkodlu Takip</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Ürünlerinizi barkod ile kolayca tanımlayın ve takip edin.
              </div>
            </q-card>
          </div>
          
          <!-- Kart 2: Gerçek Zamanlı Raporlar -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="assessment" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Gerçek Zamanlı Raporlar</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Anlık stok durumunu ve hareketlerini takip edin.
              </div>
            </q-card>
          </div>
          
          <!-- Kart 3: Çoklu Cihaz Desteği -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="devices" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Çoklu Cihaz Desteği</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Mobil, tablet ve bilgisayardan erişim imkanı.
              </div>
            </q-card>
          </div>
          
          <!-- Kart 4: Cari Takibi -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="contacts" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Cari Takibi</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Müşteri ve tedarikçi hesaplarını kolayca yönetin.
              </div>
            </q-card>
          </div>
          
          <!-- Kart 5: Alacak Verecek -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="account_balance" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Alacak Verecek Takibi</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Ödemelerinizi ve borçlarınızı düzenli olarak izleyin.
              </div>
            </q-card>
          </div>
          
          <!-- Kart 6: Stok Takibi -->
          <div class="col-12 col-md-4">
            <q-card class="flex column justify-center items-center q-pa-lg neumorphic-card" style="border-radius: 12px; min-height: 240px; background: linear-gradient(145deg, #F3E8FF 0%, #E9D5FF 100%);">
              <q-icon name="inventory" size="xl" color="purple-8" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Stok Takibi</div>
              <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">
                Stok seviyelerinizi anlık olarak kontrol edin.
              </div>
            </q-card>
          </div>
        </div>
      </div>
          <!-- ÖNE ÇIKAN ÖZELLİKLER BÖLÜMÜ -->
      <div class="q-pa-xl" style="background: #FFFFFF;">
      
        <q-card class="product-card neumorphic-card" style="border-radius: 12px; background: #F9FAFB;">
          <button class="slider-nav left neumorphic-btn" @click="prevSlide">
            <q-icon name="chevron_left" size="lg" color="purple-8" />
          </button>
          <div class="card-content">
            <transition name="fade-slide" mode="out-in">
              <img 
                :key="features[currentSlide].name"
                :src="features[currentSlide].image" 
                :alt="features[currentSlide].name" 
                class="card-image"
              >
            </transition>
            <transition name="fade" mode="out-in">
              <div class="card-info" :key="features[currentSlide].name">
                <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">{{ features[currentSlide].name }}</div>
                <div class="text-body1 text-center" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif;">{{ features[currentSlide].description }}</div>
              </div>
            </transition>
          </div>
          <button class="slider-nav right neumorphic-btn" @click="nextSlide">
            <q-icon name="chevron_right" size="lg" color="purple-8" />
          </button>
        </q-card>
      </div>
<!-- MÜŞTERİ REFERANSLARI BÖLÜMÜ -->
<div class="q-pa-xl" style="background: #FFFFFF;">
  <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #7C3AED; font-family: 'Inter', sans-serif;">
    MÜŞTERİ REFERANSLARI
  </div>
  <div class="text-h3 text-weight-bolder text-center q-mb-md" style="color: #6B46C1; font-family: 'Inter', sans-serif;">
    MÜŞTERİLERİN BİZİM <br> HAKKIMIZDA SÖYLEDİKLERİ
  </div>
  <div class="text-subtitle1 text-center q-mb-xl" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif; padding-left: 20%; padding-right: 20%;">
    Müşterilerimizden aldığımız olağanüstü geri bildirimler, finansal doğruluk ve hizmet kalitesine olan sarsılmaz bağlılığımızı yansıtıyor. İşletmelerin mali süreçlerinde güvenle ilerlemelerini sağlayan çözümlerimiz, memnuniyetin ve profesyonelliğin doğal bir sonucu olarak öne çıkıyor.
  </div>

  <div class="row q-col-gutter-lg justify-center">
    <div
      v-for="(testimonial, index) in testimonials"
      :key="index"
      class="col-12 col-sm-6 col-md-4"
    >
      <q-card class="flex column justify-center items-center q-pa-md neumorphic-card" style="border-radius: 12px; min-height: 300px; background: #F9FAFB;">
        <div class="text-purple-8 q-mb-md text-center" style="font-size: 1.5em; font-family: 'Inter', sans-serif;">{{ testimonial.rating }}</div>
        <div class="text-h6 text-weight-bold text-center q-mb-md" style="color: #6B46C1; font-family: 'Inter', sans-serif;">{{ testimonial.title }}</div>
        <div class="text-body1 text-center q-mb-md" style="color: #4B3A7B; line-height: 1.5; font-family: 'Inter', sans-serif; padding-left: 10%; padding-right: 10%;">{{ testimonial.comment }}</div>
        <div class="text-subtitle2 text-center" style="color: #7C3AED; font-family: 'Inter', sans-serif;">{{ testimonial.name }}</div>
      </q-card>
    </div>
  </div>
</div>
 <!-- FİYATLANDIRMA BÖLÜMÜ -->
      <div class="q-pa-xl" style="background: #FFFFFF;">
        <div class="pricing-header text-center">
          <div class="text-h3 text-weight-bolder q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Esnek Fiyatlandırma Seçenekleri</div>
          <div class="text-subtitle1 q-mb-md" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">İşinizin büyümesine yardımcı olacak doğru planı seçin</div>
          <q-toggle
            v-model="annualBilling"
            left-label
            label="Yıllık Ödeme (%20 Tasarruf)"
            color="purple-8"
            class="q-mb-xl"
            style="font-family: 'Inter', sans-serif;"
          />
        </div>

        <div class="row q-col-gutter-lg justify-center">
          <!-- Basic Plan -->
          <div class="col-12 col-md-4">
            <q-card class="flex column neumorphic-card" style="border-radius: 12px; min-height: 450px; background: #F9FAFB;">
              <div class="card-header q-pa-md text-center">
                <q-chip class="plan-badge" color="purple-8" text-color="white">Popüler</q-chip>
                <div class="text-h5 text-weight-bold q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Temel Paket</div>
                <div class="text-body1 q-mb-md" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">Küçük işletmeler için ideal çözüm</div>
                <div class="price q-mb-sm">
                  <span class="text-h4 text-weight-bold" style="color: #6B46C1; font-family: 'Inter', sans-serif;">{{ annualBilling ? '₺4,790' : '₺499' }}</span>
                  <span class="text-subtitle2" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">{{ annualBilling ? '/yıl' : '/ay' }}</span>
                </div>
                <div v-if="annualBilling" class="text-caption q-mb-md" style="color: #7C3AED; font-family: 'Inter', sans-serif;">₺998 tasarruf edin</div>
              </div>
              <q-list class="q-pa-md">
                <q-item v-for="(feature, index) in basicFeatures" :key="index" class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="purple-8" size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="color: #4B3A7B; font-family: 'Inter', sans-serif;">{{ feature }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn
                label="Hemen Başla"
                class="neumorphic-btn q-ma-md"
                color="purple"
                text-color="white"
                unelevated
                style="font-family: 'Inter', sans-serif;"
              />
            </q-card>
          </div>

          <!-- Professional Plan -->
          <div class="col-12 col-md-4">
            <q-card class="flex column neumorphic-card" style="border-radius: 12px; min-height: 450px; background: #F9FAFB;">
              <div class="card-header q-pa-md text-center">
                <div class="text-h5 text-weight-bold q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Profesyonel Paket</div>
                <div class="text-body1 q-mb-md" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">Büyüyen işletmeler için gelişmiş özellikler</div>
                <div class="price q-mb-sm">
                  <span class="text-h4 text-weight-bold" style="color: #6B46C1; font-family: 'Inter', sans-serif;">{{ annualBilling ? '₺9,590' : '₺999' }}</span>
                  <span class="text-subtitle2" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">{{ annualBilling ? '/yıl' : '/ay' }}</span>
                </div>
                <div v-if="annualBilling" class="text-caption q-mb-md" style="color: #7C3AED; font-family: 'Inter', sans-serif;">₺1,998 tasarruf edin</div>
              </div>
              <q-list class="q-pa-md">
                <q-item v-for="(feature, index) in proFeatures" :key="index" class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="purple-8" size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="color: #4B3A7B; font-family: 'Inter', sans-serif;">{{ feature }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-py-sm highlighted">
                  <q-item-section avatar>
                    <q-icon name="star" color="purple-8" size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="color: #4B3A7B; font-family: 'Inter', sans-serif;">Özel Hesap yöneticisi</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn
                label="Hemen Başla"
                class="neumorphic-btn q-ma-md"
                color="purple"
                text-color="white"
                unelevated
                style="font-family: 'Inter', sans-serif;"
              />
            </q-card>
          </div>

          <!-- Enterprise Plan -->
          <div class="col-12 col-md-4">
            <q-card class="flex column neumorphic-card" style="border-radius: 12px; min-height: 450px; background: #F9FAFB;">
              <div class="card-header q-pa-md text-center">
                <div class="text-h5 text-weight-bold q-mb-sm" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Kurumsal Çözüm</div>
                <div class="text-body1 q-mb-md" style="color: #4B3A7B; font-family: 'Inter', sans-serif;">Özel ihtiyaçlarınız için özelleştirilmiş</div>
                <div class="price q-mb-sm">
                  <span class="text-h4 text-weight-bold" style="color: #6B46C1; font-family: 'Inter', sans-serif;">Özel Fiyat</span>
                </div>
              </div>
              <q-list class="q-pa-md">
                <q-item v-for="feature in enterpriseFeatures" :key="feature" class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="purple-8" size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="color: #4B3A7B; font-family: 'Inter', sans-serif;">{{ feature }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn
                label="İletişime Geçin"
                class="neumorphic-btn q-ma-md"
                outline
                style="color: #7C3AED; border-color: #7C3AED; font-family: 'Inter', sans-serif;"
              />
            </q-card>
          </div>
        </div>
      </div>
  </q-page-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'HomePage',
  data() {
    return {
      drawerOpen: false
    }
  },
  setup() {
    const annualBilling = ref(false);
    const currentSlide = ref(0);
    const basicFeatures = ref([
      "Barkodlu ürün takibi",
      "Temel stok yönetimi",
      "Gerçek zamanlı raporlar",
      "Mobil erişim",
      "E-posta desteği",
    ]);
    const proFeatures = ref([
      "Barkodlu ürün takibi",
      "Gelişmiş stok yönetimi",
      "Tam zamanlı raporlar ve analiz",
      "Çoklu cihaz desteği",
      "Özel hesap yöneticisi",
      "7/24 telefon ve canlı destek",
    ]);
    const enterpriseFeatures = ref([
      "Tüm profesyonel özellikler",
      "Özel bulut dağıtımı",
      "API erişimi",
      "Öncelikli destek",
      "Özel eğitimler",
    ]);
    const testimonials = ref([
      {
        title: "PROFESYONEL & GÜVENİLİR",
        rating: "★★★★★",
        comment: '"Son bir yıldır Tarasat ile çalışıyoruz ve aradaki fark inanılmaz. Stok takibimiz hiç bu kadar düzenli ve şeffaf olmamıştı. Ekip son derece profesyonel ve detaylara inanılmaz özen gösteriyor. Son dönemde sundukları destek, beklentilerimizi fazlasıyla aştı — gerçekten harika bir hizmetti!"',
        name: "Ahmet ve Zeynep K."
      },
      {
        title: "İNANILMAZ HİZMET",
        rating: "★★★★★",
        comment: '"Tarasat\'ın sunduğu hizmetler için yeterince övemem. İş süreçlerimizi karmaşadan düzenli, şeffaf ve verimli bir yapıya dönüştürdüler. Detaylara gösterdikleri dikkat ve mükemmeliyete olan bağlılıkları, onları gerçekten farklı kılan unsurlardır."',
        name: "Elif Y."
      },
      {
        title: "ENDİŞESİZ YÖNETİM",
        rating: "★★★★★",
        comment: '"Planlamadan uygulamaya kadar, Tarasat ile her şey kusursuz. Stok ve finansal kayıtlarımız her zaman düzenli ve güncel, her şeyin kontrol altında olduğunu bilerek rahatça işimize odaklanıyoruz. Güvenilir sistemleri sayesinde endişelerim azaldı."',
        name: "Emre T."
      }
    ]);
    const features = ref([
      {
        name: "Barkodlu Takip",
        description: "Ürünlerinizi barkod ile kolayca tanımlayın ve takip edin, stok yönetiminde hatasız bir deneyim yaşayın.",
        image: "src/assets/stok.webp"
      },
      {
        name: "Gerçek Zamanlı Raporlar",
        description: "Anlık stok durumu ve hareketlerini takip ederek iş kararlarınızı hızlı ve doğru bir şekilde alın.",
        image: "src/assets/alacak.webp"
      },
      {
        name: "Çoklu Cihaz Desteği",
        description: "Mobil, tablet ve bilgisayardan erişim imkanı ile her zaman, her yerde iş süreçlerinizi yönetin.",
        image: "src/assets/ente.jpg"
      }
    ]);

    let autoSlideInterval = null;

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % features.value.length;
    };

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + features.value.length) % features.value.length;
    };

    onMounted(() => {
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    });

    onUnmounted(() => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    });

    return {
      annualBilling,
      currentSlide,
      basicFeatures,
      proFeatures,
      enterpriseFeatures,
      testimonials,
      features,
      nextSlide,
      prevSlide
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
    },
    navigateTo(route) {
      this.drawerOpen = false
      console.log(`Navigating to: ${route}`)
      // this.$router.push(route) // Vue Router kullanıyorsanız
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body, .q-btn, .q-chip, .q-item-label, .text-h3, .text-h5, .text-subtitle1, .text-subtitle2, .text-body1, .text-caption {
  font-family: 'Inter', sans-serif;
}

.gradient-bg {
  background: linear-gradient(to bottom right, #6B46C1, #A78BFA);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.gradient-bg::before,
.gradient-bg::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  z-index: 0;
}

.gradient-bg::before {
  width: 300px;
  height: 300px;
  top: 20%;
  left: 10%;
}

.gradient-bg::after {
  width: 200px;
  height: 200px;
  bottom: 15%;
  right: 15%;
}

/* Drawer Styling */
.q-drawer {
  background: linear-gradient(to bottom right, #6B46C1, #9F7AEA) !important;
  color: white;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
}

.drawer-header {
  background: linear-gradient(to right, #7C3AED, #A78BFA);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.active-menu-item {
  background: rgba(255, 255, 255, 0.15);
  border-left: 5px solid #E9D5FF;
  font-weight: bold;
}

.q-item {
  border-radius: 8px;
  margin: 0 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Responsive classes */
.desktop-only {
  display: flex;
  @media (max-width: 599px) {
    display: none !important;
  }
}

.mobile-only {
  display: none;
  @media (max-width: 599px) {
    display: block !important;
  }
}

/* Neumorphic Card Styling */
.neumorphic-card {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.neumorphic-card:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15), -2px -2px 4px rgba(255, 255, 255, 0.6);
  transform: translateY(-4px);
}

/* Neumorphic Button Styling */
.neumorphic-btn {
  border-radius: 12px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  padding: 12px 24px;
}

.neumorphic-btn:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Pricing Section Styling */
.plan-badge {
  font-size: 0.8em;
  font-weight: 600;
}

.price {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
}

.highlighted {
  background: rgba(124, 58, 237, 0.1);
  border-radius: 8px;
}

/* Slider Section Styling */
.product-card {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card-info {
  text-align: center;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #F9FAFB;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
}

.slider-nav.left {
  left: 10px;
}

.slider-nav.right {
  right: 10px;
}

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hover Pause for Slider */
.product-card:hover .card-content {
  animation-play-state: paused;
}

.logo-container {
  width: 64px;
  height: 64px;
}
</style>