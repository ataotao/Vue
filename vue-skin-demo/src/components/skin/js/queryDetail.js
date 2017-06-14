import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';
import { Toast } from 'mint-ui';
import errCode from '@/assets/js/errCode';
import ENV from '@/assets/js/env';
import Wechat from '@/assets/js/wechat';
import Util from '@/assets/js/utility';

export default {
    name: 'queryDetail',
    data() {
        return {
            initObj: {},
            data: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            // 页面初始化
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
            // 获取查询参数
            let params = this.$route.params;
            let querys = this.$route.query;
            this.initObj = Object.assign(params, querys);
            // 获取查询详情
            this.getPartDetail();
        },

        // 获取查询详情
        getPartDetail() {
            let str = ENV.queryApi + 'partdetail/' + this.$route.params.tenantId + '/' + this.$route.params.brandId + '?partskuid=' + this.$route.query.part_sku_ids;
            this.$http.get(str)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.data = this.handleImages(res.data.data);
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

        // 处理图片数据
        handleImages(data) {
            data.forEach((val) => {

                val.partsku_pro_list.forEach((v) => {
                    if (v.category_pro_type == 3 && v.category_val_value != '') {
                        v.imgList = [];
                        let x = v.category_val_value.split(',');
                        x.forEach((url) => {
                            // 这里配置为PC端放大图设置 src w h
                            v.imgList.push({
                                src: url,
                                w: 650,
                                h: 650
                            });
                        });
                        v.len = 1;
                    }
                });

            });
            return data;
        },

        // 查看更多图片
        viewImgMore(items) {
            items.len = items.len == 1 ? items.imgList.length : 1;
        },

        // 点击放大图片
        previewImage(arraySrc, index) {
            if (Wechat.wxLogin) {
                let arr = [];
                arraySrc.forEach((v) => {
                    arr.push(v.src);
                });
                // 微信登录浏览图片
                Wechat.wxPreviewImage(arraySrc[index].src, arr);
            } else {
                // PC端图片预览
                this.$preview.open(index, arraySrc);
            }
        }

    }
};
