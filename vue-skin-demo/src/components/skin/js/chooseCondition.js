import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import { Toast } from 'mint-ui';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';

export default {
    name: 'chooseCondition',
    data() {
        return {
            initObj: {},
            selects: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.pageInit();
        });
    },
    computed: {
        ...mapGetters([types.DONE_CURRENT_TENANT])
    },
    methods: {
        // 页面初始化
        pageInit() {
            let params = this.$route.params;
            let querys = this.$route.query;
            this.initObj = Object.assign(params, querys);
            // 获取品类下查询车型数据
            this.getSelectsFn();
        },
        // 获取品类下查询车型数据(年款、排量、变速箱描述 等 车型自有属性)
        getSelectsFn(params) {
            let queryParams = params ? params : '';
            let str = ENV.queryApi + 'column/' + this.initObj.tenantId + '/' +
                this.initObj.brandId + '/' + this.initObj.categoryId + '/' + this.initObj.cmModelId +
                queryParams;

            this.$http.get(str)
                .then((res) => {
                    if (res.data.code === 0) {

                        if (this.selects.length == 0) {
                            // 初始化
                            res.data.data.forEach((val) => {
                                val.queryActive = '';
                            });
                            this.selects = res.data.data;
                        } else {
                            // 替换select项
                            this.selects.forEach((val, key) => {
                                if (!val.queryActive) {
                                    let update = res.data.data[key];
                                    update.queryActive = '';
                                    this.selects.splice(key, 1, update);
                                }
                            });
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

        // 移除当前选择
        removeSelectFn(select) {
            select.queryActive = '';
            // 重新获取品类下查询车型数据
            this.getSelectsFn();
        },

        // 选择select菜单
        selectChange() {
            let str = '';
            this.selects.forEach((val) => {
                if(val.queryActive){
                    let n = str.indexOf('?') == -1 ? '?' : '&';
                    str += n + val.queryColumn + '=' + val.queryActive.cm_model_value_id;
                }
            });
            // 重新获取品类下查询车型数据
            this.getSelectsFn(str);
        },

        // 跳转页面
        routeTo(url) {
            // 获取查询参数
            let obj = {
                cmModelId: this.$route.query.cmModelId
            };
            this.selects.forEach((v) => {
                if(v.queryActive){
                    obj[v.queryColumn] = v.queryActive.cm_model_value_id;
                }
            });
            // 跳转页面
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.params.tenantId,
                    brandId: this.$route.params.brandId,
                    categoryId: this.$route.params.categoryId
                },
                query: obj
            });
        }
    }

};
