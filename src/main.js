import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApexCharts from 'vue3-apexcharts';
import { auth } from './firebase/firebase';
import ClickOutside from './utils/click-outside.js';

let app;

auth.onAuthStateChanged((user) => {
    if (!app) {
        app = createApp(App)
            .directive('click-outside', ClickOutside)
            .use(store)
            .use(router)
            .use(VueApexCharts)
            .mount('#app');
    }
    // payload for dispatch, flag is so router does not redirect
    // to profile and instead stays on current page
    const payload = { user: auth.currentUser, flag: false };
    if (user) {
        store.dispatch('fetchUserProfile', payload);
    }
});
