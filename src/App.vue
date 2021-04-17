<template>
    <Nav />
    <router-view />
</template>

<script>
import store from './store';
import Nav from './components/Nav';

console.log(store.state);

export default {
    name: 'App',
    components: {
        Nav,
    },
};
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
    background: rgb(209, 202, 202);
}
.bold {
    font-weight: 700;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.loader {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 20px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    border-top-color: rgb(35, 173, 35);
    animation: spin 1.5s ease-in-out infinite;
    -webkit-animation: spin 1.5s ease-in-out infinite;
}
@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: green;
}

::-webkit-scrollbar-thumb {
    background: rgb(35, 173, 35);
}

::-webkit-scrollbar-thumb:hover {
    background: gray;
}
</style>
