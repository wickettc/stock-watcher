import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import { auth } from '../firebase/firebase';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: { requiresAuth: true },
        // route level code-splitting
        // this generates a separate chunk (profile.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    },
    {
        path: '/stock/:symbol',
        name: 'Stock Page',
        component: () => import('../views/StockPage.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((x) => x.meta.requiresAuth)) {
        // check if logged in here
        console.log(auth);
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
