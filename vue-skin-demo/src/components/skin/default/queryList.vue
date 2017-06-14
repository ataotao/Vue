<template>
    <div v-title data-title="查询结果">

        <div v-if="queryListData">

            <!--有数据-->
            <ul v-if="queryListData.length">
                <li class="rel p-25 f32 bg-w b1bc cur" v-for="item in queryListData" v-on:click="routeTo('queryDetail', item)">

                    <div class="f32 m-t-5" v-if="item.carmodel_detail.cm_brand" v-text="item.carmodel_detail.cm_brand.carmodel_val_value + ' ' + item.carmodel_detail.cm_factory.carmodel_val_value + ' ' + item.carmodel_detail.cm_model.carmodel_val_value">大众 一汽大众 捷达</div>

                    <!--滤清器 销售名称 cm_sales_name-->
                    <div class="c6 f30 m-t-15" v-if="item.carmodel_detail.cm_sales_name" v-text="item.carmodel_detail.cm_sales_name.carmodel_val_value">1.4 手动 时尚型</div>

                    <div class="clearfix c6 m-t-15">
                        <span class="pull-left f30" v-text="item.carmodel_detail.cm_model_year.carmodel_val_value + '款/' + item.carmodel_detail.cm_displacement.carmodel_val_value">2013款/1.4L</span>
                        <span class="pull-right f24 text-right" v-text="filterPartSkuName(item.category_name, item.part_sku_name)">机油滤清器</span>
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

</style>
