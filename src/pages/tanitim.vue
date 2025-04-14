<!-- src/pages/Home.vue -->
<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section flex flex-center">
      <div class="text-center">
        <h1 class="text-h2 text-black animate__animated animate__fadeInDown">TARASAT</h1>
        <p class="text-h5 text-grey-8 q-mt-md animate__animated animate__fadeInUp animate__delay-1s">
          Barkodla kolay liste oluşturun, takibinizi hızlandırın
        </p>
        <q-btn
          color="black"
          text-color="white"
          label="Keşfet"
          class="q-mt-lg animate__animated animate__fadeInUp animate__delay-2s"
          @click="scrollToSection('about')"
        />
      </div>
    </section>

    <!-- Hakkımızda Section -->
    <section id="about" class="section about-section q-py-xl">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': aboutVisible }">
          Hakkımızda
        </h2>
        <div class="row q-mt-lg">
          <div class="col-md-6 col-sm-12 q-pr-md animate__animated" :class="{ 'animate__fadeInLeft': aboutVisible }">
            <p class="text-body1">
              Tarasat, barkod okuma ve liste takip sistemleriyle iş süreçlerinizi kolaylaştırır. 5 yılı aşkın deneyimimizle, kullanıcı dostu çözümler sunuyoruz.
            </p>
            <p class="text-body1 q-mt-md">
              Teknolojiye olan tutkumuzla, envanter yönetiminden raporlamaya kadar her adımda yanınızdayız.
            </p>
            <q-btn color="black" text-color="white" label="Daha Fazla Bilgi" class="q-mt-md" />
          </div>
          <div class="col-md-6 col-sm-12 q-pl-md animate__animated" :class="{ 'animate__fadeInRight': aboutVisible }">
            <q-img
              src="https://picsum.photos/id/237/800/500"
              alt="Tarasat Hakkında"
              class="rounded-borders shadow-5"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Hizmetlerimiz Section -->
    <section id="services" class="section services-section bg-grey-2 q-py-xl">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': servicesVisible }">
          Hizmetlerimiz
        </h2>
        <div class="row q-mt-xl">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="col-md-4 col-sm-6 col-xs-12 q-pa-md animate__animated"
            :class="{
              'animate__fadeInUp': servicesVisible,
              'animate__delay-1s': index === 1,
              'animate__delay-2s': index === 2,
            }"
          >
            <q-card class="service-card">
              <q-img :src="service.image" :alt="service.title" basic />
              <q-card-section>
                <h3 class="text-h6">{{ service.title }}</h3>
                <p class="text-body2 q-mt-sm">{{ service.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Fiyatlar Section -->
    <section id="pricing" class="section pricing-section q-py-xl">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': pricingVisible }">
          Fiyatlar
        </h2>
        <div class="row q-mt-xl">
          <div
            v-for="(plan, index) in pricingPlans"
            :key="index"
            class="col-md-4 col-sm-12 q-pa-md animate__animated"
            :class="{
              'animate__fadeInLeft': pricingVisible && index === 0,
              'animate__fadeInUp': pricingVisible && index === 1,
              'animate__fadeInRight': pricingVisible && index === 2,
              'animate__delay-1s': index === 1,
              'animate__delay-2s': index === 2,
            }"
          >
            <q-card class="pricing-card" :class="{ 'popular-plan': plan.popular }">
              <q-card-section>
                <div v-if="plan.popular" class="popular-badge">Popüler</div>
                <h3 class="text-h5 text-center">{{ plan.name }}</h3>
                <div class="price text-center q-mt-md">
                  <span class="text-h3">{{ plan.price }}</span>
                  <span class="text-body2">/{{ plan.period }}</span>
                </div>
                <ul class="q-mt-lg">
                  <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="q-py-xs">
                    <q-icon name="check" color="black" /> {{ feature }}
                  </li>
                </ul>
              </q-card-section>
              <q-card-actions class="q-px-md q-pb-md">
                <q-btn
                  color="black"
                  text-color="white"
                  :outline="!plan.popular"
                  :glossy="plan.popular"
                  :label="plan.buttonText"
                  class="full-width"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Galeri Section -->
    <section id="gallery" class="section gallery-section q-py-xl">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': galleryVisible }">
          Galeri
        </h2>
        <div class="row q-mt-lg q-col-gutter-md">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="col-md-3 col-sm-6 col-xs-12 animate__animated"
            :class="{
              'animate__fadeIn': galleryVisible,
              'animate__delay-1s': index === 1 || index === 5,
              'animate__delay-2s': index === 2 || index === 6,
              'animate__delay-3s': index === 3 || index === 7,
            }"
          >
            <q-img
              :src="image"
              class="gallery-image rounded-borders shadow-2"
              ratio="1"
              @click="openImageDialog(image)"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="imageDialog">
        <q-img :src="selectedImage" style="max-width: 90vw; max-height: 90vh" />
      </q-dialog>
    </section>

    <!-- İletişim Section -->
    <section id="contact" class="section contact-section bg-grey-2 q-py-xl">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': contactVisible }">
          İletişim
        </h2>
        <div class="row q-mt-xl">
          <div class="col-md-6 col-sm-12 q-pr-md animate__animated" :class="{ 'animate__fadeInLeft': contactVisible }">
            <h3 class="text-h5">Bize Ulaşın</h3>
            <p class="text-body1 q-mt-md">
              Tarasat ile ilgili sorularınız için bizimle iletişime geçin.
            </p>

            <div class="contact-info q-mt-lg">
              <div class="row items-center q-mb-md">
                <q-icon name="place" size="sm" class="q-mr-sm" />
                <span>1234 Şirket Adresi, İstanbul, Türkiye</span>
              </div>
              <div class="row items-center q-mb-md">
                <q-icon name="phone" size="sm" class="q-mr-sm" />
                <span>+90 555 123 45 67</span>
              </div>
              <div class="row items-center q-mb-md">
                <q-icon name="email" size="sm" class="q-mr-sm" />
                <span>info@tarasat.com</span>
              </div>
            </div>

            <div class="social-links q-mt-xl">
              <q-btn round color="black" icon="facebook" class="q-mr-sm" />
              <q-btn round color="black" icon="twitter" class="q-mr-sm" />
              <q-btn round color="black" icon="instagram" class="q-mr-sm" />
              <q-btn round color="black" icon="linkedin" />
            </div>
          </div>
          <div class="col-md-6 col-sm-12 q-pl-md animate__animated" :class="{ 'animate__fadeInRight': contactVisible }">
            <q-form @submit="onSubmit" class="contact-form">
              <q-input
                v-model="form.name"
                label="Adınız"
                outlined
                class="q-mb-md"
                :rules="[val => !!val || 'Bu alan zorunludur']"
              />
              <q-input
                v-model="form.email"
                label="E-posta"
                outlined
                type="email"
                class="q-mb-md"
                :rules="[
                  val => !!val || 'Bu alan zorunludur',
                  val => /.+@.+\..+/.test(val) || 'Geçerli bir e-posta adresi girin',
                ]"
              />
              <q-input
                v-model="form.phone"
                label="Telefon"
                outlined
                class="q-mb-md"
              />
              <q-input
                v-model="form.message"
                label="Mesajınız"
                outlined
                type="textarea"
                class="q-mb-md"
                :rules="[val => !!val || 'Bu alan zorunludur']"
              />
              <q-btn
                label="Gönder"
                type="submit"
                color="black"
                text-color="white"
                class="full-width"
              />
            </q-form>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const services = ref([
  {
    title: 'Barkod Taraması',
    description: 'Hızlı ve doğru barkod okuma ile envanterinizi anında kaydedin.',
    image: 'https://picsum.photos/id/250/800/500',
  },
  {
    title: 'Liste Oluşturma',
    description: 'Kategorilere göre özelleştirilmiş listeler oluşturun ve düzenleyin.',
    image: 'https://picsum.photos/id/251/800/500',
  },
  {
    title: 'Takip ve Raporlama',
    description: 'Gerçek zamanlı takip ve detaylı raporlarla iş süreçlerinizi optimize edin.',
    image: 'https://picsum.photos/id/252/800/500',
  },
]);

