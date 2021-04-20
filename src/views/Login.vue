<template>
    <h1>Log In to Your Stock Watcher Account!</h1>
    <div class="btn-container">
        <button
            @click="handleShowLogin"
            :class="showLogin ? 'selected-btn' : ''"
        >
            Log In
        </button>
        <button
            @click="handleShowSignUp"
            :class="showLogin ? '' : 'selected-btn'"
        >
            Sign Up
        </button>
    </div>
    <div class="form-container">
        <form
            id="signup-form"
            @submit.prevent="signup()"
            :class="showLogin ? 'hide-form' : ''"
        >
            <label for="email">Email: </label>
            <input type="email" v-model.trim="signupForm.email" name="email" />
            <label for="firstname">First Name: </label>
            <input
                type="firstname"
                v-model.trim="signupForm.firstname"
                name="First Name"
            />
            <label for="lastname">Last Name: </label>
            <input
                type="lastname"
                v-model.trim="signupForm.lastname"
                name="Last Name"
            />
            <label for="password">Password: </label>
            <input
                type="password"
                v-model.trim="signupForm.password"
                name="Password"
            />
            <label for="confirmpassword">Confirm Password: </label>
            <input
                type="password"
                v-model.trim="signupForm.confirmpassword"
                name="Confirm Password"
            />
            <button v-if="!loading">Sign Up</button>
            <div class="loader" v-if="loading"></div>
        </form>
        <form
            @submit.prevent="login()"
            id="login-form"
            :class="showLogin ? '' : 'hide-form'"
        >
            <label for="email">Email: </label>
            <input type="email" v-model.trim="loginForm.email" name="email" />
            <div class="error">{{ loginFormErrors.email }}</div>
            <label for="password">Password: </label
            ><input
                type="password"
                v-model.trim="loginForm.password"
                name="Password"
            />
            <div class="error">{{ loginFormErrors.password }}</div>
            <div class="loader" v-if="loading"></div>
            <button v-if="!loading">Log In</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            showLogin: true,
            loading: false,
            loginForm: {
                email: '',
                password: '',
            },
            signupForm: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmpassword: '',
            },
            // loginError: this.$store.state.loginError,
            loginFormErrors: {
                email: '',
                password: '',
            },
            signupFormErrors: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmpassword: '',
            },
        };
    },
    computed: {
        loginError() {
            return this.$store.state.loginError;
        },
    },
    watch: {
        loginError: function() {
            this.loading = false;
            if (this.loginError.code === 'auth/user-not-found') {
                this.loginFormErrors.email = 'Incorrect Email';
            } else if (this.loginError.code === 'auth/wrong-password') {
                this.loginFormErrors.password = 'Incorrect Password';
            } else {
                this.loginFormErrors.password =
                    'Something went wrong, please try again';
            }
        },
    },
    methods: {
        handleShowLogin() {
            this.showLogin = true;
        },
        handleShowSignUp() {
            this.showLogin = false;
        },
        login() {
            this.loading = true;
            this.$store.dispatch('login', {
                email: this.loginForm.email,
                password: this.loginForm.password,
            });
        },
        signup() {
            this.loading = true;
            this.$store.dispatch('signup', {
                email: this.signupForm.email,
                firstname: this.signupForm.firstname,
                lastname: this.signupForm.lastname,
                password: this.signupForm.password,
                confirmpassword: this.signupForm.confirmpassword,
            });
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
}
.btn-container {
    margin: 20px 0;
}

.btn-container button {
    padding: 8px 10px;
    border: 1px solid black;
    font-weight: 700;
}

.btn-container button:last-of-type {
    margin-left: 5px;
}

.hide-form {
    display: none;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    border: 2px solid black;
    background: rgb(219, 219, 219);
    padding: 30px 15px;
    border-radius: 5%;
    box-shadow: 8px 8px 5px rgba(110, 110, 110, 0.37);
}

form label {
    width: 100%;
    margin: 5px 0;
}

form input {
    width: 60%;
    padding: 10px 15px;
    text-align: center;
}

form button {
    margin-top: 5px;
    width: 30%;
    border: 1px solid black;
    background: white;
    padding: 10px 12px;
    font-weight: 700;
    transition: all 0.3s ease-in-out;
}

form button:hover {
    background: rgb(35, 173, 35);
    transform: scale(1.05);
    border: 1px solid white;
}

.selected-btn {
    background: rgb(35, 173, 35);
}

.loader {
    height: 25px;
    width: 25px;
}

@media only screen and (min-width: 1000px) {
    form {
        width: 25%;
    }
}
</style>
