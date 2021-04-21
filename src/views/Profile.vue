<template>
    <div class="profile">
        <h1>Welcome {{ userProfile.displayName }}</h1>
        <h4>Manage Your Liked Stocks from Here!</h4>
        <ul>
            <li
                @click="handleClick(stock)"
                v-for="(stock, i) in usersStocks"
                :key="i"
            >
                {{ stock }} <StockStar :stockSymbol="stock" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import StockStar from '../components/StockStar';
export default {
    name: 'Profile',
    components: {
        StockStar,
    },
    computed: {
        ...mapState(['userProfile', 'usersStocks']),
    },
    methods: {
        handleClick(route) {
            this.$router.push(`/stock/${route}`);
        },
    },
};
</script>

<style scoped>
h1 {
    font-style: italic;
}

ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

li {
    border: 1px solid black;
    background: #e7e7e7;
    padding: 10px 15px;
    font-weight: 700;
    margin: 3px;
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

li:hover {
    background: rgb(35, 173, 35);
    border: 1px solid white;
    transform: scale(1.05);
}
</style>
