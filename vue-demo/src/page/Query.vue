<template>
    <div class="Query" v-title data-title="产品数据查询">
        <h3 class="title"><span v-text="title" class="f36 text-center c6"></span></h3>
        <ul>
            <li v-for="(item, index) in list">
                <div v-text="item"></div>
            </li>
        </ul>
        <ul class="p-25">
            <li class="query-bg1 h200 m-b-25 br10 white parent">
                <span class="iconfont icon-biansuxiang f80"></span> <span class="m-l-5 f36">变速器</span>
            </li>
            <li class="query-bg2 h200 m-b-25 br10 white parent">
                <span class="iconfont icon-chachepian f80"></span> <span class="m-l-5 f36">刹车片</span>
            </li>
            <li class="query-bg3 h200 m-b-25 br10 white parent">
                <span class="iconfont icon-fenlizhoucheng f80"></span> <span class="m-l-5 f36">分离轴承</span>
            </li>
            <li class="query-bg4 h200 m-b-25 br10 white parent">
                <span class="iconfont icon-paiqiguan f80"></span> <span class="m-l-5 f36">排气管</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Query',
    data() {
        return {
            title: '请选择要查询的品类',
            list: ''
        };
    },
    mounted() {
        this.$nextTick(() => {

        });
    },
    computed: {

    },
    methods: {

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

.parent{
    display: flex;
    // justify-content: center;
    align-items: center;
    padding-left: $s210;
}
</style>
