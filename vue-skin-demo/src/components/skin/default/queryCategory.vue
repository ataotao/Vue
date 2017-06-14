<template>
    <div v-title data-title="商品云查询">

        <h1 class="text-center logo-box">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!-- 品类数量 == 1 -->
        <ul class="p-25">
            <li class="m-b-25 br10 white parent query-bg1"
            v-bind:class="{'h300': $route.query.categoryName == '变速箱', 'h200': $route.query.categoryName != '变速箱'} "
            v-on:click="handleClick('modelSearch')">
                <span class="iconfont icon-chexing1 minicon"></span>
                <span class="iconfont icon-chexing1 maxicon"></span>
                <span class="m-l-5 f36 category-text-box">按车型查询</span>
            </li>
            <li class="m-b-25 br10 white parent query-bg2"
            v-bind:class="{'h300': $route.query.categoryName == '变速箱', 'h200': $route.query.categoryName != '变速箱'} "
            v-on:click="handleClick('vinSearch')">
                <span class="iconfont icon-VIN minicon"></span>
                <span class="iconfont icon-VIN maxicon"></span>
                <span class="m-l-5 f36 category-text-box">按VIN查询</span>
            </li>
            <li class="m-b-25 br10 white parent query-bg3"
            v-bind:class="{'h300': $route.query.categoryName == '变速箱', 'h200': $route.query.categoryName != '变速箱'} "
            v-on:click="handleClick('codeSearch')"
            v-if="$route.query.categoryName != '变速箱'">
                <span class="iconfont icon-bianma1 minicon"></span>
                <span class="iconfont icon-bianma1 maxicon"></span>
                <span class="m-l-5 f36 category-text-box">按编码查询</span>
            </li>
        </ul>

    </div>
</template>

<script>
import pageSet from '../js/queryCategory';

export default {
    name: 'queryCategory',
    data: pageSet.data,
    mounted: pageSet.mounted,
    computed: pageSet.computed,
    methods: pageSet.methods
};

</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";

.parent {
    display: flex; // justify-content: center;
    align-items: center;
    padding-left: $s210;
    position: relative;
    overflow: hidden;
}

.category-text-box {
    min-width: $s200;
}

.category-list-line {
    background-color: $color-F;
    margin-top: $s35;
    border-top: solid 1px $color-C;
    border-bottom: solid 1px $color-C;
    padding-left: $s25;
    padding-right: $s25;
}

.category-list-box {
    border-bottom: solid 1px $color-C;
    padding-top: $s25;
    padding-bottom: $s25;
    margin-bottom: -1px;
}

.maxicon {
    position: absolute;
    font-size: $s300;
    right: -$s70;
    top: 0;
    opacity: 0.1;
}

.minicon {
    border-radius: 50%;
    background-color: $color-F;
    color: $color-blue;
    font-size: $s80;
    margin-right: $s10;
    padding: $s10;
}

.logo-box {
    background-color: $color-F;
    padding-top: $s10;
    padding-bottom: $s10;
    margin: 0;
}

.logo {
    width: $s320;
    height: $s320;
}

.query-bg1 {
    background-color: $color-34;
}

.query-bg2 {
    background-color: $color-blue;
}

.query-bg3 {
    background-color: $color-blue1;
}

.query-bg4 {
    background-color: $color-blue2;
}
</style>
