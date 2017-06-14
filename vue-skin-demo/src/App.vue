<template>
    <div id="app">
        <!--<transition name="show">-->
        <router-view v-if="DONE_PAGE_SKIN"></router-view>
        <!--</transition>-->
        <!--页面加载-->
        <PageLoading v-show="!!DONE_PAGE_LOADING"></PageLoading>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import PageLoading from '@/components/common/PageLoading';

export default {
    name: 'app',
    data() {
        return {

        };
    },
    components: {
        PageLoading
    },
    computed: {
        ...mapGetters([types.DONE_PAGE_LOADING, types.DONE_PAGE_SKIN])
    },
    mounted() {
        this.$nextTick(() => {

        });
    },
    beforeMount() {
        // 获取企业状态
        this.loadTentantData();

        // 加载品类json配置列表
        this.$store.dispatch(types.FETCH_CATEGORY);

        // 匹配皮肤方案
        let pageSkin = {
            'sp38286086177000000': 'default',
            'sp38121728506000000': 'default',
            'sp53225560490000000': 'default',
            'sp52536526360000000': 'default',
            'sp48663686773000000': 'default',
            'sp54252488715000000': 'default',
            '121265185512782848': 'default',
            '121265185512782849': 'default',
            '121265185512782850': 'hella'
        };
        //设定皮肤方案
        this.$store.dispatch(types.FETCH_PAGE_SKIN, pageSkin[this.$route.query.tenantId || this.$route.params.tenantId]);
    },
    methods: {
        // 获取企业状态
        loadTentantData() {

            // 加载企业json列表
            this.$store.dispatch(types.FETCH_TENANT, () => {
                // 匹配当前企业ID
                this.$store.dispatch(types.FETCH_CURRENT_TENANT, {
                    tenantId: this.$route.query.tenantId || this.$route.params.tenantId,
                    brandId: this.$route.query.brandId || this.$route.params.brandId,
                    categoryId: this.$route.query.categoryId || this.$route.params.categoryId
                });
            });
        }


    }
};
</script>

<style>
#app {
    min-height: 100vh;
}
</style>
