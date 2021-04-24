<template>
    <div class="stock-page">
        <div class="loader" v-if="loading"></div>
        <StockInfo v-if="!loading" :stockQuote="stockQuote" />
        <StockTimeLineChart
            v-if="!loading"
            :timeLineSeries="timeLineSeries"
            :timeLineChartOptions="timeLineChartOptions"
        />
    </div>
</template>

<script>
import StockInfo from '../components/StockInfo';
import StockTimeLineChart from '../components/StockTimeLineChart';
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
            loading: true,
        };
    },
    computed: {
        stockPage() {
            return this.$store.state.stockPage;
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
                    labels: {
                        hideOverlappingLabels: true,
                        style: {
                            fontSize: '16px',
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: 'Prices in USD',
                    },
                    forceNiceScale: true,
                    labels: {
                        style: { fontSize: '16px' },
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                },
                responsive: [
                    {
                        breakpoint: '767',
                        options: {
                            yaxis: {
                                labels: {
                                    style: { fontSize: '12px' },
                                },
                            },
                            xaxis: {
                                labels: {
                                    hideOverlappingLabels: true,
                                    rotate: -30,
                                    style: {
                                        fontSize: '12px',
                                    },
                                },
                            },
                        },
                    },
                ],
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
            this.loading = true;
            let res = await callGetStockTimeSeries(this.stockPage.symbol);
            let quoteRes = await callGetStockQuote(this.$route.params.symbol);
            this.stockQuote = quoteRes.data;
            let vals = res.data.values;
            // reverse to show in chronological order
            this.timeSeries = vals.reverse();
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.loader {
    margin: 10%;
}
</style>
