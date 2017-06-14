<template>
    <div v-title data-title="页面没有找到">
        <div class="text-center c6 notFound">
            <p><span class="iconfont icon-wangyediushi notFound-icon"></span></p>
            <p>页面被小怪兽吃掉了，找不到了...</p>
        </div>
        <div class="notFound-btn col-xs-10 col-xs-offset-1">
            <button type="button" class="btn btn-primary btn-block" v-on:click="routeTo()">返回查询页面</button>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import router from '@/router';


export default {
    name: 'notFound',
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters([types.DONE_CURRENT_TENANT])
    },
    methods: {
        // 跳转页面
        routeTo() {
            router.replace({
                path: 'query', query: {
                    tenantId: this.DONE_CURRENT_TENANT.tenantId,
                    brandId: this.DONE_CURRENT_TENANT.brandId,
                    categoryId: this.DONE_CURRENT_TENANT.categoryId
                }
            });
        }
    }
};

</script>

<style lang="scss" scoped>

@import "../../assets/css/config.scss";
.notFound{margin-top: $s100;}
.notFound-icon{font-size: $s200;}
.notFound-btn{margin-top: $s50;}

</style>

