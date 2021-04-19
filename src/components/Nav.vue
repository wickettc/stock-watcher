<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/profile">Profile</router-link>
        <SearchBar />
    </div>
</template>

<script>
import SearchBar from './SearchBar';
export default {
    name: 'Nav',
    components: {
        SearchBar,
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
</style>
