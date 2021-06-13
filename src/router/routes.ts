import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";

const routes: Array<RouteRecordRaw> = [
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
    path: "/viewer/:id",
    name: "viewer",
    component: () =>
      import(/* webpackChunkName: "viewer" */ "../pages/ViewerPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/viewee/:id",
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
        path: "interviews",
        name: "interviews",
        component: () =>
          import(
            /* webpackChunkName: "interviews" */ "../pages/InterviewsPage.vue"
          ),
        alias: "",
        children: [
          {
            path: "list",
            name: "interviews-list",
            component: () =>
              import(
                /* webpackChunkName: "interviews" */ "../pages/InterviewsListPage.vue"
              ),
            alias: "",
          },
          {
            path: "new",
            name: "interviews-new",
            component: () =>
              import(
                /* webpackChunkName: "problems" */ "../pages/InterviewsNewPage.vue"
              ),
          },
        ],
      },
      {
        path: "problems",
        name: "problems",
        component: () =>
          import(
            /* webpackChunkName: "problems" */ "../pages/ProblemsPage.vue"
          ),
        children: [
          {
            path: "list",
            name: "problems-list",
            component: () =>
              import(
                /* webpackChunkName: "problems" */ "../pages/ProblemsListPage.vue"
              ),
            alias: "",
          },
          {
            path: "new",
            name: "problems-new",
            component: () =>
              import(
                /* webpackChunkName: "problems" */ "../pages/ProblemsNewPage.vue"
              ),
          },
        ],
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
      {
        path: "security",
        name: "security",
        component: () =>
          import(
            /* webpackChunkName: "security" */ "../pages/SecurityPage.vue"
          ),
      },
    ],
  },
];

export default routes;
