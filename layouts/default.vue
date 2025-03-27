<template>
    <div class="flex flex-col min-h-screen">
      <Header />
      <main class="flex-1 container mx-auto p-4">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '~/layouts/header.vue'
  import Footer from '~/layouts/footer.vue'
  </script>
    