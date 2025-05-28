<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderDesktopView from "./HeaderDesktopView.vue";
import FooterDesktopView from "./FooterDesktopView.vue";
import { useResponsive } from "@/composible/responsive";
const { isDesktop, isMobile } = useResponsive();
</script>
<template>
  <main class="justify-between bg-amber-400">
    <header>
      <HeaderDesktopView />
    </header>
    <RouterView />
    <footer>
      <FooterDesktopView />
    </footer>
  </main>
</template>
