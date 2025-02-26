<template>
  <div class="todo-container">
    <h1 class="title">Yapılacaklar Listesi</h1>

    <!-- Add New To-Do (Minimalist Design) -->
    <div class="form-container">
      <input v-model="newTask.title" class="input minimal-input" placeholder="Görev başlığı" />
      <textarea v-model="newTask.description" class="textarea minimal-textarea" placeholder="Görev açıklaması"></textarea>
      <button @click="addTask" class="btn-add minimal-btn btn-blue">Ekle</button>
    </div>

    <!-- Task List (Minimalist Card Design) -->
    <ul v-if="tasks.length > 0" class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-card minimal-card">
        <div class="task-info">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
        </div>

        <div class="task-actions">
          <button @click="editTask(task)" class="btn-edit minimal-btn btn-yellow">Düzenle</button>
          <button @click="deleteTask(task.id)" class="btn-delete minimal-btn btn-red">Sil</button>
        </div>
      </li>
    </ul>

    <p v-else>Görev Bulunamadı</p>

    <!-- Update Task Modal (Modern Pop-up Design) -->
    <div v-if="editingTask" class="edit-task-modal">
      <div class="modal-content">
        <h3>Görevi Düzenle</h3>
        <input v-model="editingTask.title" class="input modal-input" placeholder="Başlık" />
        <textarea v-model="editingTask.description" class="textarea modal-textarea" placeholder="Açıklama"></textarea>
        <div class="modal-actions">
          <button @click="updateTask" class="btn-update modal-btn btn-green">Kaydet</button>
          <button @click="cancelEdit" class="btn-cancel modal-btn btn-gray">İptal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toDoList } from 'src/composables/toDoList'; // API fonksiyonlarını içe aktar

const {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
} = toDoList()

// Reaktif veri tanımları
const tasks = ref([]);
const newTask = ref({});
const editingTask = ref(null);
const isLoading = ref(false);

// Veriyi yüklemek için kullanacağımız fonksiyon
const loadTasks = async () => {
  isLoading.value = true;
  try {
    const result = await getAllToDo(); // API'den tüm görevleri al

    if (result.status === 200 && Array.isArray(result.data)) {
      tasks.value = result.data; // Veriyi başarıyla aldık, tasks dizisine ata
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  } finally {
    isLoading.value = false;
  }
};

// Görev ekleme fonksiyonu
const addTask = async () => {
  if (newTask.value.title && newTask.value.description) {
    try {
      const result = await addToDo(newTask.value); // Yeni görevi ekle
      if (result.ok === "Success") {
        tasks.value.push({
          ...newTask.value,
          id: result.id, // Geçici bir ID ekleyelim, API ID dönecek
          createdAt: new Date().toLocaleString(),
          isCompleted: false,
        });
        newTask.value = { title: '', description: '' }; // Formu sıfırla
        loadTasks(); // Yeni görev eklendi, tüm görevleri tekrar yükle
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
};

// Görev silme fonksiyonu
const deleteTask = async (taskId) => {
  try {
    const result = await deleteToDo({ id: taskId }); // API'den silme isteği gönder
    if (result.ok === "Success") {
      tasks.value = tasks.value.filter(t => t.id !== taskId); // Silinen görev listeden çıkar
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Görev düzenleme fonksiyonu
const editTask = (task) => {
  editingTask.value = { ...task }; // Düzenlenecek görevi al
};

// Güncelleme işlemi
const updateTask = async () => {
  try {
    const result = await updateToDo(editingTask.value); // API'den güncelleme isteği gönder
    if (result.ok === "Success") {
      const index = tasks.value.findIndex(t => t.id === editingTask.value.id);
      tasks.value[index] = { ...editingTask.value }; // Görev listesinde güncellemeyi yap
      editingTask.value = null; // Düzenleme modunu kapat
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Düzenleme iptal işlemi
const cancelEdit = () => {
  editingTask.value = null; // Düzenleme modunu kapat
};

// Sayfa yüklendiğinde görevleri al
onMounted(loadTasks);
</script>

<style scoped>
.title{
  font-size:40px;
}
.task-title{
  font-size:20px;
  font-weight:bold;
}
/* Container */
.todo-container {
  padding: 20px;
  margin: 0 200px; /* Sağ ve soldan boşluk eklendi */
  margin-top:-50px;
}

/* Minimal Tasarım */
.minimal-input, .minimal-textarea, .modal-input, .modal-textarea {
  padding: 8px;
  font-size: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.minimal-input:focus, .minimal-textarea:focus, .modal-input:focus, .modal-textarea:focus {
  border-color: #5beb63;
}

/* Minimal Buton Tasarımı */
.minimal-btn {
  background-color: #5beb63;
  color: white;
  border: none;
  border-radius: 18px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.minimal-btn:hover {
  opacity: 0.85;
}

/* Farklı Buton Renkleri */
.btn-blue {
  background-color: #007bff;
}

.btn-blue:hover {
  background-color: #0056b3;
}

.btn-yellow {
  background-color: #ffc107;
}

.btn-yellow:hover {
  background-color: #e0a800;
}

.btn-red {
  background-color: #dc3545;
  margin-left:15px;
}

.btn-red:hover {
  background-color: #c82333;
}

.btn-green {
  background-color: #28a745;
}

.btn-green:hover {
  background-color: #218838;
  color:white;
}

.btn-gray {
  background-color: #6c757d;
    color:white;
}

.btn-gray:hover {
  background-color: #5a6268;
}

/* Görev Kartı */
.minimal-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
}

/* Modal Pop-up Tasarımı */
.edit-task-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 450px; /* Modal boyutunu büyüttüm */
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-btn {
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
