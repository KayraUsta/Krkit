<template>
  <div class="todo-wrapper">
    <transition name="fade-slide">
      <div class="todo-card">
        <h2 class="todo-title">📝 Yapılacaklar Listesi</h2>

        <!-- Yeni Görev Ekle -->
        <form @submit.prevent="addTask" class="todo-form">
          <q-input
            v-model="newTask.title"
            outlined
            dense
            label="Görev Başlığı"
            class="todo-input"
            color="pink-6"
          />
          <q-input
            v-model="newTask.description"
            outlined
            dense
            label="Görev Açıklaması"
            class="todo-input"
            color="pink-6"
          />
          <q-btn
            type="submit"
            label="Görev Ekle"
            unelevated
            class="todo-button"
            color="pink-6"
            no-caps
          />
        </form>

        <!-- Görev Listesi -->
        <div v-if="tasks.length" class="todo-tasks">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="todo-task"
          >
            <div class="task-left">
              <q-checkbox
                v-model="task.isCompleted"
                @change="updateTaskStatus(task)"
                color="pink-6"
              />
              <div class="task-info">
                <div :class="['task-title', { completed: task.isCompleted }]">
                  {{ task.title }}
                </div>
                <div v-if="task.description" class="task-desc">
                  {{ task.description }}
                </div>
              </div>
            </div>
            <div class="task-actions">
              <q-btn icon="edit" flat dense color="orange" @click="editTask(task)" />
              <q-btn icon="delete" flat dense color="red" @click="deleteTask(task.id)" />
            </div>
          </div>
        </div>

        <div v-else class="no-tasks">
          Henüz görev eklenmedi.
        </div>
      </div>
    </transition>

    <!-- Düzenleme Modali -->
    <div v-if="editingTask" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Görevi Düzenle</h3>
        <q-input v-model="editingTask.title" class="modal-input" label="Başlık" outlined dense />
        <q-btn @click="updateTask" class="modal-btn save-btn" label="Kaydet" />
        <q-btn @click="cancelEdit" class="modal-btn cancel-btn" label="İptal" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { toDoList } from 'src/composables/toDoList'; // API fonksiyonlarını içe aktar
const $q = useQuasar();

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

const addTask = async () => {
  if (!newTask.value.title) {
    $q.notify({
      type: 'negative',
      message: 'Görev başlığı boş bırakılamaz'
    });
    return;
  }

  if (!newTask.value.description) {
    $q.notify({
      type: 'negative',
      message: 'Görev açıklaması boş bırakılamaz'
    });
    return;
  }

  try {
    const result = await addToDo(newTask.value);
    if (result.ok === "Success") {
      tasks.value.push({
        ...newTask.value,
        id: result.id,
        createdAt: new Date().toLocaleString(),
        isCompleted: false,
      });
      newTask.value = { title: '', description: '' }; // Formu sıfırla
      loadTasks();
    }
  } catch (error) {
    console.error('Error adding task:', error);
    $q.notify({
      type: 'negative',
      message: 'Görev eklenirken bir hata oluştu'
    });
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.todo-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #fce4ec, #e0f7fa);
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

.todo-card {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.todo-title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 1.5rem;
}

.todo-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  width: 100%;
}

.todo-button {
  width: 100%;
  padding: 12px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(236, 64, 122, 0.3);
  transition: 0.3s ease;
}

.todo-button:hover {
  background-color: #ec407a !important;
  transform: scale(1.02);
}

.todo-tasks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.todo-task {
  background: #fafafa;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.task-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.task-info {
  display: flex;
  flex-direction: column;
}

.task-title {
  font-weight: 500;
  color: #333;
}

.task-title.completed {
  text-decoration: line-through;
  color: #999;
}

.task-desc {
  font-size: 0.85rem;
  color: #777;
  margin-top: 4px;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.no-tasks {
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.modal-input {
  margin-bottom: 1rem;
}

.modal-btn {
  width: 48%;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-right: 4%;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.cancel-btn {
  background-color: #bdc3c7;
  color: white;
}
</style>
