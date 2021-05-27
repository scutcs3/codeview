import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  var isLogin = localStorage.getItem("token");
  if (!isLogin && to.meta.requiresAuth) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }
  return true;
});
export default router;
