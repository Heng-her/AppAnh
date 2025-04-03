<template>
    <p>User: {{ userStore.username }}</p>
    <p>Password: {{ userStore.password }}</p>
    <showdrawer />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import showdrawer from '~/component/showdrawer.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// Watch for real-time changes and log them
watch(
    () => [userStore.username, userStore.password], 
    ([newUsername, newPassword]) => {
        console.log("Username changed:", newUsername);
        console.log("Password changed:", newPassword);
    }
);
</script>
