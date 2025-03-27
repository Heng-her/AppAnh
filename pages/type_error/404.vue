<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 class="text-6xl font-bold text-red-600">404</h1>
      <p v-if="errorMessage" class="text-xl text-gray-700 mt-2">{{ errorMessage }}</p>
      <p v-if="suggestion" class="text-md text-gray-500 mt-1">{{ suggestion }}</p>
      <NuxtLink to="/" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Go Home
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const errorMessage = ref("");
  const suggestion = ref("");
  
  // Fetch error message from API
  onMounted(async () => {
    try {
      const { statusCode, message, suggestion: apiSuggestion } = await $fetch("/api/error/404");
      if (statusCode === 404) {
        errorMessage.value = message;
        suggestion.value = apiSuggestion;
      }
    } catch (error) {
      errorMessage.value = "An unexpected error occurred.";
    }
  });
  </script>
  