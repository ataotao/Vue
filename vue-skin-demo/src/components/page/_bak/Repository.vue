<template>
    <div>
        <a v-on:click="logout" class="btn btn-default">logout</a>
        <div v-for="repo in list">
            <div>{{repo}}</div>
        </div>
    </div>
</template>

<script>
import ENV from '@/assets/js/env';
import * as types from '@/vuex/modules/soupei-types';
// import { mapState } from 'vuex';

export default {
    name: '',
    data() {
        return {
            list: []
        };
    },
    mounted() {
        this.getRepository();
    },

    methods: {
        getRepository() {
            this.$http.get(ENV.buyerApi + 'walletinfo')
                .then(res => {
                    if(res.data.code == 0){
                        this.list = res.data.result;
                    }
                });
        },
        logout(){
            this.$store.commit(types.LOGOUT);
            this.$router.push({
                path: '/'
            });
        }
    }
};
</script>

<style lang='scss' scoped>

</style>
