<template>
    <div class="dropdown">
            <ul>
                <li @click="handleSelect(res)" v-for="res in resultsData.data.bestMatches" :key="res['1. symbol']">{{res['1. symbol']}} -- {{res['2. name']}}</li>
            </ul>
        </div>
</template>

<script>
export default {
    name: 'SearchResults',
    props: {
        resultsData: Object,
    },
    data() {
        return {
            selected: {}
        }
    },
    methods: {
        handleSelect(results) {
            this.selected = results
            console.log(this.selected)
        }
    }
}
</script>

<style scoped>
.dropdown {
    position: relative;
    z-index: 1000;
}

ul {
    width: 100%;
    list-style: none;
    position: absolute;
    margin: 0;
}

li {
    border: 1px solid black;
    border-bottom: none;
    padding: 5px 8px;
    cursor: pointer;
}
li:last-child {
    border-bottom: 1px solid black;
}

li:hover {
    background: gray;
}
</style>