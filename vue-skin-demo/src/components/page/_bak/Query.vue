<template>
    <div class="query"
         v-title
         data-title="产品数据查询">
        <h3 class="title"><span v-text="title" class="f36 text-center c6"></span></h3>
        <ul class="p-25">
            <li class="bg1 h200 m-b-25 br10 white text-center">
                <div class="p-t-59">
                    <span class="iconfont icon-biansuxiang f80 vm"></span> <span class="f36 vm">变速箱&emsp;</span>
                </div>
            </li>
            <li class="bg2 h200 m-b-25 br10 white text-center">
                <div class="p-t-59">
                    <span class="iconfont icon-chachepian f80 vm"></span> <span class="f36 vm">刹车片&emsp;</span>
                </div>
            </li>
            <li class="bg3 h200 m-b-25 br10 white text-center">
                <div class="p-t-59">
                    <span class="iconfont icon-fenlizhoucheng f80 vm"></span> <span class="f36 vm">分离轴承</span>
                </div>
            </li>
            <li class="bg4 h200 m-b-25 br10 white text-center">
                <div class="p-t-59">
                    <span class="iconfont icon-paiqiguan f80 vm"></span> <span class="f36 vm">排气管</span>
                </div>
            </li>
        </ul>
        <button type="button"
                v-on:click="submit"
                class="btn btn-primary">提交</button>
        <button type="button"
                v-on:click="submit"
                class="btn btn-primary btn-sm">提交</button>
        <button type="button"
                v-on:click="submit"
                class="btn btn-primary btn-lg">提交</button>

        <div class="row">
            <div class="col-xs-4">1</div>
            <div class="col-xs-4">2</div>
            <div class="col-xs-4">3</div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
// 全局配置
import ENV from '../../src/assets/js/env';

export default {
    name: 'query',
    data() {
        return {
            title: '请选择要查询的品类',
            list: ''
        };
    },
    mounted() {
        this.$nextTick(() => {
            const url = 'json/sopeiModel.json';
            this.$http.get(ENV.common + url).then((res) => {
                this.list = res.data;
                // this.listChange();
            }, (err) => {
                console.log(err);
            });

            //Toast demo
            Toast({
                message: '操作成功',
                iconClass: 'iconfont icon-biansuxiang f80',
                // position: 'bottom',
                duration: 1000
            });
        });
    },
    computed: {

    },
    methods: {
        // listChange() {
        //     this.$store.state.list = this.list;
        // },
        submit() {
            // this.$store.commit('showList');
            //MessageBox demo
            MessageBox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            }).then((action) => {
                console.log(1);
                console.log(action);
                console.log(this.list);
            });
        }
    }
};

</script>

<style lang="scss" scoped>
@import "../assets/css/config.scss";

h3.title span {
    display: block;
    position: relative;
}

h3.title span:before,
h3.title span:after {
    content: '';
    position: absolute;
    top: 51%;
    background: $color-D;
    width: $s180;
    height: $s1;
}

h3.title span:before {
    left: 0;
}

h3.title span:after {
    right: 0;
}

.bg1 {
    background-color: $color-34;
}

.bg2 {
    background-color: $color-blue;
}

.bg3 {
    background-color: $color-blue1;
}

.bg4 {
    background-color: $color-blue2;
}
</style>
