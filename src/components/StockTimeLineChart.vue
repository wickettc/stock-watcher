<template>
    <div>
        <apexchart
            class="chart"
            type="line"
            :options="timeLineChartOptions"
            :series="timeLineSeries"
        ></apexchart>
    </div>
</template>

<script>
export default {
    name: 'StockTimeLineChart',
    props: {
        timeLineSeries: Array,
        timeLineChartOptions: Object,
    },
};
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    padding-top: 10px;
}

.chart {
    width: 90%;
}

@media only screen and (min-width: 1000px) {
    .chart {
        width: 65%;
    }
}
</style>
