<template>
    <svg
        @click="handleAddOrRemoveStock"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        :fill="isStockIncluded ? 'black' : 'white'"
    >
        <path
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
        />
    </svg>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'StockStar',
    props: {
        stockSymbol: String,
    },
    methods: {
        handleAddOrRemoveStock() {
            this.isStockIncluded ? this.removeStock() : this.addStock();
        },
        addStock() {
            this.$store.dispatch('addStock', this.stockSymbol);
            console.log(this.$store.state);
        },
        removeStock() {
            this.$store.dispatch('removeStock', this.stockSymbol);
            console.log(this.$store.state);
        },
    },
    computed: {
        ...mapState(['usersStocks']),
        isStockIncluded() {
            return this.usersStocks.includes(this.stockSymbol);
        },
    },
};
</script>
