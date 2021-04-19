import { createStore } from 'vuex';
import router from '../router/index';
import * as fb from '../firebase/firebase';

export default createStore({
    state: {
        stockPage: {},
        allStocksAvailable: [],
        userProfile: {},
        openNavBar: false,
    },
    mutations: {
        updateStockPage(state, newStock) {
            state.stockPage = newStock;
        },
        getAllStocksAvailable(state, allStocks) {
            state.allStocksAvailable = allStocks;
        },
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        handleNavBar(state) {
            state.openNavBar = !state.openNavBar;
        },
        closeNavBar(state) {
            state.openNavBar = false;
        },
    },
    actions: {
        async login({ dispatch }, form) {
            const { user } = await fb.auth.signInWithEmailAndPassword(
                form.email,
                form.password
            );
            dispatch('fetchUserProfile', user);
        },
        async fetchUserProfile({ commit }, user) {
            const userProfile = await fb.usersCollection.doc(user.uid).get();
            commit('setUserProfile', userProfile.data());
            router.push('/');
        },
        async signup({ dispatch }, form) {
            const { user } = await fb.auth.createUserWithEmailAndPassword(
                form.email,
                form.password
            );
            await fb.usersCollection.doc(user.uid).set({
                firstname: form.firstname,
                lastname: form.lastname,
            });
            dispatch('fetchUserProfile', user);
        },
        async logout({ commit }) {
            await fb.auth.signOut();

            commit('setUserProfile', {});
            router.push('/login');
        },
    },
    modules: {},
});
