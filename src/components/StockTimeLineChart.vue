<template>
  <div>
    <apexchart
      width="500"
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
        timeLineChartOptions: Object
    },
}
</script>