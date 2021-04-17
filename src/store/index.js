import { createStore } from 'vuex';

export default createStore({
    state: {
        stockPage: {},
        allStocksAvailable: [],
    },
    mutations: {
        updateStockPage(state, newStock) {
            state.stockPage = newStock;
        },
        getAllStocksAvailable(state, allStocks) {
            state.allStocksAvailable = allStocks;
        },
    },
    actions: {},
    modules: {},
});
