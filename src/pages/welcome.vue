<template>
    <q-page class="page-container">
      <div class="content-container">
        <!-- Ürün Görseli -->
        <q-img
          src="https://i.hizliresim.com/65l54fg.png"
          class="profile-img"
       
          style="max-width: 650px;"
        />
        
        <!-- Ürün Tanıtım Yazısı -->
        <div class="text-container">
          <h1 class="title">{{ productName || 'TaraSat: Hızlı ve Kolay Barkod Okuma ile Liste Hazırlama' }}</h1>
          <p class="description">{{ productDescription || 'TaraSat, barkod okuma teknolojisini kullanarak ürünlerinizi hızlı ve kolay bir şekilde listelemenize olanak tanır. Kullanıcı dostu arayüzü sayesinde, ürünlerinizi yalnızca barkodlarını tarayarak düzenleyebilirsiniz. TaraSat, özellikle toptan ve perakende işletmeleri ve depolama süreçlerinde verimliliği artırmak için ideal bir çözümdür. Hem zaman kazandırır hem de hata oranını minimuma indirir. Ürünlerinizi barkod okuyarak listeleyin ve işlerinizi hızlandırın!' }}</p>
        </div>
  
        <!-- Barkod Tarama Butonu -->
  
        <!-- İletişim Butonu -->
        <q-btn
          label="İletişime Geç"
          color="white"
          text-color="black"
          class="contact-btn"
          flat
          @click="goToInstagram"
        />
    
      </div>
    </q-page>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  export default {
  methods: {
    goToInstagram() {
      window.location.href = "https://www.instagram.com/krkitbilisim";
    }
  }
}
  </script>
  
  <style scoped>
    .contact-btn {
  background: linear-gradient(135deg, #ffd3d3, #d6d6d6); /* Siyah tonlarında gradyan */
  color: white; /* Metin rengi beyaz */
  border: none; /* Kenarlık kaldırıldı */
  border-radius: 8px; /* Hafif yuvarlatılmış köşeler */
  padding: 12px 24px; /* Daha geniş padding */
  font-size: 1rem;
  font-weight: 600; /* Kalın metin */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Hafif gölge */
  transition: all 0.3s ease; /* Animasyonlar için geçiş */
  margin: 10px 0;
  position: relative;
  overflow: hidden; /* Parlama efekti için */
}

.contact-btn:hover {
  transform: scale(1.05); /* Hover'da hafif büyüme */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5); /* Daha belirgin gölge */
  background: linear-gradient(135deg, #333333, #4a4a4a); /* Hafif renk değişimi */
}

/* Parlama efekti */
.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.contact-btn:hover::before {
  left: 100%; /* Hover'da parlama efekti */
}
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #adefff, #ffd5ea);
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  
  /* Arka plan için geometrik desen efekti */
  .page-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 75%,
      transparent
    );
    background-size: 50px 50px;
    opacity: 0.3;
  }
  
  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
  }

  .title {
    font-size: 2rem;
    color: rgb(50, 50, 50);
    font-weight: bold;

  }
  
  .description {
    font-size: 1rem;
    color: rgb(50, 50, 50);
    max-width: 800px;
    
  }

  </style>