const pricingPlans = ref([
  {
    name: 'Temel Paket',
    price: '₺299',
    period: 'ay',
    features: ['100 Barkod Taraması', 'Basit Liste Oluşturma', 'E-posta Desteği'],
    buttonText: 'Başla',
    popular: false,
  },
  {
    name: 'Profesyonel Paket',
    price: '₺799',
    period: 'ay',
    features: ['Sınırsız Barkod Taraması', 'Gelişmiş Liste Yönetimi', 'Raporlama', 'Öncelikli Destek'],
    buttonText: 'Popüler Seçim',
    popular: true,
  },
  {
    name: 'Kurumsal Paket',
    price: '₺1499',
    period: 'ay',
    features: ['Sınırsız Barkod Taraması', 'Özel Liste Şablonları', 'Tam Raporlama', '7/24 Destek'],
    buttonText: 'İletişime Geç',
    popular: false,
  },
]);

const galleryImages = ref([
  'https://picsum.photos/id/10/800/800',
  'https://picsum.photos/id/11/800/800',
  'https://picsum.photos/id/12/800/800',
  'https://picsum.photos/id/13/800/800',
  'https://picsum.photos/id/14/800/800',
  'https://picsum.photos/id/15/800/800',
  'https://picsum.photos/id/16/800/800',
  'https://picsum.photos/id/17/800/800',
]);

