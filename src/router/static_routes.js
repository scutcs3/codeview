import IndexPage from "../pages/IndexPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ViewerPage from "../pages/ViewerPage.vue";
import VieweePage from "../pages/VieweePage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ConsolePage from "../pages/ConsolePage.vue";
import InterviewsPage from "../pages/InterviewsPage.vue";
import InterviewsListPage from "../pages/InterviewsListPage.vue";
import InterviewsNewPage from "../pages/InterviewsNewPage.vue";
import ProblemsPage from "../pages/ProblemsPage.vue";
import ProblemsListPage from "../pages/ProblemsListPage.vue";
import ProblemsNewPage from "../pages/ProblemsNewPage.vue";
import ProblemPage from "../pages/ProblemPage.vue";
import SettingsPage from "../pages/SettingsPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

export default [
  {
    path: "/index",
    name: "index",
    component: IndexPage,
    alias: "/",
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/viewer",
    name: "viewer",
    component: ViewerPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/viewee",
    name: "viewee",
    component: VieweePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/console",
    name: "console",
    component: ConsolePage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "interviews",
        name: "interviews",
        component: InterviewsPage,
        alias: "",
        children: [
          {
            path: "list",
            name: "interviews-list",
            component: InterviewsListPage,
            alias: "",
          },
          {
            path: "new",
            name: "interviews-new",
            component: InterviewsNewPage,
          },
        ],
      },
      {
        path: "problems",
        name: "problems",
        component: ProblemsPage,
        children: [
          {
            path: "list",
            name: "problems-list",
            component: ProblemsListPage,
            alias: "",
          },
          {
            path: "new",
            name: "problems-new",
            component: ProblemsNewPage,
          },
        ],
      },
      {
        path: "problems/:id",
        name: "problem",
        component: ProblemPage,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsPage,
      },
      {
        path: "profile",
        name: "profile",
        component: ProfilePage,
      },
    ],
  },
];
