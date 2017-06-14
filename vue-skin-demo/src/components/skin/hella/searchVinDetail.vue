<template>
    <div class="p-15" v-title data-title="VIN查询详情">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>


        <div class="bg-F1-15"></div>

        <div v-if="DONE_VIN_DETAIL.cm_brand">

            <!--基础信息-->
            <div class="m-20">

                <!--基础信息 1-->
                <div class="bg-w box1 m-t-15">

                    <div class="clearfix">
                        <div class="col-xs-3">品牌</div>
                        <div class="col-xs-9 ell" v-text="DONE_VIN_DETAIL.cm_brand"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-3">厂商</div>
                        <div class="col-xs-9 ell" v-text="DONE_VIN_DETAIL.cm_factory"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-3">车型</div>
                        <div class="col-xs-9 ell" v-text="DONE_VIN_DETAIL.cm_model"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-3">年款</div>
                        <div class="col-xs-9 ell" v-text="DONE_VIN_DETAIL.cm_model_year+'款/上市年月:' + DONE_VIN_DETAIL.cm_sales_year + '-' + DONE_VIN_DETAIL.cm_sales_month"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-3">排量</div>
                        <div class="col-xs-9 ell" v-text="DONE_VIN_DETAIL.cm_displacement"></div>
                    </div>

                </div>

                <!--基础信息 2-->
                <div class="bg-w box1 m-t-15">

                    <div class="clearfix">
                        <div class="col-xs-4">进口类型</div>
                        <div class="col-xs-8 ell" v-text="DONE_VIN_DETAIL.cm_manage_nature"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-4">车辆类型</div>
                        <div class="col-xs-8 ell" v-text="DONE_VIN_DETAIL.cm_vehicle_type"></div>
                    </div>

                    <div class="clearfix">
                        <div class="col-xs-4">生产状态</div>
                        <div class="col-xs-8 ell" v-text="DONE_VIN_DETAIL.cm_product_status"></div>
                    </div>

                </div>

            </div>

            <!--变速器相关-->
            <div class="box2 bg-w m-20 p-25 p-t-0">
                <div class="title-badge">
                    <span>变速器相关</span>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">变速器类型</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_trans_type || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">变速器描述</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_trans_desc || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">档位数</div>
                    <div class="pull-right f28 c3" v-text="filterCarmodelVal(DONE_VIN_DETAIL.cm_gear_num) || '暂无'"></div>
                </div>
            </div>
            <!--排量相关-->
            <div class="box2 bg-w m-20 p-25 p-t-0">
                <div class="title-badge">
                    <span>排量相关</span>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">排量标准</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_emission || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">气缸容积</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_cylinder || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">排量</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_displacement || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">进气形式</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_air_intake || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">燃油类型</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_fuel_type || '暂无'"></div>
                </div>
                <div class="clearfix">
                    <div class="pull-left f28 c6">最大马力</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_horsepower || '暂无'"></div>
                </div>
            </div>

            <div v-if="viewstatus">
                <!--制动相关-->
                <div class="box2 bg-w m-20 p-25 p-t-0">
                    <div class="title-badge">
                        <span>制动相关</span>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">助力类型</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_assist_type || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">驱动方式</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_driving_mode || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">前制动器</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_brake_type || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">后制动器</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_brake_type || '暂无'"></div>
                    </div>
                </div>
                <!--轮胎相关-->
                <div class="box2 bg-w m-20 p-25 p-t-0">
                    <div class="title-badge">
                        <span>轮胎相关</span>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">前轮胎规格</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_tire_size || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">后轮胎规格</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_tire || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">前轮毂规格</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_wheel || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">后轮毂规格</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_wheel || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">轮毂材料</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_hub_material || '暂无'"></div>
                    </div>
                </div>
                <!--其他-->
                <div class="box2 bg-w m-20 p-25 p-t-0">
                    <div class="title-badge">
                        <span>其他</span>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">轴距（mm）</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_wheelbase || '暂无'"></div>
                    </div>
                    <div class="clearfix">
                        <div class="pull-left f28 c6">后雨刷</div>
                        <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_wiper || '暂无'"></div>
                    </div>
                </div>
            </div>

            <div class="triggle-bar m-20" v-on:click="viewMore()" v-text="viewstatus?'点击这里收起信息':'点击这里展开信息'"></div>

            <div class="p-l-20 p-r-20 m-b-30">
                <button class="btn btn-hella-blue btn-block" v-on:click="routeTo('queryList')" v-text="DONE_VIN_DETAIL.carmodel_detail ? '查看关联产品或用品信息' : '暂无关联商品'" v-bind:disabled="!DONE_VIN_DETAIL.carmodel_detail"></button>
            </div>

        </div>
    </div>
</template>

<script>
import pageSet from '../js/searchVinDetail';

export default {
    name: 'searchVinDetail',
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

.box1{
    border-radius: $s10;
    line-height: $s60;
    .col-xs-3{
        border-right: solid 1px $color-D;
        color: $color-6;
        text-align: center;
    }
    .col-xs-4{
        border-right: solid 1px $color-D;
        color: $color-6;
        text-align: center;
    }
}

.box2{
    border-radius: $s10;
    .clearfix{
        border-bottom:solid 1px $color-E;
        line-height: $s60;
    }
}

.title-badge{
    width: $s240;
    margin: 0 auto;
    border-top: $s60 solid $color-hella-blue;
    border-right: $s20 solid transparent;
    border-left: $s20 solid transparent;
    position: relative;
    padding-bottom: $s20;
}

.title-badge span {
    position: absolute;
    color: $color-F;
    top: -$s50;
    display: block;
    width: 100%;
    text-align: center;
}

.triggle-bar {
    color: $color-hella-blue;
    font-size: $s24;
    text-align: center;
    line-height: $s60;
    background-color: $color-F;
    cursor: pointer;
}
</style>
