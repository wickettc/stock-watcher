import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApexCharts from 'vue3-apexcharts';
import { auth } from './firebase/firebase';

let app;

auth.onAuthStateChanged((user) => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(VueApexCharts)
            .mount('#app');
    }
    if (user) {
        store.dispatch('fetchUserProfile', auth.currentUser);
    }
});
