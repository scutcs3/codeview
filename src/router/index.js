import { createRouter, createWebHashHistory } from "vue-router";

import IndexPage from "../pages/IndexPage.vue";

let routes = [
  {
    path: "/index",
    name: "index",
    component: IndexPage,
    alias: "/",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/LoginPage.vue"),
  },
  {
    path: "/viewer",
    name: "viewer",
    component: () =>
      import(/* webpackChunkName: "viewer" */ "../pages/ViewerPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/viewee",
    name: "viewee",
    component: () =>
      import(/* webpackChunkName: "viewee" */ "../pages/VieweePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../pages/RegisterPage.vue"),
  },
  {
    path: "/console",
    name: "console",
    component: () =>
      import(/* webpackChunkName: "console" */ "../pages/ConsolePage.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "overview",
        component: () =>
          import(
            /* webpackChunkName: "overview" */ "../pages/OverviewPage.vue"
          ),
        alias: "",
      },
      {
        path: "problems",
        name: "problems",
        component: () =>
          import(
            /* webpackChunkName: "problems" */ "../pages/ProblemsPage.vue"
          ),
      },
      {
        path: "problems/:id",
        name: "problem",
        component: () =>
          import(/* webpackChunkName: "problem" */ "../pages/ProblemPage.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../pages/SettingsPage.vue"
          ),
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../pages/ProfilePage.vue"),
      },
    ],
  },
];

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
