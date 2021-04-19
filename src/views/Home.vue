<template>
    <div class="home">
        <h1>Stock Watcher</h1>
        <h4>Search For Stocks By Character</h4>
        <div class="alpha-container">
            <div
                :class="[
                    'alpha-clickable',
                    alpha === selectedLetter ? 'highlighted-Letter' : '',
                ]"
                v-for="(alpha, i) in alphabet"
                :key="i"
                @click="selectLetter(alpha)"
            >
                {{ alpha }}
            </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <div class="home-stock-container" v-if="!loading">
            <div
                class="home-stock-display"
                v-for="(stock, i) in displayStockList"
                :key="Math.random() * i * 1000000"
                :stockInfo="stock"
                @click="handleStockSelect(stock)"
            >
                <span class="stock-name">{{ stock.name }}</span>
                <span class="bold stock-symbol">{{ stock.symbol }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import store from '../store';
import { getAllStocksAvailable } from '../api/stockCalls';
export default {
    name: 'Home',
    methods: {
        selectLetter(alpha) {
            this.selectedLetter = alpha;
        },
        handleStockSelect(selected) {
            store.commit('updateStockPage', selected);
            this.$router.push({
                name: 'Stock Page',
                params: { symbol: selected.symbol },
            });
        },
    },
    watch: {
        selectedLetter: function() {
            this.loading = true;
            let res = this.allStocks.filter(
                (stock) => stock.name[0] === this.selectedLetter
            );
            res = _.uniqBy(res, 'name');
            this.displayStockList = _.uniqBy(res, 'symbol');
            this.loading = false;
        },
    },
    data() {
        return {
            displayStockList: [],
            allStocks: [],
            loading: true,
            selectedLetter: '',
            alphabet: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
        };
    },
    async created() {
        let res = await getAllStocksAvailable('United States');
        this.allStocks = res.data.data;
        this.selectedLetter = 'A';
    },
};
</script>

<style scoped>
.home-stock-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 90vw;
    margin: 10px auto;
}

.home-stock-display {
    border: 1px solid black;
    padding: 6px 10px;
    margin: 2px;
    width: 30%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #e7e7e7;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.home-stock-display:hover {
    background: rgb(35, 173, 35);
    transform: scale(1.05);
}

.stock-name {
    width: 70%;
    box-sizing: border-box;
    padding-right: 3px;
}

.stock-symbol {
    width: 30%;
    box-sizing: border-box;
}

.alpha-container {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
}

.alpha-clickable {
    border: 1px solid black;
    padding: 5px;
    margin: 2px;
    border-radius: 25%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.alpha-clickable:hover {
    background: rgb(187, 187, 187);
    transform: scale(1.05);
}

.highlighted-Letter {
    background: rgb(35, 173, 35);
    color: white;
    transform: scale(1.1);
}

.loader {
    margin: 10%;
}
</style>
