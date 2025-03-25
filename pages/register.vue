<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  id: string;
  username: string;
  email: string;
}

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = async () => {
  const res = await $fetch<{ success: boolean; user?: User; message?: string }>('/api/users/register', {
    method: 'POST',
    body: { username: username.value, email: email.value, password: password.value }
  });

  if (!res.success) {
    errorMessage.value = res.message || 'An unknown error occurred';
    console.log(errorMessage.value);
    router.push('/');
    return;
  } else if (res.user) {
    router.push(`/user/${res.user.id}`); // Redirect to user profile
  }
};
</script>

<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>