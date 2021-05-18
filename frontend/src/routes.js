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
    },
    {
        path: '/viewee',
        component: Viewee,
        name: 'viewee',
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
        children: [{
                path: 'overview',
                component: Overview,
                name: 'overview',
                alias: ''
            },
            {
                path: 'problems',
                component: Problems,
                name: 'problems'
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;