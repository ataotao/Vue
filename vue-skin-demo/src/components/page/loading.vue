<template>
    <div class="Loading" v-title data-title="页面加载中">

    </div>
</template>

<script>
import router from '@/router';
import * as types from '@/vuex/modules/soupei-types.js';
export default {
    name: 'Loading',
    data() {
        return {

        };
    },
    mounted() {
        this.$nextTick(() => {
            // 启动页面加载状态
            this.$store.dispatch(types.FETCH_PAGE_LOADING, true);
            setTimeout(()=> {
                // 启动页面加载状态
                this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                router.replace({
                    path: 'query', query: {
                        tenantId: this.$route.query.tenantId,
                        brandId: this.$route.query.brandId,
                        categoryId: this.$route.query.categoryId
                    }
                });
            }, 500);
        });
    }
};

</script>

<style lang="scss" scoped>

</style>
