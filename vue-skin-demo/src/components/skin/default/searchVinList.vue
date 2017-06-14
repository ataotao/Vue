<template>
    <div v-title data-title="按VIN查询">

        <div v-if="pageState && vinList.length > 0">
            <h3 class="c6 f28 p-25 bg-w b1bc title">带 <span class="iconfont icon-bofangsanjiaoxing blue f28"></span> 的结果表示可以直接查看关联的商品或服务信息</h3>
            <ul>
                <li class="p-25 bg-w b1bc" v-for="(vin, index) in vinList" v-on:click="routeTo('searchVinDetail', vin)">
                    <div class="clearfix m-b-10">
                        <span class="pull-left iconfont icon-bofangsanjiaoxing blue f24 m-t-10 m-r-5" v-if="vin.carmodel_detail"></span>
                        <span class="pull-left c3 f32" v-text="vin.cm_brand + ' ' + vin.cm_model"></span>
                        <span class="pull-right c6 f32" v-text="vin.cm_model_year + '款/' + vin.cm_displacement"></span>
                    </div>
                    <div class="clearfix m-b-10 f28">
                        <span class="pull-left c3" v-text="vin.cm_sales_name"></span>
                    </div>
                    <div class="clearfix m-b-10 f28">
                        <span class="pull-left" v-text="vin.cm_trans_desc"></span>
                        <span class="pull-right" v-text="filterCarmodelVal(vin.cm_gear_num)"></span>
                    </div>
                </li>
            </ul>
        </div>
        <p  v-if="!pageState" class="text-center p-t-10 f28">未找到您要的车型，请检查输入是否正确！</p>

    </div>
</template>

<script>
import pageSet from '../js/searchVinList';

export default {
    name: 'searchVinList',
    data: pageSet.data,
    mounted: pageSet.mounted,
    computed: pageSet.computed,
    methods: pageSet.methods
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";
.title{margin-top: 0; margin-bottom: $s15;}
</style>
