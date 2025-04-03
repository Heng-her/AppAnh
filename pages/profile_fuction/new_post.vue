<script setup lang="ts">
import User_profile from "@/public/user_profile/profile.jpg";
import img_profile from "~/component/img_profile.vue";
</script>
<template>
  <div class="flex flex-col justify-center m-5">
    <header class="flex flex-row justify-between">
      <div class="flex flex-row space-x-1">
        <img_profile :User_profile="User_profile" />
        <h1 class="text-md font-bold text-gray-500 top-0 grid">
          <span>Username</span>
          <span class="text-gray-400 text-xs"
            ><i class="pi pi-globe"></i><i>12:00 AM</i></span
          >
        </h1>
      </div>
      <div class="flex flex-row space-x-5">
        <button><i class="pi pi-ellipsis-h text-xl"></i></button>
        <button><i class="pi pi-times text-xl"></i></button>
      </div>
    </header>
    <content class="flex grid-cols-2 flex-wrap justify-between items-center w-full">
      <div class="flex space-y-2 max-w-sm md:w-full lg:w-full items-center">
        <img :src="User_profile" alt="User Profile">
      </div>
      <div class="flex flex-col bg-blue-500 w-auto">
        <h1>Title</h1>
        <p>Content</p>
      </div>
    </content>
    <footer class="flex flex-row justify-between md:w-4/5 w-full">
      <span><i class="pi pi-thumbs-up-fill mr-2"></i>Like</span>
      <span><i class="pi pi-comment mr-2"></i>Comment</span>
      <span><i class="pi pi-share-alt mr-2"></i>Share</span>
    </footer>
  </div>
</template>
