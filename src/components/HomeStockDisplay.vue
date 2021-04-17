<template>
    <div>{{ stockInfo.name }} -- {{ stockInfo.symbol }}</div>
</template>

<script>
export default {
    name: 'HomeStockDisplay',
    props: {
        stockInfo: Object,
    },
};
</script>

<style scoped>
div {
    border: 1px solid black;
    width: 50%;
    padding: 15px;
    margin: 2px;
}
</style>
