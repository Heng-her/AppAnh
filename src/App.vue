<script setup lang="ts">
import { useRoute } from 'vue-router'
import LayoutDefault from './layout/LayoutDefault.vue'
import LayoutAuth from './layout/LayoutAuth.vue'
import { computed } from 'vue'

const route = useRoute()

const layoutComponent = computed(() => {
  // Define the routes that should use the auth layout
  const authRoutes = ['login', 'register']
  return authRoutes.includes(route.name as string) ? LayoutAuth : LayoutDefault
})
</script>

<template>
  <component :is="layoutComponent" />
</template>
