<template>
  <q-page-container class="bg-white" style="padding-top: 0; padding-bottom: 0;">
    <!-- ÜST KISIM: MEVCUT TASARIM -->
    <div class="row items-stretch justify-between" style="min-height: 100vh;">
      <!-- SOL TARAF: METİN -->
      <div class="col-6 flex column justify-center q-pa-xl" style="padding-left: 64px; padding-right: 64px;">
        <div class="text-h4 text-bold q-mb-md" style="color: #5e4b7b;">
          Her Listede Kolaylık, Her Adımda Kontrol: <br />
          Tarasat Liste, Takip ve Ön Muhasebe Programı
        </div>
        <div class="text-subtitle1 q-mb-lg" style="color: #333;">
          Kağıt liste tutmaya son veren son model liste takip ve ön muhasebe programı Tarasat'ı incelemeye başlayın.
        </div>
        <q-btn
          label="İncelemeye Başla"
          unelevated
          style="background-color: #5e4b7b; color: white; border-radius: 8px;"
        />
      </div>

      <!-- SAĞ TARAF: GÖRSEL -->
      <div class="col-6">
        <img
          src="src/assets/barkod.jpg"
          alt="Tarasat Tanıtım Görseli"
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;"
        />
      </div>
    </div>

    <!-- NEDEN TARASAT BÖLÜMÜ -->
    <div class="q-pa-xl" style="background: linear-gradient(135deg, #5e4b7b 0%, #7a6799 100%);">
      <div class="text-h3 text-weight-bolder text-center text-white q-mb-xl" style="letter-spacing: 0.5px;">
        Neden Tarasat?
      </div>
      <div class="row q-col-gutter-lg justify-center">
        <!-- Kart 1: Barkodlu Takip -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="assessment" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Barkodlu Takip</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Ürünlerinizi barkod ile kolayca tanımlayın ve takip edin.
            </div>
          </q-card>
        </div>
        
        <!-- Kart 2: Gerçek Zamanlı Raporlar -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="assessment" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Gerçek Zamanlı Raporlar</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Anlık stok durumunu ve hareketlerini takip edin.
            </div>
          </q-card>
        </div>
        
        <!-- Kart 3: Çoklu Cihaz Desteği -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="devices" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Çoklu Cihaz Desteği</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Mobil, tablet ve bilgisayardan erişim imkanı.
            </div>
          </q-card>
        </div>
        
        <!-- Kart 4: Cari Takibi -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="contacts" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Cari Takibi</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Müşteri ve tedarikçi hesaplarını kolayca yönetin.
            </div>
          </q-card>
        </div>
        
        <!-- Kart 5: Alacak Verecek -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="account_balance" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Alacak Verecek Takibi</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Ödemelerinizi ve borçlarınızı düzenli olarak izleyin.
            </div>
          </q-card>
        </div>
        
        <!-- Kart 6: Stok Takibi -->
        <div class="col-12 col-md-4">
          <q-card class="flex column justify-center items-center q-pa-lg" style="border-radius: 12px; min-height: 240px;">
            <q-icon name="inventory" size="xl" color="purple-8" class="q-mb-md" />
            <div class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #5e4b7b;">Stok Takibi</div>
            <div class="text-body1 text-center" style="color: #555; line-height: 1.5;">
              Stok seviyelerinizi anlık olarak kontrol edin.
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- TARASAT ÖZELLİKLERİ BÖLÜMÜ -->
    <div class="q-pa-xl bg-white">
      <section class="q-mb-xl">
        <!-- Kategori Butonları -->
        <div class="row justify-center q-mb-lg">
          <div class="col-12 text-center">
            <q-btn 
              v-for="(category, idx) in categories" 
              :key="idx"
              :label="category"
              :class="{ 'active-category': activeCategory.value === category }"
              outline
              color="purple-8"
              class="q-ma-xs category-btn"
              @click="filterFeatures(category)"
            />
          </div>
        </div>

        <!-- Özellik Kartları -->
        <div v-for="(feature, index) in filteredFeatures" :key="index" class="feature-card q-mb-xl">
          <q-card class="my-card bg-grey-1">
            <div class="row items-center">
              <!-- Sol taraf - Resim -->
              <div class="col-md-5 col-sm-12 q-pa-sm">
                <q-img
                  :src="feature.image"
                  :alt="feature.name"
                  class="feature-image rounded-borders"
                  ratio="1"
                  spinner-color="primary"
                />
              </div>
              
              <!-- Sağ taraf - Açıklama -->
              <div class="col-md-7 col-sm-12 q-pa-md">
                <q-card-section class="q-pa-none q-mb-sm">
                  <div class="text-h4 text-weight-bold" style="color: #5e4b7b;">{{ feature.name }}</div>
                </q-card-section>
                
                <q-card-section class="q-pa-none q-mb-md">
                  <p class="text-body1 text-grey-9">{{ feature.description }}</p>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </section>
    </div>



    <!-- MÜŞTERİ REFERANSLARI BÖLÜMÜ -->
    <div class="yorumcontainer q-pa-xl">
      <div class="yorumcontaineryazi">
        <h2 class="text-h5 text-weight-bold text-center q-mb-sm" style="color: #7a6799;">MÜŞTERİ REFERANSLARI</h2>
        <h1 class="text-h3 text-weight-bolder text-center q-mb-md" style="color: #5e4b7b;">MÜŞTERİLERİN BİZİM <br> HAKKIMIZDA SÖYLEDİKLERİ</h1>
        <p class="yorumyazi text-subtitle1 text-center q-mb-xl" style="color: #333;">
          Müşterilerimizden aldığımız olağanüstü geri bildirimler, finansal doğruluk ve hizmet kalitesine olan sarsılmaz bağlılığımızı yansıtıyor. İşletmelerin mali süreçlerinde güvenle ilerlemelerini sağlayan çözümlerimiz, memnuniyetin ve profesyonelliğin doğal bir sonucu olarak öne çıkıyor.
        </p>

        <div class="referanslar row q-col-gutter-lg justify-center">
          <q-card v-for="(testimonial, index) in testimonials" :key="index" class="referans bg-white q-pa-md" flat>
            <div class="yildizlar text-purple-8 q-mb-md text-center" style="font-size: 1.5em;">{{ testimonial.rating }}</div>
            <h3 class="text-h6 text-weight-bold text-center q-mb-md" style="color: #5e4b7b;">{{ testimonial.title }}</h3>
            <p class="cosyorum text-body1 text-grey-8 text-center q-mb-md">{{ testimonial.comment }}</p>
            <p class="cosname text-subtitle2 text-center" style="color: #7a6799;">{{ testimonial.name }}</p>
          </q-card>
        </div>
      </div>
    </div>

    <!-- FİYATLANDIRMA BÖLÜMÜ -->
    <div class="pricing-container">
      <div class="pricing-header">
        <h1 class="gradient-text">Esnek Fiyatlandırma Seçenekleri</h1>
        <p class="subtitle">İşinizin büyümesine yardımcı olacak doğru planı seçin</p>
        
        <q-toggle
          v-model="annualBilling"
          left-label="Yıllık Ödeme (%20 Tasarruf)"
          color="purple"
          class="billing-toggle"
        />
      </div>

      <div class="pricing-cards">
        <!-- Basic Plan -->
        <div class="pricing-card basic">
          <div class="card-header">
            <div class="plan-badge">Popüler</div>
            <h3>Temel Paket</h3>
            <p class="plan-description">Küçük işletmeler için ideal çözüm</p>
            <div class="price">
              <span class="amount">{{ annualBilling ? '₺4,790' : '₺499' }}</span>
              <span class="period">{{ annualBilling ? '/yıl' : '/ay' }}</span>
            </div>
            <div v-if="annualBilling" class="savings">₺998 tasarruf edin</div>
          </div>
          <ul class="features">
            <li v-for="(feature, index) in basicFeatures" :key="index">
              <q-icon name="check_circle" class="feature-icon" />
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Professional Plan -->
        <div class="pricing-card professional">
          <div class="card-header">
            <h3>Profesyonel Paket</h3>
            <p class="plan-description">Büyüyen işletmeler için gelişmiş özellikler</p>
            <div class="price">
              <span class="amount">{{ annualBilling ? '₺9,590' : '₺999' }}</span>
              <span class="period">{{ annualBilling ? '/yıl' : '/ay' }}</span>
            </div>
            <div v-if="annualBilling" class="savings">₺1,998 tasarruf edin</div>
          </div>
          <ul class="features">
            <li v-for="(feature, index) in proFeatures" :key="index">
              <q-icon name="check_circle" class="feature-icon" />
              {{ feature }}
            </li>
            <li class="highlighted">
              <q-icon name="star" class="feature-icon" />
              Özel entegrasyon desteği
            </li>
          </ul>
        </div>

        <!-- Enterprise Plan -->
        <div class="pricing-card enterprise">
          <div class="card-header">
            <h3>Kurumsal Çözüm</h3>
            <p class="plan-description">Özel ihtiyaçlarınız için özelleştirilmiş</p>
            <div class="price">
              <span class="amount">Özel Fiyat</span>
            </div>
          </div>
          <ul class="features">
            <li><q-icon name="check_circle" class="feature-icon" /> Tüm profesyonel özellikler</li>
            <li><q-icon name="check_circle" class="feature-icon" /> Özel bulut dağıtımı</li>
            <li><q-icon name="check_circle" class="feature-icon" /> API erişimi</li>
            <li><q-icon name="check_circle" class="feature-icon" /> Öncelikli destek</li>
            <li><q-icon name="check_circle" class="feature-icon" /> Özel eğitimler</li>
          </ul>
          <q-btn
            label="İletişime Geçin"
            outline
            class="cta-button"
            style="color: #764ba2; border-color: #764ba2;"
          />
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const annualBilling = ref(false);

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

