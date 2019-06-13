<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-md-2">
                    <h2>User</h2>
                    <p v-html="user"></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                user: {}
            }
        },
        mounted () {
            this.getUser();
        },
        methods: {
            getUser(){
                this.user = this.$store.getters.user;  
            }
        },
    }
</script>
