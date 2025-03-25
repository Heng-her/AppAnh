<template>
    <div class="chat-box border p-4 w-96 bg-gray-100">
        <div v-for="(msg, index) in messages" :key="index" class="mb-2">
            <strong :class="msg.sender === 'A' ? 'text-blue-500' : 'text-green-500'">
                {{ msg.sender }}:
            </strong>
            {{ msg.text }}
        </div>
        <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..."
            class="border p-2 w-full mt-2" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const { $socket } = useNuxtApp();
const messages = ref<{ sender: string; text: string }[]>([]);
const message = ref("");

onMounted(() => {
    $socket.on("newMessage", (msg) => {
        messages.value.push(msg);
    });
});

const sendMessage = () => {
    if (message.value.trim()) {
        const msg = { sender: "A", text: message.value };
        $socket.emit("sendMessage", msg);
        message.value = "";
    }
};
</script>
