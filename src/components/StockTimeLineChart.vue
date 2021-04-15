<template>
  <div>
    <apexchart
      width="500"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
    name: 'StockTimeLineChart',
    props: {
        timeSeriesDays: Array,
        timeSeriesOpen: Array,
        timeSeriesHigh: Array,
        timeSeriesLow: Array,
        timeSeriesClose: Array,
        timeSeriesLowest: Number,
        timeSeriesHighest: Number
    },
    data: function() {
    return {
      chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: { 
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['red', 'blue', 'orange', 'black'],
            dataLabels: {
              enabled: true,
              enabledOnSeries: [3] 
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Last 30 Days',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            }, 
            markers: {
              size: 1
            },
            xaxis: {
              categories: this.timeSeriesDays,
              title: {
                text: 'Date'
              }
            },
            yaxis: {
              title: {
                text: 'Prices in USD'
              },
              min: parseFloat(this.timeSeriesLowest.toFixed()),
              max: parseFloat(this.timeSeriesHighest.toFixed())
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
      series: [
            {
              name: "High",
              data: this.timeSeriesHigh
            },
            {
              name: "Low",
              data: this.timeSeriesLow
            },
            {
              name: "Open",
              data: this.timeSeriesOpen
            },
            {
              name: "Close",
              data: this.timeSeriesClose
            },
          ],
    };
  },
}
</script>