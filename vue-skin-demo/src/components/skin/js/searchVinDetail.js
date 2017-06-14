import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Util from '@/assets/js/utility';

export default {
    name: 'searchVinDetail',
    data() {
        return {
            viewstatus:false
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 请求VIN查询列表
            this.getVINCarlist();
            // 监听页面滚动设置hellaBg
            if(this.DONE_PAGE_SKIN == 'hella'){
                Util.hellaBgScroll();
            }
        });
    },
    computed: {
        ...mapGetters([types.DONE_CURRENT_TENANT, types.DONE_PAGE_SKIN, types.DONE_VIN_DETAIL])
    },
    methods: {
        // 请求VIN查询列表
        getVINCarlist() {
            this.detailData = {};

            // 无缓存数据（重新拉取）
            if( Util.isEmptyObject(this.DONE_VIN_DETAIL.cm_brand) ){
                // 启动页面加载状态
                this.$store.dispatch(types.FETCH_PAGE_LOADING, true);

                this.$http.get(ENV.queryApi + 'vin/carlist/' + this.$route.params.tenantId + '/' + this.$route.params.brandId + '/' + this.$route.params.categoryId + '/' + this.$route.query.searchCode)
                    .then((res) => {
                        if (res.data.code === 0) {
                            // 附加关联标识
                            this.getLevelId(res.data.data.carModelList);
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
                        Toast({
                            message: errCode(e),
                            iconClass: 'iconfont icon-point f80'
                        });
                        // 移除页面加载状态
                        this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                    });
            }

        },

        // 获取当前选中的vin数据
        getCurrentVIN(array) {
            for(var i = 0, len = array.length; i < len; i++) {
                if(array[i].cm_levelid == this.$route.query.cm_levelid) {
                    this.$store.dispatch(types.FETCH_VIN_DETAIL, array[i]);
                    break;
                }
            }
        },

        // 获取cm_levelid请求关联产品的标识
        getLevelId(vinList){
            // 构造关联ID请求
            let fnArr = [];
            for (let i = 0; i < vinList.length; i++) {
                let str = ENV.queryApi + 'vin/partlist/' + this.$route.params.tenantId + '/' + this.$route.params.brandId + '/' + this.$route.params.categoryId + '/' + vinList[i].cm_levelid;
                fnArr.push(str);
            }

            let requests = fnArr.map((url)=> {
                return this.$http.get(url);
            });

            this.$http.all(requests)
                .then(this.$http.spread((...args)=> {
                    // 构造关联标识数据
                    args.forEach((v, k)=> {
                        if(v.data.code == 0 && v.data.data[0]){
                            vinList[k].carmodel_detail= v.data.data[0].carmodel_detail;
                        }
                    });
                    // 获取当前VIN查询详情
                    this.getCurrentVIN(vinList);
                    // 移除页面加载状态
                    this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                })).catch((e) => {
                    Toast({
                        message: errCode(e),
                        iconClass: 'iconfont icon-point f80'
                    });
                    // 移除页面加载状态
                    this.$store.dispatch(types.FETCH_PAGE_LOADING, false);
                });
        },

        // 点击展开更多 / 收起
        viewMore() {
            this.viewstatus = !this.viewstatus;
        },

        // 点击查看关联产品
        routeTo(url) {
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.params.tenantId,
                    brandId: this.$route.params.brandId,
                    categoryId: this.$route.params.categoryId
                },
                query: {
                    cm_levelid: this.$route.query.cm_levelid
                }
            });
        }
    }
};
