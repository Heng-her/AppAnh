<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: { id: string };
}

const login = async () => {
  const res: LoginResponse = await $fetch('/api/users/login', {
    method: 'POST',
    body: { email: email.value, password: password.value }
  });

  if (!res.success) {
    errorMessage.value = res.message || '';
  } else {
    if (res.user) {
      router.push(`/user/${res.user.id}`); // Redirect to user profile
    }
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
