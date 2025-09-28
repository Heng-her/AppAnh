// /router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import NotFound from "../view/NotFound.vue";
import YouTube from "../view/YouTube.vue";
import TikTok from "../view/TikTok.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout, // layout wrapper
      children: [
        { path: "", name: "home", component: HomeView },
        { path: "YouTube", name: "YouTube", component: YouTube },
        { path: "TikTok", name: "TikTok", component: TikTok },
        { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
      ],
    },
  ],
});

export default router;
