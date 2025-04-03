<template>
  <Splitter style="height: 100vh" class="flex flex-row">
    <SplitterPanel
      style="height: 100vh; width: 450px;"
      :minSize="23"
      v-if="is_pc"
    >
      <profile class="h-full overflow-y-auto scrollbar-hide"/>
    </SplitterPanel>
    <SplitterPanel class="h-full w-full" :size="75" :minSize="30">
      <main style="height: 100vh;" class="h-full scrollbar-hide overflow-y-auto">
        <Header/>
        <slot />
        <Footer_mobile v-if="is_mobile" />
      </main>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import Footer_mobile from "~/layouts/footer_mobile.vue";
import profile from "~/layouts/profile.vue";
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
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar{
  display: none; /* Chrome, Safari, Opera */
  overflow: hidden;
}
</style>