import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import { Toast } from 'mint-ui';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Util from '@/assets/js/utility';

export default {
    name: 'chooseModel',
    data() {
        return {
            carModelList: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 获取车型列表
            this.getCarModelFn();
            // 监听页面滚动设置hellaBg
            if(this.DONE_PAGE_SKIN == 'hella'){
                Util.hellaBgScroll();
            }
        });
    },
    computed: {
        ...mapGetters([types.DONE_CURRENT_TENANT, types.DONE_PAGE_SKIN])
    },
    methods: {
        // 获取主机厂品牌列表
        getCarModelFn() {
            this.$http.get(ENV.queryApi + 'carmodel/' + this.$route.params.tenantId + '/' + this.$route.params.brandId + '/' + this.$route.params.categoryId + '/' + this.$route.query.cmBrandId)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.carModelList = res.data.data;
                    } else {
                        Toast({
                            message: errCode(res.data.code),
                            iconClass: 'iconfont icon-point f80'
                        });
                    }
                })
                .catch(() => {
                    Toast({
                        message: errCode(),
                        iconClass: 'iconfont icon-point f80'
                    });
                });
        },

        // 跳转页面
        routeTo(url, factory, model) {
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.params.tenantId,
                    brandId: this.$route.params.brandId,
                    categoryId: this.$route.params.categoryId
                },
                query: {
                    cmFactory: factory.cm_factory,
                    cmFactoryId: factory.cm_factory_id,
                    cmModel: model.cm_model,
                    cmModelId: model.cm_model_id,
                    cmBrandId: this.$route.query.cmBrandId,
                    cmBrand: this.$route.query.cmBrand
                }
            });
        }
    }

};
