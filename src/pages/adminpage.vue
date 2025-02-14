<template>
  <div class="arkaplanrenk">
    <q-page class="column items-center">
      <div class="todo-container">
        <h4 class="custom-h4">Yapılacaklar Listesi</h4>
        <!-- Yeni Yapılacak Ekle -->
        <q-input
          v-model="newTodoContent"
          outlined
          placeholder="Yeni yapılacak ekle"
          class="q-mb-md"
        >
          <template #append>
            <q-btn @click="addTodo" label="Ekle" color="primary" />
          </template>
        </q-input>

        <!-- Yapılacaklar Listesi -->
        <q-list bordered>
          <q-item v-for="todo in todos" :key="todo.id" class="q-my-sm">
            <q-item-section>
              <q-input
                v-model="todo.content"
                outlined
                dense
                @blur="updateTodo(todo.id, todo.content)"
              />
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="delete"
                color="negative"
                flat
                round
                dense
                @click="deleteTodo(todo.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from 'components/models';


// Yapılacaklar tipi
const todos = ref<Todo[]>([
  { id: 1, content: 'Liste Hazırla' },
]);

// Yeni yapılacak için model
const newTodoContent = ref<string>('');

// Yapılacak Ekleme Fonksiyonu
function addTodo() {
  if (!newTodoContent.value.trim()) {
    return;
  }

  const newTodo = {
    id: Date.now(),
    content: newTodoContent.value,
  };

  todos.value.push(newTodo);
  newTodoContent.value = ''; // Girdi alanını temizle
}

// Yapılacak Silme Fonksiyonu
function deleteTodo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

// Yapılacak Güncelleme Fonksiyonu
function updateTodo(id: number, content: string) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.content = content;
  }
}
</script>

<style scoped>
/* Genel arka plan */
.arkaplanrenk {
  background-color: #f8f4f4; /* Soft pastel pembe ton */
  min-height: 100vh;
  padding: 2rem 0;
}

/* Konteyner */
.todo-container {
  max-width: 750px;
  width: 100%;
  margin-top: 2rem;
  text-align: center;
  padding: 2rem;
  background-color: #ffffff; /* Beyaz kart tasarımı */
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Hafif gölge */
}

/* Başlık stili */
.custom-h4 {
  font-size: 2rem;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(90deg, #000000, #000000); /* Soft kırmızı tonlar */
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
}

/* Form ve liste boşlukları */
.q-mb-md {
  margin-bottom: 1rem;
}

.q-my-sm {
  margin: 0.5rem 0;
}
</style>
