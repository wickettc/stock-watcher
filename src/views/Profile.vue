<template>
    <div class="profile">
        <h1>Welcome {{ userProfile.displayName }}</h1>
        <h4>Manage Your Liked Stocks from Here!</h4>
        <ul>
            <li v-for="(stock, i) in usersStocks" :key="i">
                <span @click="handleClick(stock)">{{ stock }}</span>
                <StockStar :stockSymbol="stock" />
            </li>
            <div class="instructions-text" v-if="usersStocks.length === 0">
                <p>Thank you {{ userProfile.displayName }} for signing up!</p>
                <br />
                <p>
                    Either select a stock from the stock list or look one up by
                    name/symbol through the search bar.
                </p>
                <p>
                    If you want to follow the stock and add it to your profile
                    page, just click the white star in the upper left hand
                    corner!
                </p>
            </div>
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
.profile {
    text-align: center;
}

h1 {
    font-style: italic;
}

ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0;
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
    box-shadow: 8px 8px 10px rgba(92, 91, 91, 0.836);
}

.instructions-text {
    margin: 0 5%;
    font-weight: 600;
    border: 1px solid black;
    padding: 1% 5%;
    background: #e7e7e7;
    border-radius: 5%;
    box-shadow: 8px 8px 10px rgba(92, 91, 91, 0.836);
}

span {
    transition: all 0.2s ease-in-out;
}

span:hover {
    color: rgb(35, 173, 35);
    cursor: pointer;
    transform: scale(1.05);
}
</style>
