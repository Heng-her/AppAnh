<script setup lang="ts">
import { ref } from "vue";

interface User {
  email: string;
  password: string;
}

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const users = ref<User[]>([]);

// Fetch users from JSON
const fetchUsers = async () => {
  try {
    const response = await fetch("/json/users.json");
    users.value = await response.json();
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// Verify login
const verifyLogin = () => {
  const user = users.value.find(
    (u) => u.email === email.value && u.password === password.value
  );

  if (user) {
    // Successful login
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "/"; // Redirect to dashboard or home page
  } else {
    errorMessage.value = "Invalid credentials, please try again.";
  }
};

// Call fetchUsers on mounted
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="verifyLogin" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />

      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

      <button type="submit" class="btn">Login</button>
    </form>

    <p class="mt-4">
      Don't have an account? <a href="/register" class="text-blue-500">Register here</a>
    </p>
  </div>
</template>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
