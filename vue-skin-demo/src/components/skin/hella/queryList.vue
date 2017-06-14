<template>
    <div class="p-15" v-title data-title="查询结果">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--title-->
        <div class="bg-F1-15"></div>
        <div class="title-badge"><span>查询结果</span></div>

        <div v-if="queryListData">

            <!--有数据-->
            <ul class="p-15 list" v-if="queryListData.length">
                <li class="rel p-25 f32 bg-w b1bc cur" v-for="item in queryListData" v-on:click="routeTo('queryDetail', item)">

                    <div class="f32 m-t-5" v-if="item.carmodel_detail.cm_brand" v-text="item.carmodel_detail.cm_brand.carmodel_val_value + ' ' + item.carmodel_detail.cm_factory.carmodel_val_value + ' ' + item.carmodel_detail.cm_model.carmodel_val_value"></div>

                    <!--滤清器 销售名称 cm_sales_name-->
                    <div class="c6 f30 m-t-15" v-if="item.carmodel_detail.cm_sales_name" v-text="item.carmodel_detail.cm_sales_name.carmodel_val_value"></div>

                    <div class="clearfix c6 m-t-15">
                        <span class="pull-left f30" v-text="item.carmodel_detail.cm_model_year.carmodel_val_value + '款/' + item.carmodel_detail.cm_displacement.carmodel_val_value"></span>
                        <span class="pull-right f24 text-right" v-text="filterPartSkuName(item.category_name, item.part_sku_name)"></span>
                    </div>

                    <!--变速箱 变速器描述 cm_trans_desc-->
                    <div class="clearfix m-t-10" v-if="item.carmodel_detail.cm_trans_desc">
                        <div class="pull-left c6" v-text="item.carmodel_detail.cm_trans_desc.carmodel_val_value"></div>
                        <div class="pull-right f24 text-right" v-text="filterCarmodelVal(item.carmodel_detail.cm_gear_num.carmodel_val_value)"></div>
                    </div>

                </li>

            </ul>

            <!--无数据-->
            <div class="noInfo" v-if="!queryListData.length">
                <div class="no-notice"></div>
                <p class="m-t-40 f36">没有这个数据，换一个试试</p>
            </div>

        </div>


    </div>
</template>

<script>
import pageSet from '../js/queryList';

export default {
    name: 'queryList',
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

.noInfo {
    width: $s600;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%,-50%);
}
.no-notice {
    background-image: url("../../../assets/img/tip/notice.png");
    background-size:cover;
    width: $s370;
    height: $s408;
    margin: 0 auto;
}

.list li{
    border-radius: $s10;
    margin-bottom: $s20;
}

</style>
