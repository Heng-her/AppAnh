<template>
  <Splitter style="height: 100vh" class="flex flex-row">
    <SplitterPanel
      class="flex items-center justify-center"
      :size="25"
      :minSize="10"
      style="height: 100vh;"
    >
      <profile />
    </SplitterPanel>
    <SplitterPanel style="height: 100vh; width: 100%;" :size="75">
      <main style="height: 100vh;">
        <Header_mobile v-if="is_mobile"/>
        <header_tablate v-else-if="is_tablet" />
        <header_pc v-else-if="is_pc" />
        <slot />
        <Footer_mobile v-if="is_mobile" />
      </main>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import Header_mobile from "~/layouts/header_mobile.vue";
import header_pc from "./header_pc.vue";
import Footer_mobile from "~/layouts/footer_mobile.vue";
import profile from "~/composables/profile.vue";
import header_tablate from "./header_tablate.vue";
import { ref, onMounted, onUnmounted } from "vue";

const is_pc = ref(false);
const is_tablet = ref(false);
const is_mobile = ref(false);
const checkMobile = () => {
  is_mobile.value = window.innerWidth < 490;
  is_tablet.value = window.innerWidth >= 490 && window.innerWidth < 1200;
  is_pc.value = window.innerWidth >= 1200;
  if (is_mobile.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>
