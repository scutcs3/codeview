import { createRouter, createWebHashHistory } from 'vue-router'

import Index from './pages/Index.vue'
import Login from './pages/Login.vue'
import Viewee from './pages/Viewee.vue'
import Viewer from './pages/Viewer.vue'
import Register from './pages/Register.vue'
import Console from './pages/Console.vue'
import Overview from './pages/Overview.vue'
import Problems from './pages/Problems.vue'
import Settings from './pages/Settings.vue'
import Profile from './pages/Profile.vue'
import Problem from './pages/Problem.vue'
import test from './components/quillEditor'

let routes = [{
        path: '/index',
        component: Index,
        name: 'index',
        alias: '/'
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/viewer',
        component: Viewer,
        name: 'viewer',
        meta: { requiresAuth: true }
    },
    {
        path: '/viewee',
        component: Viewee,
        name: 'viewee',
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
    },
    {
        path: '/console',
        component: Console,
        name: 'console',
        meta: { requiresAuth: true },
        children: [{
                path: 'overview',
                component: Overview,
                name: 'overview',
                alias: ''
            },
            {
                path: 'problems',
                component: Problems,
                name: 'problems',
            },
            {
                path: 'problems/:id',
                component: Problem,
                name: 'problem',
            },
            {
                path: 'settings',
                component: Settings,
                name: 'settings'
            },
            {
                path: 'profile',
                component: Profile,
                name: 'profile'
            }
        ]
    },
    {path:'/test',
    component:test,
    name: 'test',
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