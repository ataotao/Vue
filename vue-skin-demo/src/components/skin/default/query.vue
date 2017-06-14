<template>
    <div v-title data-title="商品云查询">

        <h1 class="text-center logo-box">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!-- 品类数量 <= 4 -->
        <ul class="p-25" v-if="pageState == 0">
            <li class="h200 m-b-25 br10 white parent" v-bind:class="'query-bg' + (index + 1)" v-for="(item, index) in categoryList" v-on:click="routeTo('gotoSearch', item)">
                <span class="iconfont minicon" v-bind:class="item.category_icon"></span>
                <span class="iconfont maxicon" v-bind:class="item.category_icon"></span>
                <span class="m-l-5 f36 category-text-box" v-text="item.category_name"></span>
            </li>
        </ul>

        <!-- 品类数量 > 4 -->
        <div v-if="pageState == 1">
            <ul class="clearfix category-list-line" v-for="categorys in categoryList" track-by="$index">
                <li class="col-xs-4 text-center category-list-box" v-for="category in categorys" track-by="$index" v-on:click="routeTo('gotoSearch', category)">
                    <span class="iconfont f80 blue3" v-bind:class="category.category_icon"></span>
                    <div class="f30 category-list-name m-t-15" v-text="category.category_name"></div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import pageSet from '../js/query';

export default {
    name: 'query',
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