const categories = ["Barkod", "Raporlama", "Stok", "Cari", "Entegrasyon"];
const activeCategory = ref("Barkod");

const features = [
  {
    id: 1,
    name: "Barkodlu Ürün Takibi",
    type: "Stok Yönetimi",
    integration: "Tüm modüllerle uyumlu",
    usage: "Günlük işlemler",
    description: "Ürünlerinizi barkod ile kolayca tanımlayın, stok takibinizi zahmetsizce yönetin. Stok giriş-çıkışlarını anlık olarak takip edin, ürün hareketlerinizi geçmişe dönük inceleyin ve her zaman güncel kalın. Tarasat sayesinde manuel işlemlerle zaman kaybetmeden, ürün yönetiminizi hızlı, hatasız ve dijital olarak gerçekleştirin.",
    image: "src/assets/sddefault.jpg",
    buttonText: "Demo İzle",
    buttonIcon: "play_circle",
    category: "Barkod"
  },
  {
    id: 2,
    name: "Gerçek Zamanlı Raporlar",
    type: "Analiz",
    integration: "Finans ve Stok modülleri",
    usage: "Haftalık/Monthly raporlar",
    description: "Anlık stok durumunu ve tüm ürün hareketlerini zahmetsizce takip edin. Stoklarınızda hangi ürün ne kadar kaldı, ne zaman giriş-çıkış yaptı gibi bilgilere anında ulaşın. Özelleştirilebilir ve detaylı raporlar ile satış trendlerinizi, en çok hareket gören ürünlerinizi ve stok devir hızınızı analiz ederek, işletmenizin performansını doğru verilerle yönetin. Tarasat ile sadece stok takibi değil, stratejik karar alma sürecinizde de fark yaratın.",
    image: "src/assets/rapor.jpg",
    buttonText: "Rapor Örnekleri",
    buttonIcon: "description",
    category: "Raporlama"
  },
  {
    id: 3,
    name: "Tam Zamanlı Entegrasyon",
    type: "Kullanıcı Yönetimi",
    integration: "Tüm sistem",
    usage: "Sürekli kullanım",
    description: "Her Yerden Erişim, Güvenli ve Esnek Kullanım Deneyimi. Tarasat’a internet bağlantısı olan her cihazdan – ister cep telefonunuzdan, ister tabletinizden, isterseniz bilgisayarınızdan – kolayca erişin. İşlerinizi masa başına bağlı kalmadan yönetin. Ekip üyelerinize özel yetkiler tanımlayarak veri güvenliğini sağlayın, sadece gerekli bilgilere erişim izni vererek daha kontrollü bir çalışma ortamı oluşturun. Tarasat ile iş birliğini kolaylaştırın, güvenliği elden bırakmadan iş süreçlerinizi yönetin.",
    image: "src/assets/ente.jpg",
    buttonText: "Yetkilendirme Detayları",
    buttonIcon: "admin_panel_settings",
    category: "Entegrasyon"
  },
  {
    id: 4,
    name: "Stoklarınıza Hakim Olun",
    type: "Finans",
    integration: "Cari ve Stok modülleri",
    usage: "Satış sonrası",
    description: "Stoklarınızı anlık olarak izleyin, eksik veya fazla stok riskini ortadan kaldırın. Barkod ile ürün tanımlayın, giriş-çıkış işlemlerini kolayca yönetin. Stok geçmişini görüntüleyin, kritik stok seviyelerini belirleyerek sistemin sizi otomatik bilgilendirmesini sağlayın. Stok devir hızı, en çok satılan ürünler, kategori bazlı stok analizi gibi detaylı raporlarla ürün yönetiminizde fark yaratın.",
    image: "src/assets/stok.jpg",
    buttonText: "Fatura Kes",
    buttonIcon: "receipt",
    category: "Stok"
  },
  {
    id: 5,
    name: "Cari ve Alacak Verecek Takibi",
    type: "Finans",
    integration: "Cari ve Stok modülleri",
    usage: "Satış sonrası",
    description: "Tüm müşteri ve tedarikçi bilgilerinizi tek noktadan yönetin. Tarasat'ın Cari modülü sayesinde borç-alacak takibini zahmetsizce gerçekleştirin. Her cari hesap için ödeme geçmişini, bakiye durumunu ve iletişim bilgilerini detaylı olarak görüntüleyin. Otomatik hatırlatmalar, ödeme vadeleri ve cari analiz raporları ile finansal süreçlerinizde kontrol sizde olsun.",
    image: "src/assets/alacak.webp",
    buttonText: "Fatura Kes",
    buttonIcon: "receipt",
    category: "Cari"
  }
];

