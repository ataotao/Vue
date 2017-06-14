import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import { Toast } from 'mint-ui';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Util from '@/assets/js/utility';

export default {
    name: 'queryList',
    data() {
        return {
            initObj: {},
            queryListData: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.pageInit();
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
        // 页面初始化
        pageInit() {
            // 启动页面加载状态
            this.$store.dispatch(types.FETCH_PAGE_LOADING, true);

            // 获取查询参数
            let params = this.$route.params;
            let querys = this.$route.query;
            this.initObj = Object.assign(params, querys);

            if(this.initObj.cmModelId){
                // 获取品类下查询车型数据
                this.getPartListFn();
            } else if(this.initObj.cm_levelid){
                // VIN关联产品查询
                this.getAssociatedListFn();
            } else if(this.initObj.part_sku_code) {
                // 编码查询
                this.getCodeListFn();
            }

        },

        // 获取车型查询结果
        getPartListFn() {
            let querys = this.$route.query;
            let queryParams = '';
            // 车型查询参数整理
            for (let k in querys) {
                if (k != 'cmModelId') {
                    let n = queryParams.indexOf('?') == -1 ? '?' : '&';
                    queryParams += n + k + '=' + querys[k];
                }
            }

            let str = ENV.queryApi + 'partlist/' + this.initObj.tenantId + '/' +
                this.initObj.brandId + '/' + this.initObj.categoryId + '/' + this.initObj.cmModelId +
                queryParams;

            // 请求接口
            this.getFn(str);
        },

        // 获取VIN关联产品查询结果
        getAssociatedListFn() {
            let str = ENV.queryApi + 'vin/partlist/' + this.initObj.tenantId + '/' +
                this.initObj.brandId + '/' + this.initObj.categoryId + '/' + this.initObj.cm_levelid;

            // 请求接口
            this.getFn(str);
        },

        // 获取编码查询结果
        getCodeListFn() {
            let str = ENV.queryApi + 'partcode/' + this.initObj.tenantId + '/' +
                this.initObj.brandId + '/' + this.initObj.categoryId + '/' + this.initObj.part_sku_code;
            // 请求接口
            this.getFn(str);
        },

        getFn(str) {
            this.$http.get(str)
                .then((res) => {
                    if (res.data.code === 0) {
                        if(!this.queryListData){
                            this.queryListData = res.data.data;
                        }
                        // 移除页面加载状态
                        this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                    } else {
                        Toast({
                            message: errCode(res.data.code),
                            iconClass: 'iconfont icon-point f80'
                        });
                        // 移除页面加载状态
                        this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    Toast({
                        message: errCode(),
                        iconClass: 'iconfont icon-point f80'
                    });
                    // 移除页面加载状态
                    this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                });
        },

        // 过滤配件sku名称显示
        filterPartSkuName(categoryName, partSkuName){
            if(categoryName.indexOf('变速箱') != -1){
                return '';
            }else{
                return partSkuName;
            }
        },

        // 跳转页面
        routeTo(url, item) {
            // 构造查询参数
            let detail = item.carmodel_detail;
            let obj = {
                part_sku_ids: item.part_sku_ids
            };
            for (let k in detail) {
                obj[k] = detail[k].carmodel_val_value;
            }
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
