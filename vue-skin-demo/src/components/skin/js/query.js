import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';

export default {
    name: 'query',
    data() {
        return {
            categoryList: null,
            pageState: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 加载品类数据
            this.getCategoryFn();
        });
    },
    computed: {
        ...mapGetters([types.DONE_CATEGORY, types.DONE_CURRENT_TENANT])
    },
    methods: {
        // 加载品类数据
        getCategoryFn() {
            this.$http.get(ENV.queryApi + 'category/' + this.$route.query.tenantId + '/' + this.$route.query.brandId)
                .then((res) => {
                    // res.data.data = [
                    //     {
                    //         category_code: '1_luqingqi',
                    //         category_id: '121286189781908480',
                    //         category_level: 1,
                    //         category_name: '滤清器'
                    //     },{
                    //         category_code: '1_biansuxiang',
                    //         category_id: '121053092075305984',
                    //         category_level: 1,
                    //         category_name: '变速箱'
                    //     },{
                    //         category_code: '1_xianguabaibi',
                    //         category_id: '1603010012',
                    //         category_level: 1,
                    //         category_name: '悬挂摆臂'
                    //     },{
                    //         category_code: '1_yugua',
                    //         category_id: '1603010011',
                    //         category_level: 1,
                    //         category_name: '雨刮'
                    //     },{
                    //         category_code: '1_shachepian',
                    //         category_id: '121052951968775168',
                    //         category_level: 1,
                    //         category_name: '刹车片'
                    //     }
                    // ];
                    if (res.data.code === 0) {
                        if (res.data.data.length == 1) {
                            // 直接跳转品类查询页面
                            router.replace({
                                path: 'queryCategory',
                                query: {
                                    tenantId: this.$route.query.tenantId,
                                    brandId: this.$route.query.brandId,
                                    categoryId: res.data.data[0].category_id,
                                    categoryName: res.data.data[0].category_name
                                }
                            });
                        } else if (res.data.data.length > 1 && res.data.data.length <= 4) {
                            // 品类数量 <= 4
                            this.categoryList = res.data.data;
                            // 配置图标
                            this.iconConfig(this.categoryList);
                            // 页面状态
                            this.pageState = 0;
                        } else {
                            // 品类数量 > 4
                            let initData = res.data.data;
                            this.categoryList = [];
                            // 配置图标
                            this.iconConfig(initData);
                            // 重新构造数据
                            this.splicListFn(initData);
                            // 页面状态
                            this.pageState = 1;
                        }

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

        // 根据品类json文件，配置图标
        iconConfig(categoryList) {
            for (let i = 0; i < categoryList.length; i++) {
                for (let j = 0; j < this.DONE_CATEGORY.length; j++) {
                    if (categoryList[i].category_id == this.DONE_CATEGORY[j].category_id) {
                        categoryList[i].category_icon = this.DONE_CATEGORY[j].category_icon;
                    }
                }
            }
        },

        // 品类数量 > 4 重新构造数据
        splicListFn(initData) {
            let len = 5;
            let n = 0;
            for (let i = 0; i < initData.length; i++) {
                if (i <= len) {
                    if (!this.categoryList[n]) {
                        this.categoryList[n] = [];
                    }
                    this.categoryList[n].push(initData[i]);
                    if (i % len == 0 && i > 0) {
                        n++;
                        len += 6;
                    }
                }
            }
        },

        // 跳转页面
        routeTo(url, item) {
            router.push({
                name: url,
                query: {
                    tenantId: this.$route.query.tenantId,
                    brandId: this.$route.query.brandId,
                    categoryId: item.category_id,
                    categoryName: item.category_name
                }
            });
        }

    }
};
