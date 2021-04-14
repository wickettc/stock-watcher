import { createStore } from 'vuex';

export default createStore({
    state: {
        stockPage: {},
    },
    mutations: {
        updateStockPage(state, newStock) {
            state.stockPage = newStock;
        },
    },
    actions: {},
    modules: {},
});
