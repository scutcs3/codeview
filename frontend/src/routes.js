import { createRouter, createWebHashHistory } from 'vue-router'

import Index from './pages/Index.vue'
import Login from './pages/Login.vue'
import Viewee from './pages/Viewee.vue'
import Viewer from './pages/Viewer.vue'
import Register from './pages/Register.vue'


let routes = [
    {
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;