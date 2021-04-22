<template>
    <div class="search-bar">
        <label>Search for a stock: </label>
        <input placeholder="Ex. Tesla" v-model="searchTerm" />
        <SearchResults
            @close-search-dropdown="handleSelected"
            v-if="showSearchResults"
            :resultsData="searchResultsData"
            :showLoggedIn="showLoggedIn"
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
    props: {
        showLoggedIn: Boolean,
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
            store.commit('closeNavBar');
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
.search-bar {
    display: flex;
}

input {
    padding: 10px 10px;
    margin-left: 5px;
    text-align: center;
    background: #e7e7e7;
    border: 1px solid gray;
}

.search-bar label {
    display: flex;
    font-style: italic;
    align-items: center;
    font-weight: 700;
}
@media only screen and (max-width: 767px) {
    .search-bar {
        flex-direction: column;
    }
}
</style>
