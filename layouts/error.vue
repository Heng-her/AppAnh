<template>
    <div>
      <component :is="errorPage" :error="error" />
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  // Define error property
  defineProps({ error: Object });
  
  const errorPages = {
    404: () => import("~/pages/type_error/404.vue"),
    500: () => import("~/pages/type_error/500.vue"),
    403: () => import("~/pages/type_error/403.vue"),
    default: () => import("~/pages/type_error/default.vue"),
  };
  
  const errorPage = computed(() => errorPages[error.statusCode] || errorPages.default);
  </script>
  