// /router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(), // ✅ use hash mode for Electron
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // add more routes here
  ],
});

export default router;
