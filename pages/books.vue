<script setup lang="ts">
import { ref, onMounted } from 'vue';
interface Book {
  id: number;
  title: string;
  author: string;
  content: string;
}
const books = ref<Book[]>([]);

const fetchBooks = async () => {
  books.value = await $fetch('/api/books/list');
};

onMounted(fetchBooks);
</script>

<template>
  <div>
    <h2>Books</h2>
    <div v-for="book in books" :key="book.id">
      <p>{{ book.title }} by {{ book.author }}</p>
      <a :href="book.content" target="_blank">Read</a>
    </div>
  </div>
</template>
