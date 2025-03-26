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
const errorMessage = ref<string>(""); // To store error messages
const avatarFile = ref<File | null>(null); // To store the selected avatar file

// Fetch users
const fetchUsers = async () => {
  try {
    const response = await fetch("/json/users.json");
    users.value = await response.json();
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// Handle avatar file selection
const handleAvatarFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    avatarFile.value = target.files[0]; // Store the selected file
  }
};

// Upload avatar image
const uploadAvatar = async (): Promise<string | null> => {
  if (!avatarFile.value) return null;

  const formData = new FormData();
  const uuid = uuidv4();
  formData.append("file", avatarFile.value);
  formData.append("filename", uuid);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return uuid; // Return the UUID of the uploaded image
    } else {
      console.error("Failed to upload image");
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

// Delete uploaded image if registration fails
const deleteAvatar = async (uuid: string) => {
  try {
    await fetch(`/api/delete-avatar/${uuid}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

// Check if username or email already exists
const isUserExists = (name: string, email: string): boolean => {
  return users.value.some(
    (user) => user.name === name || user.email === email
  );
};

// Register user
const registerUser = async () => {
  if (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.password ||
    !newUser.value.age ||
    !newUser.value.phone
  ) {
    errorMessage.value = "Please complete all required fields.";
    return;
  }

  // Check if username or email already exists
  if (isUserExists(newUser.value.name, newUser.value.email)) {
    errorMessage.value = "Username or email already exists. Please choose a different username or email.";
    return;
  }

  // Clear any previous error messages
  errorMessage.value = "";

  // Upload avatar image (if selected)
  let avatarUUID: string | null = null;
  if (avatarFile.value) {
    avatarUUID = await uploadAvatar();
    if (!avatarUUID) {
      errorMessage.value = "Failed to upload avatar image.";
      return;
    }
  }

  // Assign a new ID to the user
  newUser.value.id = users.value.length ? users.value[users.value.length - 1].id + 1 : 1;
  newUser.value.avatar = avatarUUID || ""; // Set the avatar UUID (or empty string if no avatar)

  // Add the new user to the list
  users.value.push({ ...newUser.value });

  try {
    await saveUsers();
    alert("User registered successfully.");
    newUser.value = { id: 0, name: "", email: "", password: "", age: null, phone: "", avatar: "" };
    avatarFile.value = null; // Clear the selected file
  } catch (error) {
    console.error("Error saving user:", error);

    // If registration fails, delete the uploaded image
    if (avatarUUID) {
      await deleteAvatar(avatarUUID);
    }
  }
};

// Delete user
const deleteUser = async (id: number) => {
  const user = users.value.find((user) => user.id === id);
  if (user) {
    // Delete the user's avatar image (if it exists)
    if (user.avatar) {
      await deleteAvatar(user.avatar);
    }

    // Remove the user from the list
    users.value = users.value.filter((user) => user.id !== id);

    try {
      await saveUsers();
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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

    <!-- Error Message -->
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="registerUser" class="space-y-4">
      <input
        v-model="newUser.name"
        type="text"
        placeholder="Name"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model="newUser.email"
        type="email"
        placeholder="Email"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model="newUser.password"
        type="password"
        placeholder="Password"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model="newUser.age"
        type="number"
        placeholder="Age"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model="newUser.phone"
        type="tel"
        placeholder="Phone Number"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <!-- Avatar Upload -->
      <input
        type="file"
        accept="image/*"
        @change="handleAvatarFileSelect"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <img
        v-if="newUser.avatar"
        :src="`/assets/${newUser.avatar}.jpg`"
        alt="Avatar Preview"
        class="w-24 h-24 rounded-full mt-4"
      />

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>

    <h2 class="text-xl font-semibold mt-6">Registered Users</h2>
    <ul class="space-y-4">
      <li
        v-for="user in users"
        :key="user.id"
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
      >
        <span class="text-gray-700">{{ user.id }}</span>
        <img
          v-if="user.avatar"
          :src="`/assets/${user.avatar}.jpg`"
          alt="User Avatar"
          class="w-12 h-12 rounded-full"
        />
        <span class="text-gray-700"
          >{{ user.name }} ({{ user.email }}), Age: {{ user.age }}, Phone: {{ user.phone }}</span
        >
        <button
          @click="deleteUser(user.id)"
          class="bg-red-500 text-white py-1.5 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>