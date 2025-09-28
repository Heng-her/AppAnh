<script setup lang="ts">
import { ref } from "vue";

const url = ref("https://www.tiktok.com/@nevaaadaa");
const folder = ref<string | null>(null);
const log = ref("");

async function chooseFolder() {
  folder.value = await window.electronAPI.selectFolder();
}

async function download() {
  if (!folder.value) {
    alert("Please select folder first");
    return;
  }
  log.value = "Downloading...";
  try {
    const result = await window.electronAPI.downloadTikTokProfile(url.value, folder.value);
    log.value = result.log;
  } catch (err: any) {
    log.value = err.log || err.message;
  }
}
</script>

<template>
  <div class="p-4 space-y-4">
    <input v-model="url" type="text" class="border p-2 w-full" />
    <button @click="chooseFolder" class="px-4 py-2 bg-blue-500 text-white rounded">
      Select Folder
    </button>
    <button @click="download" class="px-4 py-2 bg-green-500 text-white rounded">
      Download
    </button>
    <pre class="bg-gray-100 p-2 text-xs whitespace-pre-wrap">{{ log }}</pre>
  </div>
</template>
