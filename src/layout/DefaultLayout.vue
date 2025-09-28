<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import "../assets/nav_bar_downlaod.css";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="">
      <nav class="download flex gap-4">
        <RouterLink class="Home" to="/">Home</RouterLink>
        <RouterLink class="youtube" to="/youtube">YouTube</RouterLink>
        <RouterLink class="tiktok" to="/tiktok">TikTok</RouterLink>
        <RouterLink class="ig" to="/instagram">Instagram</RouterLink>
        <RouterLink class="facebook" to="/facebook">Facebook</RouterLink>
        <RouterLink class="threads" to="/threads">Threads</RouterLink>
      </nav>
    </header>

    <!-- Main Page Content -->
    <main class="flex-1 bg-gray-50">
      <RouterView />
    </main>

    <!-- Footer (optional) -->
    <footer class="bg-gray-800 text-gray-200 text-center py-3">
      © {{ new Date().getFullYear() }} My Electron App
    </footer>
  </div>
</template>
