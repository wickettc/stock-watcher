<template>
  <div class="search-bar">
      <label>Search for a stock:
        <input v-model="searchTerm" />
      </label>
      <SearchResults @close-search-dropdown="handleSelected" v-if="showSearchResults" :resultsData="searchResultsData" />
  </div>
</template>

<script>
import store from '../store'
import SearchResults from './SearchResults'
import _ from 'lodash'
import {callGetSymbol} from '../api/alphaVantageCalls'
export default {
  name: 'SearchBar',
  components: {
    SearchResults
  },
  created() {
    this.debouncedGetSymbol = _.debounce(this.getSymbol, 750)
  },
  data() {
    return {
      searchTerm: '',
      searchResultsData: {},
      showSearchResults: false
    }
  },
  methods: {
    async getSymbol() {
      let res = await callGetSymbol(this.searchTerm)
      this.searchResultsData = res;
      this.showSearchResults = true;
    },
    handleSelected(selected) {
        this.showSearchResults = false
        this.searchTerm = ''
        store.commit('updateStockPage', selected)
        console.log(store.state.stockPage)
    }
  },
  watch: {
    searchTerm: function() {
      this.debouncedGetSymbol()
    }
  }

}
</script>

<style scoped>
input {
    padding: 10px 10px;
}
</style>
