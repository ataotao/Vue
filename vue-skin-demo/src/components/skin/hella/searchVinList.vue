<template>
    <div class="p-15" v-title data-title="按VIN查询">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--hella-bg-->
        <div class="clearfix">

            <div class="bg-F1-15"></div>

            <!--有数据-->
            <div v-if="pageState && vinList.length > 0">
                <div class="title-badge"><span>查询结果</span></div>

                <h3 class="f26 p-25 text-center title">带 <span class="iconfont icon-bofangsanjiaoxing hella-yellow f28"></span> 的结果表示可以直接查看关联的商品或服务信息</h3>
                <ul class="p-l-15 p-r-15 list-box">
                    <li class="p-25 bg-w list" v-for="(vin, index) in vinList" v-on:click="routeTo('searchVinDetail', vin)">
                        <div class="clearfix m-b-10">
                            <span class="pull-left iconfont icon-bofangsanjiaoxing hella-yellow f24 m-t-10 m-r-5" v-if="vin.carmodel_detail"></span>
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

            <!--无数据-->
            <p v-if="!pageState" class="text-center p-t-10 f28">未找到您要的车型，请检查输入是否正确！</p>

        </div>


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

.title{
    margin-top: 0;
    margin-bottom: $s15;
    color: $color-F;
    .iconfont{
        color: $color-hella-yellow;
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
    span {
        position: absolute;
        color: $color-F;
        top: -$s50;
        display: block;
        width: 100%;
        text-align: center;
    }
}

.list-box{overflow-y: auto;}
.list{border-radius: $s10; margin-bottom:$s20;}

</style>
