import { createStore } from 'vuex';
import router from '../router/index';
import * as fb from '../firebase/firebase';

export default createStore({
    state: {
        stockPage: {},
        allStocksAvailable: [],
        userProfile: {},
        usersStocks: [],
        loginError: {},
        signupError: {},
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
        syncUserStocks(state, stocks) {
            // stocks needs to be array of stocks
            state.usersStocks = stocks;
        },
        addStockToProfile(state, stock) {
            state.usersStocks.push(stock);
        },
        setLoginError(state, error) {
            state.loginError = error;
        },
        setSignupError(state, error) {
            state.signupError = error;
        },
        handleNavBar(state) {
            state.openNavBar = !state.openNavBar;
        },
        closeNavBar(state) {
            state.openNavBar = false;
        },
    },
    actions: {
        async login({ dispatch, commit }, form) {
            try {
                const { user } = await fb.auth.signInWithEmailAndPassword(
                    form.email,
                    form.password
                );
                dispatch('fetchUserProfile', user);
            } catch (err) {
                commit('setLoginError', err);
            }
        },
        async addStock({ commit }, stock) {
            let stockCol = await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('stockCollection')
                .doc(stock);
            stockCol.set({
                stock: stock,
            });
            commit('addStockToProfile', stock);
        },
        async fetchUserProfile({ commit }, user) {
            const userProfile = await fb.usersCollection.doc(user.uid).get();
            commit('setUserProfile', userProfile.data());
            // const usersStocks = await userProfile.collection('stockCollection').get().then((doc) => {
            // ////////////////////////need to loop through stocks here to add to userStock state
            // })
            router.push('/profile');
        },
        async signup({ dispatch, commit }, form) {
            try {
                const { user } = await fb.auth.createUserWithEmailAndPassword(
                    form.email,
                    form.password
                );
                const userCol = await fb.usersCollection.doc(user.uid);
                userCol.set({
                    displayName: `${form.firstname} ${form.lastname}`,
                });

                dispatch('fetchUserProfile', user);
            } catch (err) {
                commit('setSignupError', err);
            }
        },
        async logout({ commit }) {
            await fb.auth.signOut();

            commit('setUserProfile', {});
            router.push('/login');
        },
    },
    modules: {},
});
