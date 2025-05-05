<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <!-- Minimal HEADER -->
  <q-header class="bg-white text-dark shadow-1">
  <q-toolbar class="q-px-lg">
    <!-- Menü butonu ve "Menu" yazısı (tüm ekran boyutlarında) -->
    <div class="row items-center">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="q-mr-sm"
        />
        MENÜ
    </div>

    <!-- Logo -->
    <q-img
      src="src/assets/image11.png"
      alt="Tarasat Logo"
      style="width: 100px; height: auto; min-width: 100px"
      class="q-mx-md"
    />

    <!-- Slogan (tam ortada) -->
    <q-toolbar-title class="slogan text-black text-weight-regular gt-xs">
      Tarasat: Liste ve Takip Uygulaması
    </q-toolbar-title>

    <!-- Giriş Yap butonu (sağ tarafta) -->
    <q-btn
      flat
      to="/firmalogin"
      class="text-black"
      no-caps
    >
      <q-icon name="login" size="sm" class="q-mr-xs" />
      <span>Giriş Yap</span>
    </q-btn>
  </q-toolbar>

  <!-- Modern sol menü -->
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    bordered
    behavior="mobile"
    class="bg-white text-dark"
    :width="280"
  >
    <q-scroll-area class="fit">
      <!-- Menü başlık ve kapat butonu -->
      <div class="row items-center justify-between q-pa-sm bg-grey-2">
        <div class="text-h6 q-pl-sm">Menü</div>
        <q-btn
          flat
          round
          dense
          icon="close"
          @click="toggleLeftDrawer"
          class="text-dark"
        />
      </div>

      <q-list padding class="menu-list">
        <q-item 
          clickable 
          v-ripple
          @click="handleMenuItemClick('whyTarasat')"
          class="menu-item"
        >
          <q-item-section avatar>
            <q-icon name="question_mark" color="primary" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Neden Tarasat?</q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple
          @click="handleMenuItemClick('pricing')"
          class="menu-item"
        >
          <q-item-section avatar>
            <q-icon name="sell" color="primary" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Fiyatlandırma</q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple
          @click="handleMenuItemClick('contact')"
          class="menu-item"
        >
          <q-item-section avatar>
            <q-icon name="shopping_cart" color="primary" />
          </q-item-section>
          <q-item-section class="text-weight-medium">İletişim</q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item 
          clickable 
          v-ripple
          to="/firmalogin"
          class="menu-item bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="login" color="white" />
          </q-item-section>
          <q-item-section class="text-weight-bold">Giriş Yap</q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" color="white" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</q-header>

    <!-- Page Content -->
    <q-page-container>
      <!-- Hero Section -->
      <div class="hero-section bg-indigo-10 text-white q-px-xl q-pt-xl q-pb-lg">
  <div class="row items-center q-col-gutter-xl">
    
    <div class="col-md-6 order-md-2">
      <video
      class="alacakpng"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="src/assets/videoplayback.mp4" type="video/mp4">
      Tarayıcınız video etiketini desteklemiyor.
    </video>
    
    </div>
    <div class="col-md-6 order-md-1">
      <h1 class="text-h2 text-weight-bolder q-mb-sm">Tarasat ile Tanışın</h1>
      <p class="text-h6 q-mb-lg">Barkodlu takip hiç bu kadar keyifli olmamıştı. Renkli, hızlı ve yaratıcı bir deneyim sizi bekliyor!</p>
      <q-btn color="yellow" text-color="dark" label="Hemen İncele" size="lg" class="q-mt-sm" />
    </div>
  </div>
