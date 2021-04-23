<template>
    <div class="search-bar">
        <label>Search for a stock: </label>
        <div>
            <input placeholder="Ex. Tesla" v-model="searchTerm" />
            <div class="dropdown" v-if="showSearchResults">
                <div
                    class="display-item"
                    @click="handleSelected(item)"
                    v-for="(item, i) in usaResults"
                    :key="i"
                >
                    {{ item.instrument_name }} -- {{ item.symbol }}
                </div>
                <div class="display-item" v-if="usaResults.length === 0">
                    No Results Found
                </div>
            </div>
        </div>
        <!-- <SearchResults
            @close-search-dropdown="handleSelected"
            v-if="showSearchResults"
            :resultsData="searchResultsData"
            :showLoggedIn="showLoggedIn"
        /> -->
    </div>
</template>

<script>
import store from '../store';
// import SearchResults from './SearchResults';
import _ from 'lodash';
import { callGetSymbol } from '../api/stockCalls';
export default {
    name: 'SearchBar',
    components: {
        // SearchResults,
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
                this.searchResultsData = res;
                this.showSearchResults = true;
            } else {
                this.showSearchResults = false;
            }
        },
        handleSelected(selected) {
            if (!selected) {
                this.showSearchResults = false;
                this.searchTerm = '';
                store.commit('closeNavBar');
            } else {
                this.showSearchResults = false;
                this.searchTerm = '';
                store.commit('closeNavBar');
                store.commit('updateStockPage', selected);
                this.$router.push({
                    name: 'Stock Page',
                    params: { symbol: selected.symbol },
                });
            }
        },
    },
    computed: {
        usaResults() {
            return this.searchResultsData.data.data.filter(
                (res) => res.exchange_timezone === 'America/New_York'
            );
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

.dropdown {
    border: 2px solid rgb(35, 173, 35);
    position: absolute;
    max-height: 500px;
    overflow-y: auto;
    width: 60%;
    z-index: 1000000;
    transform: translateX(-25%);
    margin-top: 3px;
}

.display-item {
    border-bottom: 1px solid rgb(35, 173, 35);
    padding: 5px 8px;
    cursor: pointer;
    background: lightgray;
}

.display-item:last-child {
    border-bottom: none;
}

.display-item:hover {
    background: gray;
}

@media only screen and (min-width: 1000px) {
    .dropdown {
        width: 40%;
    }
}

@media only screen and (max-width: 767px) {
    .search-bar {
        flex-direction: column;
    }

    .dropdown {
        width: 100%;
        left: 0;
        transform: none;
        border: none;
    }

    .display-item:last-child {
        border-bottom: 1px solid rgb(35, 173, 35);
    }

    .display-item {
        font-size: 1.2rem;
    }
}
</style>
