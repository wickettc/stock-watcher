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
            <label for="email"
                >Email:
                <input
                    type="email"
                    v-model.trim="signupForm.email"
                    name="email"
                />
            </label>
            <label for="firstname"
                >First Name:
                <input
                    type="firstname"
                    v-model.trim="signupForm.firstname"
                    name="First Name"
                />
            </label>
            <label for="lastname"
                >Last Name:
                <input
                    type="lastname"
                    v-model.trim="signupForm.lastname"
                    name="Last Name"
                />
            </label>
            <label for="password"
                >Password:
                <input
                    type="password"
                    v-model.trim="signupForm.password"
                    name="Password"
                />
            </label>
            <label for="confirmpassword"
                >Confirm Password:
                <input
                    type="password"
                    v-model.trim="signupForm.confirmpassword"
                    name="Confirm Password"
                />
            </label>
            <button>Sign Up</button>
        </form>
        <form
            @submit.prevent="login()"
            id="login-form"
            :class="showLogin ? '' : 'hide-form'"
        >
            <label for="email"
                >Email:
                <input
                    type="email"
                    v-model.trim="loginForm.email"
                    name="email"
                />
            </label>
            <label for="password"
                >Password:
                <input
                    type="password"
                    v-model.trim="loginForm.password"
                    name="Password"
                />
            </label>
            <button>Log In</button>
        </form>
    </div>
</template>

<script>
import store from '../store';
export default {
    name: 'Login',
    data() {
        return {
            showLogin: true,
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
        };
    },
    methods: {
        handleShowLogin() {
            this.showLogin = true;
        },
        handleShowSignUp() {
            this.showLogin = false;
        },
        login() {
            store.dispatch('login', {
                email: this.loginForm.email,
                password: this.loginForm.password,
            });
        },
        signup() {
            store.dispatch('signup', {
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
.btn-container {
    margin: 20px 0;
}

.btn-container button {
    padding: 8px 10px;
    border: 1px solid black;
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
    border: 1px solid black;
    padding: 30px 15px;
    border-radius: 25%;
}

form label {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 3px;
}

form input {
    width: 60%;
    flex: 1;
    margin-left: 5px;
    text-align: right;
}

form button {
    width: 30%;
}

.selected-btn {
    background: rgb(35, 173, 35);
}
</style>
