<template>
    <div v-title data-title="选择品牌">
        <div class="clearfix" v-for="items in carBrandList">
            <div class="col-xs-12 m-t-20 m-b-5">
                <strong class="f32" v-text="items.cm_brand_country"></strong>
                <span class="f24 blue">
                    <span v-text="items.list.length">2</span>个品牌
                </span>
            </div>
            <ul>
                <li class="col-xs-4 f24 m-t-10" v-for="(item, index) in items.list" v-if="index < items.len">
                    <div class="cur list-row" v-text="item.cm_brand" v-on:click="routeTo('chooseModel', item)"></div>
                </li>
                <li class="col-xs-4 f24 m-t-10 pull-right" v-if="items.list.length > 5">
                    <div class="cur list-row blue" v-on:click="filterItems(items)" v-text="items.moreText"></div>
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
