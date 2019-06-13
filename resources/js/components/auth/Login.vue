<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-md-2">
                    <div class="card">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="loginUser">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>         
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data: function(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            loginUser(){
                const user = {};
                user['email'] = this.email;
                user['password'] = this.password;
                this.$store.dispatch('loginUser', user).then((result) => {
                    this.$router.push({ name: 'home'})
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>
