<template>
    <div class="home">
        <h1>Stock Watcher</h1>
        <h4>Search For Stock By Character</h4>
        <div class="alpha-container">
            <div
                class="alpha-clickable"
                v-for="(alpha, i) in alphabet"
                :key="i"
                @click="selectedLetter(alpha)"
            >
                {{ alpha }}
            </div>
        </div>
        <div class="home-stock-container">
            <HomeStockDisplay
                v-for="(stock, i) in displayStockList"
                :key="Math.random() * i * 1000000"
                :stockInfo="stock"
            />
        </div>
    </div>
</template>

<script>
import { getAllStocksAvailable } from '../api/stockCalls';
import HomeStockDisplay from '../components/HomeStockDisplay';
export default {
    name: 'Home',
    components: {
        HomeStockDisplay,
    },
    method: {
        selectedLetter(alpha) {
            this.selectedLetter = alpha;
        },
    },
    computed: {
        displayStocks() {
            let letter = this.selectedLetter;
            return this.allStocks.filter((stock) => stock.name[0] === letter);
        },
    },
    data() {
        return {
            displayStockList: [],
            allStocks: [],
            selectedLetter: 'A',
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
        console.log(res.data);
        this.allStocks = res.data.data;
    },
};
</script>

<style scoped>
.home-stock-container {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90vw;
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
}
</style>
