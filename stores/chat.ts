import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
    const messages = ref<{ sender: string; text: string }[]>([])

    const sendMessage = (sender: string, text: string) => {
        messages.value.push({ sender, text });
    };

    return { messages, sendMessage };
});
