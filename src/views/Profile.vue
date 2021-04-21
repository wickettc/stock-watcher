<template>
    <div class="profile">
        <h1>Welcome {{ userProfile.displayName }}</h1>
        <ul>
            <li v-for="(stock, i) in usersStocks" :key="i">{{ stock }}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Profile',
    computed: {
        ...mapState(['userProfile', 'usersStocks']),
    },
};
</script>
