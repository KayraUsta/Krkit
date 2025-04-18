```vue
<template>
  <q-page>
    <!-- Hero Section -->
    <section class="hero-section flex flex-center">
      <div class="text-center">
        <h1 class="text-h2 text-white animate__animated animate__fadeInDown">TARASAT</h1>
        <p class="text-h5 text-white q-mt-md animate__animated animate__fadeInUp animate__delay-1s">
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
    <section id="about" class="section about-section q-py-lg">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': aboutVisible }">
          Hakkımızda
        </h2>
        <div class="row q-mt-md">
          <div class="col-md-6 col-sm-12 q-pr-sm animate__animated" :class="{ 'animate__fadeInLeft': aboutVisible }">
            <p class="text-body2">
              Tarasat, barkod okuma ve liste takip sistemleriyle iş süreçlerinizi kolaylaştırır. 5 yılı aşkın deneyimimizle, kullanıcı dostu çözümler sunuyoruz.
            </p>
            <p class="text-body2 q-mt-sm">
              Teknolojiye olan tutkumuzla, envanter yönetiminden raporlamaya kadar her adımda yanınızdayız.
            </p>
            <q-btn color="black" text-color="white" label="Daha Fazla Bilgi" size="sm" class="q-mt-sm" />
          </div>
          <div class="col-md-6 col-sm-12 q-pl-sm animate__animated" :class="{ 'animate__fadeInRight': aboutVisible }">
            <q-img
              src="src/assets/stok.webp"
              alt="Tarasat Hakkında"
              class="rounded-borders shadow-2"
              style="max-width: 100%; height: auto;"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Hizmetlerimiz Section -->
    <section id="services" class="section services-section bg-grey-2 q-py-lg">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': servicesVisible }">
          Hizmetlerimiz
        </h2>
        <div class="row q-mt-md q-col-gutter-sm">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="col-md-4 col-sm-6 col-xs-12 q-pa-sm animate__animated"
            :class="{
              'animate__fadeInUp': servicesVisible,
              'animate__delay-1s': index === 1,
              'animate__delay-2s': index === 2,
            }"
          >
            <q-card class="service-card">
              <q-img
                :src="service.image"
                :alt="service.title"
                basic
                ratio="1"
                style="width: 100%; height: auto;"
                class="square-image"
              />
              <q-card-section class="q-py-sm">
                <h3 class="text-subtitle1">{{ service.title }}</h3>
                <p class="text-caption q-mt-xs">{{ service.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Fiyatlar Section -->
    <section id="pricing" class="section pricing-section q-py-lg">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': pricingVisible }">
          Fiyatlar
        </h2>
        <div class="row q-mt-md q-col-gutter-sm">
          <div
            v-for="(plan, index) in pricingPlans"
            :key="index"
            class="col-md-4 col-sm-12 q-pa-sm animate__animated"
            :class="{
              'animate__fadeInLeft': pricingVisible && index === 0,
              'animate__fadeInUp': pricingVisible && index === 1,
              'animate__fadeInRight': pricingVisible && index === 2,
              'animate__delay-1s': index === 1,
              'animate__delay-2s': index === 2,
            }"
          >
            <q-card class="pricing-card" :class="{ 'popular-plan': plan.popular }">
              <q-card-section class="q-py-sm">
                <div v-if="plan.popular" class="popular-badge">Popüler</div>
                <h3 class="text-subtitle1 text-center">{{ plan.name }}</h3>
                <div class="price text-center q-mt-sm">
                  <span class="text-h6">{{ plan.price }}</span>
                  <span class="text-caption">/{{ plan.period }}</span>
                </div>
                <ul class="q-mt-sm">
                  <li v-for="(feature, fIndex) in plan.features" :key="fIndex" class="q-py-xs text-caption">
                    <q-icon name="check" color="black" size="xs" /> {{ feature }}
                  </li>
                </ul>
              </q-card-section>
              <q-card-actions class="q-px-sm q-pb-sm">
                <q-btn
                  color="black"
                  text-color="white"
                  :outline="!plan.popular"
                  :glossy="plan.popular"
                  :label="plan.buttonText"
                  size="sm"
                  class="full-width"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Galeri Section -->
    <section id="gallery" class="section gallery-section q-py-lg">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': galleryVisible }">
          Galeri
        </h2>
        <div class="row q-mt-md q-col-gutter-sm">
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
              class="gallery-image rounded-borders shadow-1"
              ratio="1"
              style="width: 100%; height: auto;"
              @click="openImageDialog(image)"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="imageDialog">
        <q-img :src="selectedImage" style="max-width: 80vw; max-height: 80vh" />
      </q-dialog>
    </section>

    <!-- İletişim Section -->
    <section id="contact" class="section contact-section bg-grey-2 q-py-lg">
      <div class="container">
        <h2 class="section-title text-center animate__animated" :class="{ 'animate__fadeInUp': contactVisible }">
          İletişim
        </h2>
        <div class="row q-mt-md">
          <div class="col-md-6 col-sm-12 q-pr-sm animate__animated" :class="{ 'animate__fadeInLeft': contactVisible }">
            <h3 class="text-subtitle1">Bize Ulaşın</h3>
            <p class="text-caption q-mt-sm">
              Tarasat ile ilgili sorularınız için bizimle iletişime geçin.
            </p>
            <div class="contact-info q-mt-md">
              <div class="row items-center q-mb-sm">
                <q-icon name="place" size="xs" class="q-mr-sm" />
                <span class="text-caption">1234 Şirket Adresi, İstanbul, Türkiye</span>
              </div>
              <div class="row items-center q-mb-sm">
                <q-icon name="phone" size="xs" class="q-mr-sm" />
                <span class="text-caption">+90 555 123 45 67</span>
              </div>
              <div class="row items-center q-mb-sm">
                <q-icon name="email" size="xs" class="q-mr-sm" />
                <span class="text-caption">info@tarasat.com</span>
              </div>
            </div>
            <div class="social-links q-mt-md">
              <q-btn round color="black" icon="facebook" size="sm" class="q-mr-xs" />
              <q-btn round color="black" icon="twitter" size="sm" class="q-mr-xs" />
              <q-btn round color="black" icon="instagram" size="sm" class="q-mr-xs" />
              <q-btn round color="black" icon="linkedin" size="sm" />
            </div>
          </div>
          <div class="col-md-6 col-sm-12 q-pl-sm animate__animated" :class="{ 'animate__fadeInRight': contactVisible }">
            <q-form @submit="onSubmit" class="contact-form">
              <q-input
                v-model="form.name"
                label="Adınız"
                outlined
                dense
                class="q-mb-sm"
                :rules="[val => !!val || 'Bu alan zorunludur']"
              />
              <q-input
                v-model="form.email"
                label="E-posta"
                outlined
                dense
                type="email"
                class="q-mb-sm"
                :rules="[
                  val => !!val || 'Bu alan zorunludur',
                  val => /.+@.+\..+/.test(val) || 'Geçerli bir e-posta adresi girin',
                ]"
              />
              <q-input
                v-model="form.phone"
                label="Telefon"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                v-model="form.message"
                label="Mesajınız"
                outlined
                dense
                type="textarea"
                class="q-mb-sm"
                :rules="[val => !!val || 'Bu alan zorunludur']"
              />
              <q-btn
                label="Gönder"
                type="submit"
                color="black"
                text-color="white"
                size="sm"
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
    image: 'src/assets/barkod.jpg',
  },
  {
    title: 'Liste Oluşturma ve Takibi',
    description: 'Kategorilere göre özelleştirilmiş listeler oluşturun ve düzenleyin.',
    image: 'src/assets/liste.jpg',
  },
  {
    title: 'Stok Takip ve Raporlama',
    description: 'Gerçek zamanlı takip ve detaylı raporlarla iş süreçlerinizi optimize edin.',
    image: 'src/assets/stok.webp',
  },
  {
    title: 'Cari Alacak/Verecek Takibi',
    description: 'Gerçek zamanlı takip ve detaylı raporlarla iş süreçlerinizi optimize edin.',
    image: 'src/assets/alacak.png',
  },
]);

const pricingPlans = ref([
  {
    name: 'Temel Paket',
    price: '₺299',
    period: 'ay',
    features: ['Stok Girişi', 'Liste Oluşturma ve takibi', 'Cari Takibi'],
    buttonText: 'Başla',
    popular: false,
  },
  {
    name: 'Profesyonel Paket',
    price: '₺799',
    period: 'ay',
    features: ['Detaylı Stok Takibi', 'Gelişmiş Liste Yönetimi', 'Gelişmiş Raporlama', 'Öncelikli Destek'],
    buttonText: 'Popüler Seçim',
    popular: true,
  },
 
]);

const galleryImages = ref([
  'src/assets/aaa.jpg',
  'src/assets/aaa.jpg',
  'src/assets/aaa.jpg',
  'src/assets/aaa.jpg',
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
  if ( gallerySection && scrollPosition > gallerySection.offsetTop + 100) {
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
.hero-section {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
              url('https://r.resimlink.com/HZrXJ0zo5TiR.webp') no-repeat center center;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.text-h2 {
  font-weight: 600;
  font-size: 3rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.text-h5 {
  font-weight: 400;
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-section {
    .text-h2 {
      font-size: 2rem;
    }

    .text-h5 {
      font-size: 1.2rem;
    }
  }
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
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  color: #000;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: #000;
  }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

[class*="col-"] {
  padding: 0 10px;
}

.col-md-3 { width: 25%; }
.col-md-4 { width: 33.33%; }
.col-md-6 { width: 50%; }
.col-sm-6 { width: 50%; }
.col-sm-12 { width: 50%; }
.col-xs-12 { width: 50%; }

.text-h2 {
  font-weight: 600;
  font-size: 2.5rem;
  color: #000;
}

.text-h5 {
  font-weight: 400;
  font-size: 1.3rem;
  color: #333;
}

.text-subtitle1 {
  font-weight: 600;
  font-size: 1rem;
  color: #000;
}

.text-body2 {
  font-weight: 400;
  font-size: 0.9rem;
  color: #333;
}

.text-caption {
  font-weight: 400;
  font-size: 0.8rem;
  color: #333;
}

.service-card {
  height: 100%;
  transition: transform 0.2s ease;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-5px);
}

.square-image {
  aspect-ratio: 1/1;
  object-fit: cover;
}

.pricing-card {
  position: relative;
  height: 100%;
  transition: transform 0.2s ease;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 8px;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.popular-plan {
  border-color: #000;
}

.popular-badge {
  position: absolute;
  top: -10px;
  right: 15px;
  background: #000;
  color: #fff;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
}

.price {
  color: #000;
}

.gallery-image {
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 8px;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.gallery-image:hover {
  transform: scale(1.03);
}

.contact-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.contact-info span {
  font-weight: 400;
  color: #333;
}

@media (max-width: 768px) {
  .section {
    padding: 30px 0;
  }

  .hero-section {
    .text-h2 {
      font-size: 1.8rem;
    }

    .text-h5 {
      font-size: 1rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .col-md-3,
  .col-md-4,
  .col-md-6,
  .col-sm-6 {
    width: 100%;
  }

  .square-image,
  .gallery-image {
    max-width: 150px;
    margin: 0 auto;
  }
}
</style>
```