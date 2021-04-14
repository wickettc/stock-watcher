<template>
    <div class="stock">
        <h1>stock page</h1>
        <div>{{ $route.params }}</div>
    </div>
</template>

<script>
import { callGetStock } from '../api/alphaVantageCalls';
export default {
    name: 'Stock Page',
    components: {},
    async created() {
        console.log(this.$route.params.symbol);
        let res = await callGetStock(this.$route.params.symbol);
        console.log(res);
    },
};
</script>
