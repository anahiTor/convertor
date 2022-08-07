import { createRouter, createWebHistory } from "vue-router";
import Preview from "@/views/Preview.vue";

const routes = [
  {
    path: "/preview",
    name: "Preview",
    component: Preview,
  },
  {
    path: "/convertor",
    name: "Convertor",
    component: () => import("@/views/Convertor.vue"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const routeToGo = routes.find((route) => route.path === to.path);
  return routeToGo ? next() : next("/preview");
});

export default router;
