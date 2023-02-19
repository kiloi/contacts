import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/auth/login.vue'
import Register from '../pages/auth/register.vue'
import Layout from '../pages/layout/index.vue'
import Profile from '../pages/app/profile.vue'
import Contacts from '../pages/app/contacts.vue'
import MangeUsers from '../pages/app/manage-users.vue'




const routes = [
    {
        path: '',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/userDashboard',
        name: 'layout',
        component: Layout,
        redirect: {
            name: 'profile',
        },
        children: [
            {
                path: '/profile/:id',
                name: 'profile',
                component: Profile,
                props: true,
            },
            {
                path: '/contacts/:id',
                name: 'contacts',
                component: Contacts,
                props: true,
            },
            {
                path: '/manage-users',
                name: 'manage-users',
                component: MangeUsers
            }

        ]
    }
]


















const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router