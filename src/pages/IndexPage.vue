<template>
  <div>
    <h1>To-Do List</h1>

    <!-- Add New To-Do -->
    <div>
      <input v-model="newTask.title" placeholder="Task title" />
      <textarea v-model="newTask.description" placeholder="Task description"></textarea>
      <button @click="addTask">Add Task</button>

    </div>

    <!-- Task List -->
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <div>
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>Created at: {{ task.createdAt }}</p>
          <p>Status: {{ task.isCompleted ? 'Completed' : 'Not completed' }}</p>
        </div>

        <!-- Edit Button -->
        <button @click="editTask(task)">Edit</button>

        <!-- Delete Button -->
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>

    <!-- Update Task Form -->
    <div v-if="editingTask" class="edit-task">
      <h3>Edit Task</h3>
      <input v-model="editingTask.title" placeholder="Edit task title" />
      <textarea v-model="editingTask.description" placeholder="Edit task description"></textarea>
      <button @click="updateTask">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </div>

    <p v-else>No tasks found.</p>
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
const deletingTask = ref(null);

// Veriyi yüklemek için kullanacağımız fonksiyon
const loadTasks = async () => {
  try {
    const result = await getAllToDo(); // API'den tüm görevleri al

console.log("easdasdas",result)
console.log("denesucce",result.data)


    if (result.status === 200 && Array.isArray(result.data)) {
      tasks.value = result.data; // Veriyi başarıyla aldık, tasks dizisine ata
    } else {
      console.error('Failed to load tasks:', result.errors || result.ok);
    }
  } catch (error) {
    console.error('Failed to load tasks:', error);
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
          id:result.id, // Geçici bir ID ekleyelim, API ID dönecek
          createdAt: new Date().toLocaleString(),
          isCompleted: false,
        });
        newTask.value = { title: '', description: '' }; // Formu sıfırla

loadTasks(); // Yeni görev eklendi, tüm görevleri tekrar yükle
      } else {
        console.error('Failed to add task:', result.errors || result.ok);
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  } else {
    console.error('Both title and description are required.');
  }
};

// Görev silme fonksiyonu
const deleteTask = async (task) => {
  try {
    const result = await deleteToDo( {id:task} ); // API'den silme isteği gönder

    console.log("2",result)
    if (result.ok === "Success") {
      tasks.value = tasks.value.filter(t => t.id !== task); // Silinen görev listeden çıkar
    } else {
      console.error('Failed to delete task:', result.errors || result.ok);
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
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
    } else {
      console.error('Failed to update task:', result.errors || result.ok);
    }
  } catch (error) {
    console.error('Failed to update task:', error);
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
/* Stil ekleyebilirsiniz */
.edit-task {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
