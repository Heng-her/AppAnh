<script setup lang="ts">
import new_post from "~/pages/profile_fuction/new_post.vue";
import isshort from "~/pages/profile_fuction/short.vue";
import favorite from "~/pages/profile_fuction/favorite.vue";
import user_info from "~/pages/profile_fuction/user_info.vue";
import { ref } from "vue";
const newpost = ref<boolean>(true);
const is_short = ref<boolean>(false);
const isfavorite = ref<boolean>(false);
const userinfo = ref<boolean>(false);
const activeView = ref<'new_post' | 'short' | 'favorite' | 'user_info'>('new_post');

const tagglet_view = (view: 'new_post' | 'short' | 'favorite' | 'user_info') => {
  newpost.value = view === "new_post";
  is_short.value = view === "short";
  isfavorite.value = view === "favorite";
  userinfo.value = view === "user_info";
  activeView.value = view;
};
</script>
<template>
  <nav>
    <ul
      class="flex justify-center items-center pl-4 pr-4 w-full text-lg font-semibold gap-x-4 gap-y-2 flex-wrap mt-4 border-b-2 border-gray-300"
    >
      <button @click="tagglet_view('new_post')" :class="{'text-blue-600' : activeView === 'new_post'}">
        New Post
      </button>
      <button @click="tagglet_view('short')" :class="{'text-blue-600' : activeView === 'short'}">Short</button>
      <button @click="tagglet_view('favorite')" :class="{'text-blue-600' : activeView === 'favorite'}">Favorite</button>
      <button @click="tagglet_view('user_info')" :class="{'text-blue-600' : activeView === 'user_info'}">User Info</button>
    </ul>
  </nav>
  <main>
    <new_post v-if="newpost" />
    <isshort v-if="is_short" />
    <favorite v-if="isfavorite" />
    <user_info v-if="userinfo" />
  </main>
</template>
