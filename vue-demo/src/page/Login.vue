<template>
    <div>
        <!--<form class="login-form"
              novalidate
              @submit.stop.prevent="login">
            <md-input-container md-has-password>
                <label>Github Personal Token</label>
                <md-input type="password"
                          v-model="token"></md-input>

            </md-input-container>

        </form>
        <md-button href="https://github.com/settings/tokens/new"
                   target="_blank"
                   class="md-raised md-primary">generate your token</md-button>-->

        <form novalidate>
            <div class="form-group">
                <label>username</label>
                <input type="username" class="form-control" v-model="username" placeholder="username">
            </div>
            <div class="form-group">
                <label>password</label>
                <input type="password" class="form-control" v-model="password" placeholder="password">
            </div>
            <button type="button" class="btn btn-default" @click="login">Submit</button>
        </form>

    </div>
</template>

<script>
import env from '@/assets/js/env';
import * as types from '@/vuex/modules/soupei-types';
export default {
    name: '',
    data() {
        return {
            msg: '',
            username: '',
            password: ''
        };
    },
    mounted() {

    },
    methods: {
        login() {
            window.localStorage.setItem('user_access_token', 'Bearer d0ccb7e515b0b263b7b6a1fc50f8895ec93319ab');
            window.localStorage.setItem('user_refresh_token', 'Bearer 3f83beb9457b473317598548a7ea8151180e632a');
            window.localStorage.setItem('account_id', '7184709004050000');
            var token = {
                user_access_token: window.localStorage.getItem('user_access_token'),
                user_refresh_token: window.localStorage.getItem('user_refresh_token'),
                account_id: window.localStorage.getItem('account_id'),
            };
            this.$store.commit(types.LOGIN, token);
            let redirect = decodeURIComponent(this.$route.query.redirect || 'repository');
            this.$router.push({
                path: redirect
            });

            console.log(window.localStorage.getItem('user_access_token'));

            // var tData = {
            //     userName: this.username,
            //     password: this.password
            // };
            // this.$http.post(env.loginApi + 'login', tData)
            //     .then(res => {
            //         var result = res.data.result;
            //         if(res.data.code == 0){
            //             localStorage.user_access_token = result.user_access_token;
            //             localStorage.user_refresh_token = result.user_refresh_token;
            //             localStorage.account_id = result.account_id;
            //             console.log(localStorage);
            //             var loginInfo = {
            //                 user_access_token: result.user_access_token,
            //                 user_refresh_token: result.user_refresh_token,
            //                 account_id: result.account_id,
            //             };
            //             this.$store.commit(types.LOGIN, loginInfo);
            //             let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            //             this.$router.push({
            //                 path: redirect
            //             });
            //         }
            //     }).catch(err => {
            //         console.log(err);
            //     });
        }
    }
};
</script>


<style scoped lang='scss' rel="stylesheet/scss" type="text/css">

</style>
