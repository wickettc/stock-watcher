<template>
    <div id="nav">
        <div :class="['nav-content', openNavBar ? 'open-nav-content' : '']">
            <SearchBar class="item-searchbar" />
            <router-link @click="closeNav" class="item-stocklist" to="/"
                >Stock List</router-link
            >
            <router-link
                @click="closeNav"
                class="item-login"
                v-if="!showLoggedIn"
                to="/login"
                >Log In</router-link
            >
            <router-link
                @click="closeNav"
                class="item-profile"
                v-if="showLoggedIn"
                to="/profile"
                >Profile</router-link
            >
            <div
                class="log-out-btn item-logout"
                v-if="showLoggedIn"
                @click="[logout(), closeNav()]"
            >
                Log Out
            </div>
        </div>
        <div
            @click="handleNavBar"
            :class="['nav-hamburger', openNavBar ? 'change' : '']"
        >
            <div className="top-bar"></div>
            <div className="middle-bar"></div>
            <div className="bottom-bar"></div>
        </div>
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
        handleNavBar() {
            this.$store.commit('handleNavBar');
        },
        closeNav() {
            this.$store.commit('closeNavBar');
        },
    },
    computed: {
        ...mapState(['userProfile', 'openNavBar']),
        showLoggedIn: function() {
            return !_.isEmpty(this.userProfile);
        },
    },
};
</script>

<style scoped>
#nav {
    background: rgb(35, 173, 35);
    color: white;
    font-size: 1.3rem;
}

.nav-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
}

#nav a {
    color: white;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
}

#nav a:hover {
    color: rgb(32, 32, 32);
}

.log-out-btn {
    cursor: pointer;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
}

.log-out-btn:hover {
    color: rgb(32, 32, 32);
}

.nav-hamburger {
    display: none;
    cursor: pointer;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 4px;
    margin-right: 15px;
    z-index: 9000000;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.nav-hamburger div {
    width: 35px;
    height: 5px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
}

.change .top-bar {
    -webkit-transform: rotate(-45deg) translate(-8px, 8px);
    transform: rotate(-45deg) translate(-8px, 8px);
}

.change .middle-bar {
    opacity: 0;
}

.change .bottom-bar {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}

@media only screen and (max-width: 767px) {
    #nav {
        height: 47px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 100000;
        font-size: 1.2rem;
    }

    #nav a,
    .log-out-btn {
        transition: none;
    }

    .nav-hamburger {
        display: inline-block;
    }
    .nav-content {
        visibility: hidden;
        z-index: 1000;
    }

    .open-nav-content {
        visibility: visible;
        flex-direction: column;
        font-size: 1.7rem;
        background: rgb(35, 173, 35);
        transition: all 0.3s ease-in-out;
    }
    .item-profile {
        order: 2;
    }
    .item-stocklist {
        order: 1;
    }
    .item-login {
        order: 3;
    }
    .item-logout {
        order: 4;
    }
    .item-searchbar {
        order: 5;
    }
}
</style>
