<template>
  <div class="search-bar">
      <label>Search for a stock:
        <input v-model="searchTerm" />
      </label>
      <SearchResults v-if="showSearchResults" :resultsData="searchResultsData" />
  </div>
</template>

<script>
import SearchResults from './SearchResults'
import _ from 'lodash'
import axios from 'axios'
let apiKey = process.env.VUE_APP_ALPHA_VANTAGE_API_KEY
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
      console.log(this.searchTerm)
      let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.searchTerm}&apikey=${apiKey}`
      let res = await axios.get(url);
      console.log(res)
      this.searchResultsData = res;
      this.showSearchResults = true;
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
