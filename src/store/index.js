import { createStore } from 'vuex';
import router from '../router/index';
import * as fb from '../firebase/firebase';

export default createStore({
    state: {
        stockPage: {},
        searchTerm: '',
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
        updateSearchTerm(state, val) {
            state.searchTerm = val;
        },
        getAllStocksAvailable(state, allStocks) {
            state.allStocksAvailable = allStocks;
        },
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        syncUserStocks(state, stocks) {
            // stocks needs to be an array
            state.usersStocks = stocks;
        },
        addStockToProfile(state, stock) {
            state.usersStocks.push(stock);
        },
        removeStockFromProfile(state, stock) {
            state.usersStocks = state.usersStocks.filter(
                (stocks) => stocks !== stock
            );
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
                // payload.flag is to force redirect to /profile
                // on login
                const payload = { user, flag: true };
                dispatch('fetchUserProfile', payload);
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
        async removeStock({ commit }, stock) {
            await fb.usersCollection
                .doc(fb.auth.currentUser.uid)
                .collection('stockCollection')
                .doc(stock)
                .delete();
            commit('removeStockFromProfile', stock);
        },
        async fetchUserProfile({ commit }, payload) {
            const userProfile = await fb.usersCollection
                .doc(payload.user.uid)
                .get();
            commit('setUserProfile', userProfile.data());
            const usersStocks = [];
            await fb.usersCollection
                .doc(payload.user.uid)
                .collection('stockCollection')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) =>
                        usersStocks.push(doc.data().stock)
                    );
                });
            commit('syncUserStocks', usersStocks);
            if (payload.flag) {
                router.push('/profile');
            }
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
                // payload.flag is to force redirect to /profile
                // on signup
                const payload = { user, flag: true };
                dispatch('fetchUserProfile', payload);
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
