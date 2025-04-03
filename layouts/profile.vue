<script setup lang="ts">
import User_profile from "@/public/user_profile/profile.jpg";
import List_show from "~/layouts/list_show.vue";
</script>
<template>
  <header>
    <main
      class="w-full flex grid-cols-2 flex-wrap p-4 gap-x-8 gap-y-2 justify-center items-center"
    >
      <div class="flex justify-center items-center">
        <img
          :src="User_profile"
          class="w-36 h-36 rounded-full border-4 border-yellow-300"
          alt="profile"
          title="profile"
        />
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold">Username</h1>
        <p
          class="text-gray-500 font-semibold text-center justify-center transition-all w-auto line-clamp-4"
        >
          User Bio Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <span
          class="flex justify-center items-center gap-x-4 gap-y-2 flex-wrap"
        >
          <p class="text-gray-400 text-lg">
            Followers <span class="font-bold text-xl text-gray-500">100</span>
          </p>
          <p class="text-gray-400 text-lg">
            Following <span class="font-bold text-xl text-gray-500">100</span>
          </p></span
        >
      </div>
    </main>
    <content>
      <div
        class="flex justify-center items-center mt-4 w-full gap-x-4 gap-y-2 flex-wrap"
      >
        <button
          class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-500 ease-in-out"
        >
          Add New
        </button>
        <button
          class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-500 ease-in-out"
        >
          Edit Profile
        </button>
      </div>
      <List_show />
    </content>
  </header>
</template>