const imageDialog = ref(false);
const selectedImage = ref('');
const aboutVisible = ref(false);
const servicesVisible = ref(false);
const pricingVisible = ref(false);
const galleryVisible = ref(false);
const contactVisible = ref(false);

const openImageDialog = (image) => {
  selectedImage.value = image;
  imageDialog.value = true;
};

const onSubmit = () => {
  console.log('Form gönderildi:', form.value);
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;

  const aboutSection = document.querySelector('.about-section');
  if (aboutSection && scrollPosition > aboutSection.offsetTop + 100) {
    aboutVisible.value = true;
  }

  const servicesSection = document.querySelector('.services-section');
  if (servicesSection && scrollPosition > servicesSection.offsetTop + 100) {
    servicesVisible.value = true;
  }

  const pricingSection = document.querySelector('.pricing-section');
  if (pricingSection && scrollPosition > pricingSection.offsetTop + 100) {
    pricingVisible.value = true;
  }

  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection && scrollPosition > gallerySection.offsetTop + 100) {
    galleryVisible.value = true;
  }

  const contactSection = document.querySelector('.contact-section');
  if (contactSection && scrollPosition > contactSection.offsetTop + 100) {
    contactVisible.value = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.hero-section {
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.3)),
              url('https://r.resimlink.com/HZrXJ0zo5TiR.webp') no-repeat center center;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
}

.section {
  padding: 80px 0;
  font-family: 'Poppins', sans-serif;
}

.about-section,
.pricing-section,
.gallery-section {
  background-color: #fff;
}

.services-section,
.contact-section {
  background-color: #f5f5f5;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  color: #000;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #000;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

[class*="col-"] {
  padding: 0 15px;
}

.col-md-3 { width: 25%; }
.col-md-4 { width: 33.33%; }
.col-md-6 { width: 50%; }
.col-sm-6 { width: 50%; }
.col-sm-12 { width: 100%; }
.col-xs-12 { width: 100%; }

.text-h2 {
  font-weight: 700;
  font-size: 3rem;
  color: #000;
}

.text-h5 {
  font-weight: 400;
  font-size: 1.5rem;
  color: #333;
}

.text-h6 {
  font-weight: 700;
  color: #000;
}

.text-body1 {
  font-weight: 400;
  color: #333;
}

.text-body2 {
  font-weight: 400;
  color: #333;
}

.service-card {
  height: 100%;
  transition: transform 0.3s ease;
  background-color: #fff;
}

.service-card:hover {
  transform: translateY(-10px);
}

.pricing-card {
  position: relative;
  height: 100%;
  transition: transform 0.3s ease;
  border: 2px solid transparent;
  background-color: #fff;
}

.pricing-card:hover {
  transform: translateY(-10px);
}

.popular-plan {
  border-color: #000;
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #000;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.price {
  color: #000;
}

.gallery-image {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.contact-form {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-info span {
  font-weight: 400;
  color: #333;
}

@media (max-width: 768px) {
  .section {
    padding: 50px 0;
  }

  .hero-section {
    .text-h2 {
      font-size: 2rem;
    }

    .text-h5 {
      font-size: 1.2rem;
    }
  }

  .col-md-3,
  .col-md-4,
  .col-md-6,
  .col-sm-6 {
    width: 100%;
  }
}
</style>