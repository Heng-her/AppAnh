<script setup lang="ts">
import { ref } from 'vue';
import { useCookie, useState } from '#app';  // Use the correct `useCookie` and `useState` from '#app'
import { useAuthUser } from '~/composables/useAuthUser';
import { navigateTo } from '#app';  // Import navigateTo

const authUser = useAuthUser();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

interface User {
  id: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
}

const users: User[] = [
  { id: '123', username: 'user1', password: 'pass123', role: 'user' },
  { id: '1', username: 'admin1', password: 'adminpass', role: 'admin' }
];

function login() {
  const user = users.find(u => u.username === username.value && u.password === password.value);

  if (user) {
    authUser.value = { id: user.id, role: user.role };
    
    // Set the cookie with expiration of 1 day
    const cookie = useCookie('authUser');
    cookie.value = JSON.stringify({ id: user.id, role: user.role });

    console.log('User logged in:', user);  // Log the user object for debugging

    // Redirect after successful login
    navigateTo(user.role === 'admin' ? `/admin/${user.id}` : `/user/${user.id}`);
  } else {
    errorMessage.value = 'Invalid username or password';
  }
}
</script>

<template>
  <div>
    <input v-model="username" placeholder="Username" class="border p-2" />
    <input v-model="password" type="password" placeholder="Password" class="border p-2" />
    <button @click="login" class="bg-blue-500 text-white p-2">Login</button>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>
