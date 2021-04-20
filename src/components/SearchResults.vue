<template>
    <div class="dropdown">
        <ul>
            <li
                @click="handleSelect(res)"
                v-for="(res, i) in usaResults"
                :key="Math.random() * i * 100000000"
            >
                {{ res.instrument_name }} -- {{ res.symbol }}
            </li>
            <li v-if="usaResults.length === 0">No Results Found</li>
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
            selected: {},
        };
    },
    methods: {
        handleSelect(results) {
            this.selected = results;
            this.$emit('close-search-dropdown', this.selected);
        },
    },
    computed: {
        usaResults() {
            return this.resultsData.data.data.filter(
                (res) => res.exchange_timezone === 'America/New_York'
            );
        },
    },
};
</script>

<style scoped>
.dropdown {
    display: block;
    width: 60%;
    top: 46px;
    position: absolute;
    z-index: 1000;
}

ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    border: 1px solid black;
    border-bottom: none;
    padding: 5px 8px;
    cursor: pointer;
    background: lightgray;
}
li:last-child {
    border-bottom: 1px solid black;
}

li:hover {
    background: gray;
}

@media only screen and (max-width: 767px) {
    .dropdown {
        top: 175px;
        width: 100%;
        left: 0;
    }
}
</style>
