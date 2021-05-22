import { createRouter, createWebHashHistory } from 'vue-router'

import IndexPage from './pages/IndexPage.vue'
import LoginPage from './pages/LoginPage.vue'
import VieweePage from './pages/VieweePage.vue'
import ViewerPage from './pages/ViewerPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import ConsolePage from './pages/ConsolePage.vue'
import OverviewPage from './pages/OverviewPage.vue'
import ProblemsPage from './pages/ProblemsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ProblemPage from './pages/ProblemPage.vue'

let routes = [{
        path: '/index',
        component: IndexPage,
        name: 'index',
        alias: '/'
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login',
    },
    {
        path: '/viewer',
        component: ViewerPage,
        name: 'viewer',
        meta: { requiresAuth: true }
    },
    {
        path: '/viewee',
        component: VieweePage,
        name: 'viewee',
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register',
    },
    {
        path: '/console',
        component: ConsolePage,
        name: 'console',
        meta: { requiresAuth: true },
        children: [{
                path: 'overview',
                component: OverviewPage,
                name: 'overview',
                alias: ''
            },
            {
                path: 'problems',
                component: ProblemsPage,
                name: 'problems',
            },
            {
                path: 'problems/:id',
                component: ProblemPage,
                name: 'problem',
            },
            {
                path: 'settings',
                component: SettingsPage,
                name: 'settings'
            },
            {
                path: 'profile',
                component: ProfilePage,
                name: 'profile'
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to) => {
    var isLogin = localStorage.getItem('token');
    if (!isLogin && to.meta.requiresAuth) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }
    return true;
})
export default router;