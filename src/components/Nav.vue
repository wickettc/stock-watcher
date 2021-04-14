<template>
    <div id="nav">
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
        <SearchBar />
  </div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
    name: 'Nav',
    components: {
        SearchBar
    }
}
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>