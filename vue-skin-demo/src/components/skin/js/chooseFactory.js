import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import { Toast } from 'mint-ui';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Util from '@/assets/js/utility';

export default {
    name: 'chooseFactory',
    data() {
        return {
            carBrandList: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 获取主机厂品牌列表
            this.getCarBrandFn();
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
        getCarBrandFn() {
            // 按车系排序
            function sortBySerial(x, y) {
                var sorter = {
                    '日韩车系': 0,
                    '欧美车系': 1,
                    '国产车系': 2,
                };
                return sorter[x.cm_brand_country] - sorter[y.cm_brand_country];
            }

            this.$http.get(ENV.queryApi + 'carbrand/' + this.$route.params.tenantId + '/' + this.$route.params.brandId + '/' + this.$route.params.categoryId)
                .then((res) => {
                    if (res.data.code === 0) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            let data = res.data.data[i];
                            data.len = 5;
                            data.moreText = '点击更多';
                            this.carBrandList.push(data);
                        }
                        // 按车系排序
                        this.carBrandList.sort(sortBySerial);
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

        // 切换显示数据
        filterItems(items) {
            if (items.len > 5) {
                items.len = 5;
                items.moreText = '点击更多';
            } else {
                items.len = items.list.length;
                items.moreText = '收起目录';
            }
        },

        // 跳转页面
        routeTo(url, brand) {
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.params.tenantId,
                    brandId: this.$route.params.brandId,
                    categoryId: this.$route.params.categoryId
                },
                query: {
                    cmBrandId: brand.cm_brand_id,
                    cmBrand: brand.cm_brand
                }
            });
        }
    }

};
