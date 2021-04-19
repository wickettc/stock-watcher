<template>
    <div id="nav">
        <div class="log-out-btn" v-if="showLoggedIn" @click="logout()">
            Log Out
        </div>
        <router-link v-if="!showLoggedIn" to="/login">Log In</router-link>
        <router-link v-if="showLoggedIn" to="/profile">Profile</router-link>
        <router-link to="/">Stock List</router-link>
        <SearchBar />
    </div>
</template>

<script>
import SearchBar from './SearchBar';
import { mapState } from 'vuex';
import _ from 'lodash';
export default {
    name: 'Nav',
    components: {
        SearchBar,
    },

    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
    computed: {
        ...mapState(['userProfile']),
        showLoggedIn: function() {
            return !_.isEmpty(this.userProfile);
        },
    },
};
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    background: rgb(35, 173, 35);
    color: white;
    font-size: 1.3rem;
}

#nav a {
    color: white;
    text-decoration: none;
}

.log-out-btn {
    cursor: pointer;
}
</style>