</div>



      <!-- Features Section -->
      <div id="whyTarasat" class="features-section q-px-xl q-py-xl">
        <h2 class="text-h4 text-center text-weight-bold q-mb-xl">Neden Tarasat?</h2>

        <div class="row q-col-gutter-xl">
          <div class="col-md-4" v-for="(feature, index) in features" :key="index">
            <q-card
              class="feature-card text-center q-pa-md"
              :class="'animate__animated animate__fadeInUp animate__delay-' + (index+1) + 's'"
            >
              <q-icon :name="feature.icon" size="xl" :color="feature.color" class="q-mb-md" />
              <h3 class="text-h5 text-weight-bold q-mb-sm">{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </q-card>
          </div>
        </div>
      </div>

     <!-- Pricing Section -->
     <div id="pricing" class="pricing-section  q-px-xl q-py-xl">
  <div class="text-center q-mb-xl">
    <h2 class="text-h4 text-weight-bold q-mb-sm">Fiyatlandırma</h2>
    <p class="text-subtitle1">Size uygun planı seçin ve hemen başlayın</p>
  </div>

  <div class="row justify-center q-col-gutter-xl">
    <div
      class="col-md-4"
      v-for="(plan, index) in pricingPlans"
      :key="index"
    >
      <q-card
        class="pricing-card text-center q-pa-md shadow-4 full-height-card"
        :class="{ 'bg-white text-primary scale-popular': plan.popular }"
        style="border-radius: 20px; transition: 0.3s ease-in-out; cursor: pointer; display: flex; flex-direction: column; height: 100%;"
        @mouseover="hovered = index"
        @mouseleave="hovered = null"
        :style="{ transform: hovered === index ? 'translateY(-5px)' : 'none' }"
      >
        <q-card-section>
          <div
            v-if="plan.popular"
            class="popular-badge q-mb-sm text-uppercase text-white bg-accent"
            style="padding: 4px 12px; border-radius: 999px; display: inline-block;"
          >
            Popüler
          </div>
          <h3 class="text-h5 text-weight-bold">{{ plan.name }}</h3>
          <p class="text-subtitle2 q-mt-sm q-mb-md">{{ plan.description }}</p>
          <div class="price q-my-lg">
            <span class="text-h3 text-weight-bold">{{ plan.price }}</span>
            <span class="text-subtitle2">/{{ plan.period }}</span>
          </div>
          <q-list dense class="q-mx-auto" style="max-width: 240px;">
            <q-item v-for="(feature, i) in plan.features" :key="i">
              <q-item-section avatar>
                <q-icon name="check_circle" color="positive" />
              </q-item-section>
              <q-item-section>{{ feature }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <!-- Push button to bottom -->
        <q-card-actions class="q-mt-auto q-px-md q-pt-none q-pb-lg">
          <q-btn
            :label="plan.buttonText"
            size="lg"
            class="full-width"
            style="border-radius: 12px; background: linear-gradient(to right, #00C6FF, #0072FF); color: white;"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</div>



    <!-- Contact Section -->
    <div id="contact" class="contact-section q-px-xl q-py-xl bg-gradient-to-b from-indigo-9 to-indigo-11">
  <div class="text-center q-mb-xl">
    <h2 class="text-h4 text-weight-bold q-mb-sm">Bizimle İletişime Geçin</h2>
    <p class="text-subtitle1">Sorularınız veya satın alma işlemi için bize ulaşın</p>
  </div>

  <div class="row justify-center">
    <div class="col-md-6 col-sm-10">
      <q-form @submit.prevent="submitContactForm" class="bg-white shadow-10 rounded-borders-xl q-px-lg q-py-lg">
        <div class="q-gutter-y-md">
          <q-input
            filled
            label="Adınız"
            v-model="contactForm.name"
            required
            placeholder="Adınızı girin"
            label-color="indigo-10"
            input-class="text-indigo-10"
            :rules="[val => !!val || 'Bu alan zorunludur']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="indigo-7" />
            </template>
          </q-input>

          <q-input
            filled
            label="E-posta"
            type="email"
            v-model="contactForm.email"
            required
            placeholder="E-posta adresinizi girin"
            label-color="indigo-10"
            input-class="text-indigo-10"
            :rules="[
              val => !!val || 'Bu alan zorunludur',
              val => /.+@.+\..+/.test(val) || 'Geçerli bir e-posta girin'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="indigo-7" />
            </template>
          </q-input>

          <q-input
            filled
            label="Mesajınız"
            type="textarea"
            v-model="contactForm.message"
            autogrow
            required
            placeholder="Mesajınızı buraya yazın"
            label-color="indigo-10"
            input-class="text-indigo-10"
            :rules="[val => !!val || 'Bu alan zorunludur']"
          >
            <template v-slot:prepend>
              <q-icon name="message" color="indigo-7" />
            </template>
          </q-input>

          <div class="text-center q-pt-md">
            <q-btn
              label="Mesajı Gönder"
              type="submit"
              color="indigo"
              class="q-px-xl q-py-sm text-bold rounded-buttons-lg"
              size="1.1rem"
              no-caps
              glossy
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</div>
    </q-page-container>


    <!-- Footer -->
    <q-footer class="bg-grey-1 text-grey-8 text-center q-py-md">
      © 2025 Tarasat • Barkodla Kolay Takip
    </q-footer>
  </q-layout>
</template>






<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();
const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};


function submitContactForm() {
  // Formu gönderme işlemi burada yapılır (örnek log)
  console.log("Form Gönderildi:", contactForm.value);
  // Temizleme
  contactForm.value = { name: '', email: '', message: '' };
}
const features = [
  {
    icon: 'qr_code_scanner',
    color: 'primary',
    title: 'Barkodlu Takip',
    description: 'Ürünlerinizi barkod ile kolayca tanımlayın ve takip edin.'
  },
  {
    icon: 'insights',
    color: 'primary',
    title: 'Gerçek Zamanlı Raporlar',
    description: 'Anlık stok durumunu ve hareketlerini takip edin.'
  },
  {
    icon: 'devices',
    color: 'primary',
    title: 'Çoklu Cihaz Desteği',
    description: 'Mobil, tablet ve bilgisayardan erişim imkanı.'
  }
]


// Pricing plans
const pricingPlans = [
  {
    name: 'Başlangıç',
    description: 'Küçük işletmeler için',
    price: '₺99',
    period: 'ay',
    features: [
      '100 ürüne kadar',
      'Temel raporlar',
      'E-posta desteği',
      '1 kullanıcı'
    ],
    buttonText: 'Başlat'
  },
  {
    name: 'Profesyonel',
    description: 'Orta ölçekli işletmeler için',
    price: '₺199',
    period: 'ay',
    features: [
      '500 ürüne kadar',
      'Gelişmiş raporlar',
      'Telefon desteği',
      '3 kullanıcı',
      'API erişimi'
    ],
    popular: true,
    buttonText: 'Başlat'
  },

]



const handleMenuItemClick = async (section) => {
  // Menüyü kapat
  leftDrawerOpen.value = false;
  
  // 100ms bekle (menü animasyonu için)
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Eğer ana sayfadaysak direkt scroll yap
  if (router.currentRoute.value.path === '/') {
    scrollToSection(section);
  } else {
    // Değilse önce ana sayfaya yönlendir
    await router.push('/');
    // Sonra scroll yap
    nextTick(() => {
      scrollToSection(section);
    });
  }
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');



body {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  background-color: #f9f9f9;
}

.hero-section {
  background: linear-gradient(to right, #3f51b5, #5c6bc0);
  color: white;
  padding: 80px 24px;
}


.feature-card {
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}


.scale-popular {
  transform: scale(1.05);
  border: 2px solid #FFEB3B;
}

.popular-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #1976D2;
  color: white;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.price {
  background: #e3f2fd;
  padding: 12px 20px;
  border-radius: 12px;
  display: inline-block;
  color: #1976D2;
}

.cta-section {
  background: #f1f5ff;
  padding: 60px 24px;
  border-radius: 30px;
}

.cta-section h2 {
  font-size: 2rem;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.q-footer {
  background-color: #f5f5f5;
  font-size: 0.9rem;
}

.animate__animated {
  animation-duration: 0.6s;
}

/* Mobile */
@media (max-width: 768px) {
  .hero-section .row {
    flex-direction: column-reverse;
  }

  .slogan {
    display: none;
  }

  .hero-section h1 {
    font-size: 1.8rem;
  }

  .hero-section p {
    font-size: 1rem;
  }
  .alacakpng{
  height: 100%;
  width: 100%;
}
}
.slogan{
  margin-left: 24%;
}
</style>
