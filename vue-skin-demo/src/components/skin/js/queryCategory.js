// import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import router from '@/router';
// import errCode from '@/assets/js/errCode';
// import ENV from '@/assets/js/env';

export default {
    name: 'queryCategory',
    data() {
        return {

        };
    },
    mounted() {
        this.$nextTick(() => {

        });
    },
    computed: {
        ...mapGetters([types.DONE_CURRENT_TENANT])
    },
    methods: {

        // 点击事件
        handleClick(state) {
            switch (state) {
            case 'modelSearch':
                this.routeTo('chooseFactory');
                break;
            case 'vinSearch':
                this.routeTo('searchVin');
                break;
            case 'codeSearch':
                this.routeTo('searchCode');
                break;
            }
        },

        // 跳转页面
        routeTo(url) {
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.query.tenantId,
                    brandId: this.$route.query.brandId,
                    categoryId: this.$route.query.categoryId
                }
            });
        }


    }
};
