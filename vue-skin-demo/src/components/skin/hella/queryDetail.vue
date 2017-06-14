<template>
    <div class="p-15" v-title data-title="查询详情">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--title-->
        <div class="bg-F1-15"></div>
        <div class="title-badge"><span>产品详情</span></div>

        <!--基础信息-->
        <div class="m-20">

            <!--基础信息 1-->
            <div class="bg-w box1 m-t-20">

                <div class="clearfix">
                    <div class="col-xs-3">品牌</div>
                    <div class="col-xs-9 ell" v-text="initObj.cm_brand"></div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-3">厂商</div>
                    <div class="col-xs-9 ell" v-text="initObj.cm_factory"></div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-3">车型</div>
                    <div class="col-xs-9 ell" v-text="initObj.cm_model"></div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-3">年款</div>
                    <div class="col-xs-9 ell" v-text="initObj.cm_model_year+'款'"></div>
                </div>

                <div class="clearfix">
                    <div class="col-xs-3">排量</div>
                    <div class="col-xs-9 ell" v-text="initObj.cm_displacement"></div>
                </div>

                <!--变速箱的显示-->
                <div class="clearfix" v-if="initObj.cm_trans_desc">
                    <div class="col-xs-3">档位</div>
                    <div class="col-xs-9 ell" v-text="filterCarmodelVal(initObj.cm_gear_num) + ' / ' + initObj.cm_trans_desc  "></div>
                </div>

                <!--滤清器的显示-->
                <div class="clearfix" v-if="data[0] && data[0].part_sku_name && data[0].part_sku_name.indexOf('滤清器') != -1">
                    <div class="col-xs-3">类型</div>
                    <div class="col-xs-9 ell" v-text="data[0].part_sku_name"></div>
                </div>

            </div>

        </div>

        <ul class="m-20 list">
            <li class="p-25 bg-w m-t-20 f26 p-tb-5" v-for="part in data">
                <h3 class="c2a f32 m-0 m-b-10 m-t-10" v-text="part.part_sku_name + '信息'"></h3>

                <!-- 工厂编码 不显示变速箱的工厂编码-->
                <div class="clearfix m-t-20" v-if="part.part_sku_name != '变速箱'">
                    <label class="pull-left">工厂编码</label>
                    <div class="pull-right text-right" v-text="part.part_sku_code"></div>
                </div>

                <div class="clearfix m-t-10" v-for="partItem in part.partsku_pro_list">
                    <!--字符串-->
                    <div v-if="partItem.category_pro_type == 1">
                        <label class="pull-left" v-text="partItem.category_pro_name"></label>
                        <div class="pull-right text-right" v-text="partItem.category_val_value"></div>
                    </div>
                    <!--数字-->
                    <div v-if="partItem.category_pro_type == 2">
                        <label class="pull-left" v-text="partItem.category_pro_name"></label>
                        <div class="pull-right text-right" v-text="partItem.category_val_value"></div>
                    </div>
                    <!--图片-->
                    <div v-if="partItem.category_pro_type == 3">
                        <div v-if="!partItem.category_val_value">
                            <label class="pull-left db" v-text="partItem.category_pro_name"></label>
                            <span class="pull-right text-right">暂无</span>
                        </div>
                        <div v-if="partItem.category_val_value">
                            <label class="db" v-text="partItem.category_pro_name"></label>
                            <transition-group name="fadeIn" tag="div">
                                <img class="preview-img pic cur" v-for="(img, index) in partItem.imgList" :key="index" :src="img.src" v-if="index < partItem.len" @click="previewImage(partItem.imgList, index)">
                            </transition-group>
                        </div>
                        <div v-if="partItem.imgList && partItem.imgList.length > 1">
                            <div class="text-center f28 blue p-t-20 p-b-20" v-text="partItem.len == 1 ? '查看全部' : '点击收起'" v-on:click="viewImgMore(partItem)"></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import pageSet from '../js/queryDetail';

export default {
    name: 'queryDetail',
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

.pic {
    width: 100%;
}

.box1{
    border-radius: $s10;
    line-height: $s60;
    .col-xs-3{
        border-right: solid 1px $color-D;
        color: $color-6;
        text-align: center;
    }
}

.list li{
    border-radius: $s10;
}
</style>
