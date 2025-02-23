<template>
  <div class="todo-container">
    <h1 class="title">Yapılacaklar Listesi</h1>

    <!-- Add New To-Do -->
    <div class="form-container">
      <input v-model="newTask.title" class="input" placeholder="Görev başlığı" />
      <textarea v-model="newTask.description" class="textarea" placeholder="Görev açıklaması"></textarea>
      <button @click="addTask" class="btn-add">Ekle</button>
    </div>


    <!-- Task List -->
    <ul v-if="tasks.length > 0" class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-card">
        <div class="task-info">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
          <p class="task-meta">Oluşturulma tarihi: {{ task.createdAt }}</p>
          <p class="task-status">Durum: {{ task.isCompleted ? 'Tamamlandı' : 'Tamamlanmadı' }}</p>
        </div>

        <div class="task-actions">
          <!-- Edit Button -->
          <button @click="editTask(task)" class="btn-edit">Düzenle</button>
          <!-- Delete Button -->
          <button @click="deleteTask(task.id)" class="btn-delete">Sil</button>
        </div>
      </li>
    </ul>

    <p v-else>Görev Bulunamadı</p>

    <!-- Update Task Form -->
    <div v-if="editingTask" class="edit-task">
      <h3>Görevi Değiştir</h3>
      <input v-model="editingTask.title" class="input" placeholder="Görev başlığını değiştir" />
      <textarea v-model="editingTask.description" class="textarea" placeholder="Görev açıklamasını değiştir"></textarea>
      <button @click="updateTask" class="btn-update">Değişiklikleri Kaydet</button>
      <button @click="cancelEdit" class="btn-cancel">İptal Et</button>
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
const newTask = ref({
});
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
/* Yükleniyor göstergesi */
.loader {
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  padding: 20px;
}

.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input, .textarea {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

.input:focus, .textarea:focus {
  border-color: #5beb63;
}

.textarea {
  height: 100px;
}

.btn-add, .btn-edit, .btn-delete, .btn-update, .btn-cancel {
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add {
  background-color: #5beb63;
  color: white;
}

.btn-add:hover {
  background-color: #4db14a;
}

.btn-edit {
  background-color: #ffc107;
  color: white;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-update {
  background-color: #007bff;
  color: white;
}

.btn-update:hover {
  background-color: #0069d9;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.task-card:hover {
  transform: scale(1.02);
}

.task-info {
  margin-bottom: 15px;
}

.task-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.task-description {
  font-size: 1rem;
  color: #555;
}

.task-meta, .task-status {
  font-size: 0.875rem;
  color: #777;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.edit-task {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