const filteredFeatures = computed(() => {
  if (activeCategory.value === "Tümü") {
    return features;
  }
  return features.filter(feature => feature.category === activeCategory.value);
});

function featureAction(feature) {
  console.log(`${feature.name} aksiyonu tetiklendi`);
}

function filterFeatures(category) {
  activeCategory.value = category;
}

// Otomatik geçiş için interval
let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    const currentIndex = categories.indexOf(activeCategory.value);
    const nextIndex = (currentIndex + 1) % categories.length;
    activeCategory.value = categories[nextIndex];
  }, 15000); // 15 saniye
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId); // Komponent yok edildiğinde interval'i temizle
});
</script>

<style scoped>
.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 0; /* Alt padding sıfırlandı */
  font-family: 'Inter', sans-serif;
}

.pricing-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.billing-toggle {
  margin: 0 auto;
  max-width: 300px;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 0; /* Alt margin sıfırlandı */
}

.pricing-card {
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: white;
  border: 1px solid #e2e8f0;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.pricing-card.basic {
  border-top: 4px solid #667eea;
}

.pricing-card.professional {
  border-top: 4px solid #f5576c;
}

.pricing-card.enterprise {
  border-top: 4px solid #764ba2;
}

.plan-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #4f46e5;
  color: white;
  padding: 0.25rem 1rem;
  border-bottom-left-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.card-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.plan-description {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.price {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
}

.period {
  font-size: 1rem;
  color: #64748b;
  margin-left: 0.5rem;
  align-self: flex-end;
  margin-bottom: 0.5rem;
}

.savings {
  color: #10b981;
  font-size: 0.85rem;
  font-weight: 600;
}

.features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.features li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  color: #334155;
}

