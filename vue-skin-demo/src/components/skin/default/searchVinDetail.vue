<template>
    <div v-title data-title="VIN查询详情">

        <!--基础信息-->
        <div class="bg-w p-25 m-b-20">
            <div class="p-b-10 clearfix">
                <div class="pull-left f28 c3" v-text="DONE_VIN_DETAIL.cm_brand + DONE_VIN_DETAIL.cm_model"></div>
                <div class="pull-right"><div class="flag-badge"><span class="flag-triangle"></span><span v-text="DONE_VIN_DETAIL.cm_manage_nature"></span></div></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f28 c3" v-text="DONE_VIN_DETAIL.cm_factory"></div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_vehicle_type"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f28 c3" v-text="DONE_VIN_DETAIL.cm_sales_name"></div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_car"></div>
            </div>
            <div class="p-b-10 text-center clearfix">
                <div class="pull-left f24 c6 m-t-4" v-text="DONE_VIN_DETAIL.cm_model_year+'款/上市年月:' + DONE_VIN_DETAIL.cm_sales_year + '-' + DONE_VIN_DETAIL.cm_sales_month"></div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_product_status"></div>
            </div>
        </div>
        <!--变速器相关-->
        <div class="bg-w m-20 p-25 p-t-0">
            <div class="title-badge">
                <span>变速器相关</span>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">变速器类型</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_trans_type || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">变速器描述</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_trans_desc || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">档位数</div>
                <div class="pull-right f28 c3" v-text="filterCarmodelVal(DONE_VIN_DETAIL.cm_gear_num) || '暂无'"></div>
            </div>
        </div>
        <!--排量相关-->
        <div class="bg-w m-20 p-25 p-t-0">
            <div class="title-badge">
                <span>排量相关</span>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">排量标准</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_emission || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">气缸容积</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_cylinder || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">排量</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_displacement || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">进气形式</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_air_intake || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">燃油类型</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_fuel_type || '暂无'"></div>
            </div>
            <div class="p-b-10 clearfix">
                <div class="pull-left f24 c6">最大马力</div>
                <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_horsepower || '暂无'"></div>
            </div>
        </div>
        <div v-if="viewstatus">
            <!--制动相关-->
            <div class="bg-w m-20 p-25 p-t-0">
                <div class="title-badge">
                    <span>制动相关</span>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">助力类型</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_assist_type || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">驱动方式</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_driving_mode || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">前制动器</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_brake_type || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">后制动器</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_brake_type || '暂无'"></div>
                </div>
            </div>
            <!--轮胎相关-->
            <div class="bg-w m-20 p-25 p-t-0">
                <div class="title-badge">
                    <span>轮胎相关</span>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">前轮胎规格</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_tire_size || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">后轮胎规格</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_tire || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">前轮毂规格</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_front_wheel || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">后轮毂规格</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_wheel || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">轮毂材料</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_hub_material || '暂无'"></div>
                </div>
            </div>
            <!--其他-->
            <div class="bg-w m-20 p-25 p-t-0">
                <div class="title-badge">
                    <span>其他</span>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">轴距（mm）</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_wheelbase || '暂无'"></div>
                </div>
                <div class="p-b-10 clearfix">
                    <div class="pull-left f24 c6">后雨刷</div>
                    <div class="pull-right f28 c3" v-text="DONE_VIN_DETAIL.cm_rear_wiper || '暂无'"></div>
                </div>
            </div>
        </div>

        <div class="triggle-bar m-20" v-on:click="viewMore()" v-text="viewstatus?'点击这里收起信息':'点击这里展开信息'"></div>

        <div class="p-l-20 p-r-20 m-b-30">
            <button class="btn btn-blue btn-block" v-on:click="routeTo('queryList')" v-text="DONE_VIN_DETAIL.carmodel_detail ? '查看关联产品或用品信息' : '暂无关联商品'" v-bind:disabled="!DONE_VIN_DETAIL.carmodel_detail"></button>
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
.title-badge{
    width: $s240;
    margin: 0 auto;
    border-top: $s60 solid $color-blue;
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

.flag-badge {
    width: $s120;
    background-color: $color-blue;
    color: $color-F;
    text-align: center;
    position: relative;
    font-size: $s24;
    padding-left: $s20;
}

.flag-badge .flag-triangle {
    width: 0;
    height: 0;
    border-top: $s14 solid transparent;
    border-left: $s20 solid $color-F;
    border-bottom: $s20 solid transparent;
    position: absolute;
    left: -1px;
}

.triggle-bar {
    color: $color-blue;
    font-size: $s24;
    text-align: center;
    line-height: $s60;
    background-color: $color-F;
    cursor: pointer;
}
</style>
