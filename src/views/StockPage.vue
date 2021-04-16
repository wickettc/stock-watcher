<template>
    <div class="stock">
        <StockInfo v-if="!loading" :stockQuote="stockQuote" />
        <StockTimeLineChart
            :timeLineSeries="timeLineSeries"
            :timeLineChartOptions="timeLineChartOptions"
        />

        <!-- {{ fiftyTwoWeek.high }} -->
    </div>
</template>

<script>
import StockInfo from '../components/StockInfo';
import StockTimeLineChart from '../components/StockTimeLineChart';
import store from '../store';
import { callGetStockTimeSeries, callGetStockQuote } from '../api/stockCalls';

export default {
    name: 'Stock Page',
    components: {
        StockInfo,
        StockTimeLineChart,
    },
    data() {
        return {
            timeSeries: [],
            displayChart: false,
            stockQuote: {},
            stockGreenOrRed: '',
            displayDate: '',
            loading: true,
        };
    },
    computed: {
        stockPage() {
            return store.state.stockPage;
        },
        fiftyTwoWeek() {
            return this.stockQuote.fifty_two_week;
        },
        timeLineSeries() {
            const newHigh = this.timeSeries.map((item) =>
                parseFloat(item.high).toFixed(2)
            );
            const newOpen = this.timeSeries.map((item) =>
                parseFloat(item.open).toFixed(2)
            );
            const newLow = this.timeSeries.map((item) =>
                parseFloat(item.low).toFixed(2)
            );
            const newClose = this.timeSeries.map((item) =>
                parseFloat(item.close).toFixed(2)
            );
            return [
                {
                    name: 'High',
                    data: newHigh,
                },
                {
                    name: 'Low',
                    data: newLow,
                },
                {
                    name: 'Open',
                    data: newOpen,
                },
                {
                    name: 'Close',
                    data: newClose,
                },
            ];
        },
        timeLineChartOptions() {
            const newDays = this.timeSeries.map((item) =>
                item.datetime.slice(5)
            );
            const findMin =
                Math.min(...this.timeSeries.map((item) => item.low)) - 1;
            const newMin = findMin <= 0 ? 0 : Math.floor(findMin);
            const newMax = Math.floor(
                Math.max(...this.timeSeries.map((item) => item.high)) + 1
            );
            return {
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#bf3a36', '#497bd1', '#d18f49', '#3e4142'],
                dataLabels: {
                    enabled: false,
                    distributed: true,
                    style: {
                        colors: ['#bf3a36', '#497bd1', '#d18f49', '#3e4142'],
                    },
                },
                stroke: {
                    curve: 'smooth',
                },
                title: {
                    text: 'Last 30 Days',
                    align: 'left',
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5,
                    },
                },
                markers: {
                    size: 1,
                },
                xaxis: {
                    categories: newDays,
                    title: {
                        text: 'Date',
                    },
                },
                yaxis: {
                    title: {
                        text: 'Prices in USD',
                    },
                    min: newMin,
                    max: newMax,
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                },
            };
        },
    },
    async created() {
        let res = await callGetStockTimeSeries(this.$route.params.symbol);
        let quoteRes = await callGetStockQuote(this.$route.params.symbol);
        this.stockQuote = quoteRes.data;
        let vals = res.data.values;
        // reverse to show in chronological order
        this.timeSeries = vals.reverse();
        this.displayChart = true;
        this.loading = false;
    },
    watch: {
        stockPage: async function() {
            let res = await callGetStockTimeSeries(this.stockPage.symbol);
            let quoteRes = await callGetStockQuote(this.$route.params.symbol);
            this.stockQuote = quoteRes.data;
            let vals = res.data.values;
            // reverse to show in chronological order
            this.timeSeries = vals.reverse();
            this.loading = false;
        },
        // stockQuote: function() {
        //     this.stockGreenOrRed =
        //         this.stockQuote.percent_change <= 0 ? 'red' : 'green';
        //     let splitDate = this.stockQuote.datetime.split('-');
        //     this.displayDate = new Date(
        //         splitDate[0],
        //         splitDate[1] - 1,
        //         splitDate[2]
        //     ).toDateString();
        // },
    },
};
</script>
