<template>
    <div class="stock">
        <h1>stock page</h1>
        <div>{{ stockPage.instrument_name }}</div>
        <StockTimeLineChart 
            :timeSeriesDays="timeSeriesDays" 
            :timeSeriesHigh="timeSeriesHigh" 
            :timeSeriesOpen="timeSeriesOpen" 
            :timeSeriesClose='timeSeriesClose' 
            :timeSeriesLow="timeSeriesLow"
            :timeSeriesLowest="timeSeriesLowest"
            :timeSeriesHighest="timeSeriesHighest"
        />
    </div>
</template>

<script>
import StockTimeLineChart from '../components/StockTimeLineChart'
import store from '../store';
import { callGetStockTimeSeries } from '../api/stockCalls';
export default {
    name: 'Stock Page',
    components: {
        StockTimeLineChart
    },
    data() {
        return {
            timeSeries: [],
            displayChart: false,
        };
    },
    computed: {
        stockPage: function() {
            return store.state.stockPage;
        },
        timeSeriesDays: function() {
            return this.timeSeries.map(item => item.datetime.slice(5))
        },
        timeSeriesOpen: function() {
            return this.timeSeries.map(item => parseFloat(item.open).toFixed(2))
        },
        timeSeriesHigh: function() {
            return this.timeSeries.map(item => parseFloat(item.high).toFixed(2))
        },
         timeSeriesLow: function() {
            return this.timeSeries.map(item => parseFloat(item.low).toFixed(2))
        },
        timeSeriesClose: function() {
            return this.timeSeries.map(item => parseFloat(item.close).toFixed(2))
        },
        timeSeriesLowest: function() {
            return Math.min(...this.timeSeriesLow) - 100
        },
        timeSeriesHighest: function() {
            return Math.max(...this.timeSeriesHigh) + 100
        }
    },
    async created() {
        let res = await callGetStockTimeSeries(this.stockPage.symbol);
        let vals = res.data.values;
        // reverse to show in chronological order
        this.timeSeries = vals.reverse()
        console.log(res.data.values)
        this.displayChart = true;
    },
    watch: {
        stockPage: async function() {
            let res = await callGetStockTimeSeries(this.stockPage.symbol);
            let vals = res.data.values;
            // reverse to show in chronological order
            this.timeSeries = vals.reverse()
            console.log(res.data.values);
        },
    },
};
</script>
