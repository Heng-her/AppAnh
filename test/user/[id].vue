<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
interface User {
  id: string;
  username: string;
}
const route = useRoute();
const user = ref<User | null>(null);

const fetchUser = async () => {
  const res = await $fetch<{ success: boolean; user?: User; message?: string }>(`/api/users/${route.params.id}`);
  if (res.success && res.user) {
    user.value = res.user;
  }
};

onMounted(fetchUser);
</script>

<template>
  <div v-if="user">
    <h2>Welcome, {{ user.username }}!</h2>
    <p>User ID: {{ user.id }}</p>
  </div>
</template>
