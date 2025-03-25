<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const authUser = useAuthUser();
</script>

<template>
  <div>
    <h1>User Page</h1>
    <p>ID: {{ authUser?.id }}</p>
    <p>Role: {{ authUser?.role }}</p>
  </div>
</template>
