<template>
    <div class="header">
        <h2>{{ stockQuote.name }}</h2>
        <IconUpDown :percent="parseFloat(stockQuote.percent_change)" />
        <h4>{{ stockQuote.exchange }}</h4>
    </div>
    <div class="body">
        <div>
            <h3 class="add-italics">Displaying for {{ displayDate }}</h3>
            <div class="display-today">
                <p>
                    <b>Open:</b> ${{ parseFloat(stockQuote.open).toFixed(2) }}
                </p>
                <p>
                    <b>Close:</b> ${{ parseFloat(stockQuote.close).toFixed(2) }}
                </p>
                <p>
                    <b>High:</b> ${{ parseFloat(stockQuote.high).toFixed(2) }}
                </p>
                <p><b>Low:</b> ${{ parseFloat(stockQuote.low).toFixed(2) }}</p>
                <p><b>Volume:</b> {{ volume }}</p>
            </div>
        </div>
        <div>
            <h3 class="add-italics">Last 52 Weeks</h3>
            <div class="display-52">
                <p>
                    <b>High:</b> ${{
                        parseFloat(stockQuote.fifty_two_week.high).toFixed(2)
                    }}
                </p>
                <p>
                    <b>Low:</b> ${{
                        parseFloat(stockQuote.fifty_two_week.low).toFixed(2)
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import IconUpDown from './IconUpDown';
export default {
    name: 'StockInfo',
    components: {
        IconUpDown,
    },
    props: {
        stockQuote: Object,
    },
    data() {
        return {
            stockGreenOrRed: '',
        };
    },
    watch: {
        stockQuote: function() {
            this.stockGreenOrRed =
                this.stockQuote.percent_change <= 0 ? 'red' : 'green';
        },
    },
    computed: {
        displayDate: function() {
            let splitDate = this.stockQuote.datetime.split('-');
            return new Date(
                splitDate[0],
                splitDate[1] - 1,
                splitDate[2]
            ).toDateString();
        },
        volume: function() {
            // adds commas into string
            let str = this.stockQuote.volume;
            let res = '';
            let count = 0;
            for (let i = str.toString().length - 1; i >= 0; i--) {
                if (count === 2) {
                    res = `,${str[i]}${res}`;
                    count = 0;
                } else {
                    res = `${str[i]}${res}`;
                    count++;
                }
            }
            return res;
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.header h2 {
    width: 40%;
}

.display-today {
    display: flex;
    justify-content: space-evenly;
    background: #e7e7e7;
}

.display-52 {
    display: flex;
    justify-content: space-evenly;
    background: #e7e7e7;
}

.add-italics {
    font-style: italic;
}
</style>
