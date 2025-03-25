<template>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Drawer" position="right">
            <form @submit.prevent="submitForm">
                <div class="field">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="userStore.username" class="border border-white"/>
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="userStore.password" class="border border-white" />
                </div>
                <div class="field">
                    <button type="submit" class="border border-white bg-blue-500 hover:bg-blue-600 text-white">Submit</button>
                </div>
            </form>
        </Drawer>
        <Button icon="pi pi-arrow-right" @click="visible = true" class="p-button-rounded bg-blue-500 hover:bg-blue-600"/>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/user'

const visible = ref(false);
const userStore = useUserStore();

const submitForm = () => {
    console.log("Username:", userStore.username);
    console.log("Password:", userStore.password);
};
</script>
