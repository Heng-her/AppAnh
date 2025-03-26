<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
  id: number;
  content: string;
  user_id: number;
}

const posts = ref<Post[]>([]);
const content = ref('');
const errorMessage = ref('');

const fetchPosts = async () => {
  posts.value = await $fetch('/api/posts/list');
};

const createPost = async () => {
  const res: { success: boolean; message: string } = await $fetch('/api/posts/create', {
    method: 'POST',
    body: { content: content.value }
  });

  if (!res.success) {
    errorMessage.value = res.message;
  } else {
    content.value = '';
    fetchPosts();
  }
};

onMounted(fetchPosts);
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <input v-model="content" placeholder="What's on your mind?" />
    <button @click="createPost">Post</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div v-for="post in posts" :key="post.id">
      <p>{{ post.content }}</p>
      <small>By User {{ post.user_id }}</small>
    </div>
  </div>
</template>
