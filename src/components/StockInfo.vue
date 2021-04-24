<template>
    <div class="header">
        <div class="header-name">
            <StockStar
                class="stock-star"
                v-if="isLoggedIn"
                :stockSymbol="stockQuote.symbol"
            />
            <h2>{{ stockQuote.name }}</h2>
        </div>
        <div class="header-info">
            <IconUpDown :percent="parseFloat(stockQuote.percent_change)" />
            <h4>{{ stockQuote.exchange }}</h4>
        </div>
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
import { mapState } from 'vuex';
import IconUpDown from './IconUpDown';
import StockStar from './StockStar';
import _ from 'lodash';
export default {
    name: 'StockInfo',
    components: {
        IconUpDown,
        StockStar,
    },
    props: {
        stockQuote: Object,
    },
    computed: {
        ...mapState(['userProfile']),
        isLoggedIn: function() {
            return !_.isEmpty(this.userProfile);
        },
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
                if (count === 2 && i !== 0) {
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
    margin: 1% 0;
}

.stock-star {
    margin-bottom: 5px;
}

.header-name,
.header-info {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
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

@media only screen and (max-width: 767px) {
    .header {
        flex-direction: column;
    }
    .header-name,
    .header-info {
        width: 100%;
    }

    .header-name {
        justify-content: center;
    }
    .stock-star {
        margin-right: 10%;
    }
    .display-today,
    .display-52 {
        flex-direction: column;
    }
}
</style>
