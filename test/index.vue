<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number | null;
  phone: string;
  avatar: string; // Store UUID filename
}

const newUser = ref<User>({
  id: 0,
  name: "",
  email: "",
  password: "",
  age: null,
  phone: "",
  avatar: "",
});

const users = ref<User[]>([]);

// Fetch users
const fetchUsers = async () => {
  try {
    const response = await fetch("/json/users.json");
    users.value = await response.json();
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// Handle avatar upload
const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const formData = new FormData();
    const uuid = uuidv4();
    formData.append("file", file);
    formData.append("filename", uuid);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        newUser.value.avatar = uuid; // Store only UUID
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

// Register user
const registerUser = async () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.password || !newUser.value.age || !newUser.value.phone) {
    alert("Please complete all required fields.");
    return;
  }

  newUser.value.id = users.value.length ? users.value[users.value.length - 1].id + 1 : 1;
  users.value.push({ ...newUser.value });

  try {
    await saveUsers();
    alert("User registered successfully.");
    newUser.value = { id: 0, name: "", email: "", password: "", age: null, phone: "", avatar: "" };
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// Delete user
const deleteUser = async (id: number) => {
  users.value = users.value.filter(user => user.id !== id);

  try {
    await saveUsers();
    alert("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Save users
const saveUsers = async () => {
  await fetch("/api/save-users", {
    method: "POST",
    body: JSON.stringify(users.value),
    headers: { "Content-Type": "application/json" },
  });
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">User Registration</h1>

    <form @submit.prevent="registerUser" class="space-y-4">
      <input v-model="newUser.name" type="text" placeholder="Name" class="input" required />
      <input v-model="newUser.email" type="email" placeholder="Email" class="input" required />
      <input v-model="newUser.password" type="password" placeholder="Password" class="input" required />
      <input v-model="newUser.age" type="number" placeholder="Age" class="input" required />
      <input v-model="newUser.phone" type="tel" placeholder="Phone Number" class="input" required />

      <!-- Avatar Upload -->
      <input type="file" accept="image/*" @change="handleAvatarUpload" class="input" />
      <img v-if="newUser.avatar" :src="`/assets/${newUser.avatar}.jpg`" alt="Avatar Preview" class="avatar-preview" />

      <button type="submit" class="btn">Register</button>
    </form>

    <h2 class="text-xl font-semibold mt-6">Registered Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id" class="user-item">
      <span>{{ user.id }}</span>
        <img v-if="user.avatar" :src="`/assets/${user.avatar}.jpg`" alt="User Avatar" class="user-avatar" />
        <span>{{ user.name }} ({{ user.email }}), Age: {{ user.age }}, Phone: {{ user.phone }}</span>
        <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
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
.delete-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.delete-btn:hover {
  background-color: #cc0000;
}
.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
