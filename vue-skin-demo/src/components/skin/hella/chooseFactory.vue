<template>
    <div class="p-15" v-title data-title="选择品牌">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--title-->
        <div class="bg-F1-15"></div>
        <div class="title-badge"><span>选择品牌</span></div>

        <div class="clearfix p-15" v-for="items in carBrandList">
            <div class="col-xs-12 m-t-20 m-b-5">
                <strong class="f32 white" v-text="items.cm_brand_country"></strong>
                <span class="f24 white">
                    <span v-text="items.list.length">2</span>个品牌
                </span>
            </div>
            <ul>
                <li class="col-xs-4 f24 m-t-10" v-for="(item, index) in items.list" v-if="index < items.len">
                    <div class="cur list-row" v-text="item.cm_brand" v-on:click="routeTo('chooseModel', item)"></div>
                </li>
                <li class="col-xs-4 f24 m-t-10 pull-right" v-if="items.list.length > 5">
                    <div class="cur list-row hella-blue" v-on:click="filterItems(items)" v-text="items.moreText"></div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import pageSet from '../js/chooseFactory';

export default {
    name: 'chooseFactory',
    data: pageSet.data,
    mounted: pageSet.mounted,
    computed: pageSet.computed,
    methods: pageSet.methods
};

</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";

.hella-bg{top:1.7rem;}

.logo-box {
    padding-top: $s20;
    padding-bottom: $s20;
    margin: 0;
}

.logo {
    height: $s100;
}

.toTopRight-deg{
  background-image:-webkit-linear-gradient(90deg, #fdd000, #ffe090);
  background-image:linear-gradient(90deg, #fdd000, #ffe090);
}

.title-badge{
    width: $s240;
    margin: 0 auto;
    border-top: $s60 solid $color-hella-blue;
    border-right: $s20 solid transparent;
    border-left: $s20 solid transparent;
    position: relative;
    padding-bottom: $s20;
    span {
        position: absolute;
        color: $color-F;
        top: -$s50;
        display: block;
        width: 100%;
        text-align: center;
    }
}

.col-xs-4,
.col-xs-12 {
    padding-left: $s10;
    padding-right: $s10;
}

.list-row {
    background-color: $color-F;
    border: solid $s1 $color-C;
    border-radius: $s10;
    text-align: center;
    line-height: $s60;
}
</style>