.features li.highlighted {
  color: #4f46e5;
  font-weight: 600;
}

.feature-icon {
  margin-right: 0.75rem;
  color: #4f46e5;
  font-size: 1.1rem;
}

.features li.highlighted .feature-icon {
  color: #f59e0b;
}

.cta-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.yorumcontainer {
  margin: 0 auto;
  padding: 20px;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
}

.yorumcontaineryazi {
  width: 100%;
  margin-top: 3%;
}

.yorumyazi {
  max-width: 800px;
  margin: 0 auto 40px auto;
}

.referanslar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.referans {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(94, 75, 123, 0.1);
  width: 300px;
  transition: transform 0.3s ease;
  margin-bottom: 20px; /* Mobil için ek margin */
}

.referans:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(94, 75, 123, 0.15);
}

.cosyorum {
  line-height: 1.6;
}

.cosname {
  font-weight: 500;
}



/* Kategori Butonları */
.category-btn {
  padding: 12px 20px;
  text-transform: capitalize;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: #5e4b7b !important;
  color: white !important;
  font-size: 0.9rem;
}

.category-btn:hover {
  background-color: white !important;
  color: #5e4b7b !important;
}

.active-category {
  background-color: #7a6799 !important;
  color: white !important;
  border-color: #7a6799 !important;
}

/* Özellik Kartları */
.feature-card {
  max-width: 1000px;
  margin: 0 auto 40px auto;
}

.feature-image {
  max-height: 350px;
  object-fit: contain;
  max-width: 100%; /* Görsellerin taşmasını önler */
}

.my-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(94, 75, 123, 0.1);
  transition: transform 0.3s ease;
}

/* Responsive Ayarlamalar */
@media (max-width: 768px) {
  .pricing-cards {
    grid-template-columns: 1fr;
  }
  
  .gradient-text {
    font-size: 2rem;
  }
  
  .yorumcontaineryazi {
    width: 90%;
    margin-left: 5%;
  }

  .referans {
    width: 100%;
    margin-bottom: 20px;
  }

  .yorumcontainer h1 {
    font-size: 1.8em;
  }

  .yorumyazi {
    font-size: 1em;
  }

  .feature-image {
    max-height: 250px;
  }
  
  .feature-card {
    margin-bottom: 30px;
  }
  
  .category-btn {
    padding: 8px 12px;
    font-size: 0.75rem;
    margin: 4px;
  }

 
}

@media (max-width: 600px) {


  .category-btn {
    padding: 6px 10px;
    font-size: 0.7rem;
  }
}
</style>