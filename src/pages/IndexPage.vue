<template>
  <div class="todo-container">
    <h1 class="title">Yapılacaklar Listesi</h1>

    <!-- Add New To-Do -->
    <div class="add-task-container">
      <q-input v-model="newTask.title" class="task-input" placeholder="Görev başlığını yazın" />
      <q-btn @click="addTask" class="add-task-btn" label="Görev Ekle" />
    </div>

    <!-- Task List -->
    <div v-if="tasks.length > 0" class="tasks-list">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <div class="task-content">
          <q-checkbox v-model="task.isCompleted" @change="updateTaskStatus(task)" class="task-checkbox" />
          <div :class="['task-title', { completed: task.isCompleted }]">{{ task.title }}</div>
        </div>
        <div class="task-actions">
          <q-btn @click="editTask(task)" class="edit-btn" icon="edit" />
          <q-btn @click="deleteTask(task.id)" class="delete-btn" icon="delete" />
        </div>
      </div>
    </div>

    <p v-else class="no-tasks">Görev bulunamadı. Yeni bir görev ekleyin!</p>

    <!-- Edit Task Modal -->
    <div v-if="editingTask" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Görevi Düzenle</h3>
        <q-input v-model="editingTask.title" class="modal-input" placeholder="Başlık" />
        <div class="modal-actions">
          <q-btn @click="updateTask" class="modal-btn save-btn" label="Kaydet" />
          <q-btn @click="cancelEdit" class="modal-btn cancel-btn" label="İptal" />
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
const newTask = ref({ title: '' });
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
  if (newTask.value.title) { // Artık sadece title kontrol ediliyor
    try {
      const result = await addToDo(newTask.value); // Yeni görevi ekle
      if (result.ok === "Success") {
        tasks.value.push({
          ...newTask.value,
          id: result.id, // Geçici bir ID ekleyelim, API ID dönecek
          createdAt: new Date().toLocaleString(),
          isCompleted: false,
        });
        newTask.value = { title: '' }; // Formu sıfırla
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

// Görev durumunu güncelleme
const updateTaskStatus = async (task) => {
  try {
    const result = await updateToDo({ ...task, isCompleted: task.isCompleted });
    if (result.ok !== "Success") {
      task.isCompleted = !task.isCompleted; // Durum başarısızsa geri al
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    task.isCompleted = !task.isCompleted; // Durum başarısızsa geri al
  }
};

// Sayfa yüklendiğinde görevleri al
onMounted(loadTasks);
</script>

<style scoped>
/* Genel Tasarım */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Yatay kaymayı engellemek için eklendi */
}

/* Container */
.todo-container {
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box; /* İçeriğin taşmaması için box-sizing eklendi */
}

/* Başlık */
.title {
  font-size: 28px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  word-wrap: break-word; /* Uzun başlıkların taşmasını engellemek için eklendi */
}

/* Yeni Görev Ekleme Alanı */
.add-task-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Mobilde öğelerin alt satıra geçmesini sağlamak için eklendi */
}

.task-input {
  flex-grow: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
  min-width: 200px; /* Genişliği sınırlamak için eklendi */
}

.add-task-btn {
  background-color: #6c5ce7;
  color: white;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 120px; /* Buton boyutunu dengelemek için eklendi */
}

.add-task-btn:hover {
  background-color: #5e4bd3;
}

/* Görevler Listesi */
.tasks-list {
  margin-top: 20px;
}

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.task-content {
  display: flex;
  align-items: center;
}

.task-checkbox {
  margin-right: 15px;
}

.task-title {
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.task-title.completed {
  color: #7d7d7d;
  text-decoration: line-through;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.edit-btn {
  color: #f39c12;
}

.delete-btn {
  color: #e74c3c;
}

.edit-btn:hover {
  color: #d35400;
}

.delete-btn:hover {
  color: #c0392b;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
}

.modal-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.modal-input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.modal-btn {
  width: 48%;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.cancel-btn {
  background-color: #bdc3c7;
  color: white;
}

.modal-btn:hover {
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
 

  .task-input {
    font-size: 14px;
  }

  .add-task-btn {
    font-size: 14px;
    padding: 8px 14px;
    min-width: 90px; /* Buton boyutunu küçültmek için */
  }

  .task-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-actions {
    margin-top: 10px;
    gap: 5px;
  }

  .task-title {
    font-size: 14px;
  }

  .modal-btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  /* Görevler Listesini Aşağıya Al */
  .tasks-list {
    margin-top: 40px;
  }

  .add-task-container {
    flex-direction: column;
    align-items: stretch;
  }

  /* Yatay Kaymayı Engellemek İçin */
  body, .todo-container {
    overflow-x: hidden;
  }
}


</style>
