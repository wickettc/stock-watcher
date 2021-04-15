<template>
    <div class="stock">
        <h1>stock page</h1>
        <div>{{ stockPage.instrument_name }}</div>
        <ul>
            <li v-for="time in timeSeries" :key="time.datetime">
                {{ time }} {{ new Date(time.datetime).toLocaleTimeString() }}
            </li>
        </ul>
    </div>
</template>

<script>
import store from '../store';
import { callGetStockTimeSeries } from '../api/stockCalls';
export default {
    name: 'Stock Page',
    components: {},
    data() {
        return {
            timeSeries: {},
            displayChart: false,
        };
    },
    computed: {
        stockPage() {
            return store.state.stockPage;
        },
    },
    async created() {
        let res = await callGetStockTimeSeries(this.stockPage.symbol);
        this.timeSeries = res.data.values;
        this.displayChart = true;
    },
    watch: {
        stockPage: async function() {
            let res = await callGetStockTimeSeries(this.stockPage.symbol);
            this.timeSeries = res.data.values;
            console.log(res.data.values);
        },
    },
};
</script>
