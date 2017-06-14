import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import router from '@/router';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Util from '@/assets/js/utility';

export default {
    name: 'searchVinList',
    data() {
        return {
            pageState: true,
            vinList: []
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
        ...mapGetters([types.DONE_CURRENT_TENANT, types.DONE_PAGE_SKIN])
    },
    methods: {
        // 请求VIN查询列表
        getVINCarlist() {
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
                    // 渲染数据
                    this.vinList = vinList;
                    // 设置列表显示状态
                    this.pageState = this.vinList.length ? true : false;
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

        // 跳转页面
        routeTo(url, item) {
            // 缓存详情数据
            this.$store.dispatch(types.FETCH_VIN_DETAIL, item);
            router.push({
                name: url,
                params: {
                    tenantId: this.$route.params.tenantId,
                    brandId: this.$route.params.brandId,
                    categoryId: this.$route.params.categoryId
                },
                query: {
                    searchCode: this.$route.query.searchCode,
                    cm_levelid: item.cm_levelid
                }
            });
        }

    }
};
