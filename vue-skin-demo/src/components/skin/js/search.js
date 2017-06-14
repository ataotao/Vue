import { Toast } from 'mint-ui';
import router from '@/router';
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';

export default {
    name: 'search',
    data() {
        return {
            vinCode: '',
            partskuCode: ''
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
        // 处理VIN字母显示形式
        vinInputFn() {
            let text = this.filterVin(this.vinCode);
            if (text) {
                var list = [],
                    i = 0,
                    j = 4;
                while (i < text.length) {
                    if (i < j * 3) {
                        list.push(text.substr(i, j));
                        i += j;
                    } else {
                        list.push(text.substr(i));
                        break;
                    }
                }
                this.vinCode = list.join('-').toUpperCase();
            }
        },

        // vin码去除-符、空格和中文字符
        filterVin(vin) {
            return vin.replace(/-|(^\s+)|(\s+$)|[^\x00-\xff]/g, '');
        },

        // 处理编码查询字母大写
        partskuCodeInputFn() {
            this.partskuCode = this.partskuCode.toUpperCase();
        },

        // 搜索
        searchFn(str) {

            if (str == 'searchVin') {
                // 按VIN查询
                let code = this.filterVin(this.vinCode);
                if (code.length == 17) {
                    this.routeTo('searchVinList', code);
                    // 数据上报
                    try {
                        TDAPP.onEvent('数据查询', 'VIN码查询');
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    Toast({
                        message: '请正确输入字符',
                        iconClass: 'iconfont icon-point f80'
                    });
                    this.vinCode = '';
                }

            } else {
                // 按编码查询
                this.routeTo('queryList', this.partskuCode);
                // 数据上报
                try {
                    TDAPP.onEvent('数据查询', '编码查询');
                } catch (error) {
                    console.log(error);
                }
            }
        },

        // 跳转页面
        routeTo(url, code) {
            let obj = url == 'searchVinList' ?
                { searchCode: code } :
                { part_sku_code: code };

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
