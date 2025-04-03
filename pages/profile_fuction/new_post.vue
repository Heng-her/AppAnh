<script setup lang="ts">
import User_profile from "@/public/user_profile/profile.jpg";
</script>
<template>
  <div class="flex flex-col items-center justify-center m-5">
    <header class="flex flex-row items-center justify-center">
      <img
        :src="User_profile"
        class="w-12 h-12 rounded-full border-4 border-yellow-300"
        alt="profile"
        title="profile"
      />
    </header>
    <content>
      <div class="flex flex-row items-center justify-center m-5">
        <input
          type="text"
          placeholder="What's on your mind?"
          class="w-full max-w-sm h-10 p-3 rounded-2xl focus:outline-none"
        />
        <button
          class="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-500 ease-in-out"
        >
          Post
        </button>
      </div>
    </content>
    <footer>
      <p>&copy; 2022</p>
    </footer>
  </div>
</template>
