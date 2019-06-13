import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

import App from './views/App'
import Home from './views/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import User from './components/auth/User'
import Admin from './components/auth/Admin'
import Reservation from './components/Reservation'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/reservation/:year/:month/:day',
            name: 'reservation',
            component: Reservation
        }
    ],
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login', '/register', '/reservation'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
      return next('/login');
    }
    next();
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});