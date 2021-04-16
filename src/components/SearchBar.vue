<template>
    <div class="search-bar">
        <label
            >Search for a stock:
            <input v-model="searchTerm" />
        </label>
        <SearchResults
            @close-search-dropdown="handleSelected"
            v-if="showSearchResults"
            :resultsData="searchResultsData"
        />
    </div>
</template>

<script>
import store from '../store';
import SearchResults from './SearchResults';
import _ from 'lodash';
import { callGetSymbol } from '../api/stockCalls';
export default {
    name: 'SearchBar',
    components: {
        SearchResults,
    },
    created() {
        this.debouncedGetSymbol = _.debounce(this.getSymbol, 750);
    },
    data() {
        return {
            searchTerm: '',
            searchResultsData: {},
            showSearchResults: false,
        };
    },
    methods: {
        async getSymbol() {
            if (this.searchTerm.length > 0) {
                let res = await callGetSymbol(this.searchTerm);
                console.log(res);
                this.searchResultsData = res;
                this.showSearchResults = true;
            }
        },
        handleSelected(selected) {
            this.showSearchResults = false;
            this.searchTerm = '';
            store.commit('updateStockPage', selected);
            this.$router.push({
                name: 'Stock Page',
                params: { symbol: selected.symbol },
            });
        },
    },
    watch: {
        searchTerm: function() {
            this.debouncedGetSymbol();
        },
    },
};
</script>

<style scoped>
input {
    padding: 10px 10px;
}

.search-bar label {
    display: flex;
    align-items: center;
}
</style>
