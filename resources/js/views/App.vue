<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="#"><router-link :to="{ name: 'home' }">Home</router-link></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto"></ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item" v-if="isLoging">
                            <a class="nav-link" href="#"><router-link :to="{ name: 'login' }">Login</router-link></a>
                        </li>
                        <li class="nav-item" v-if="isLoging">
                            <a class="nav-link" href="#"><router-link :to="{ name: 'register' }">Register</router-link></a>
                        </li>
                        <li class="nav-item dropdown" v-if="!isLoging">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#"><router-link :to="{ name: 'user' }">User</router-link></a>
                                <a class="dropdown-item" href="#" v-if="isAdmin"><router-link :to="{ name: 'admin' }">Dashboard</router-link></a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" v-if="!isLoging" @click="logout()">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="py-4">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>
<script>
    import _ from 'lodash'
    export default {
        computed: {
            isLoging() {
                return _.isEmpty(this.$store.getters.user)
            },
            isAdmin() {
                let user = this.$store.getters.user;
                if(!_.isEmpty(user)){
                    return user.roles.includes('admin')
                }
                return false;  
            }
        },
        methods: {
            logout(){
                this.$store.dispatch('logoutUser');
                this.$router.push({name: 'home'});
            }
        }
    }
</script>

