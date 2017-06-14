<template>
    <div v-title data-title="查询详情">
        <ul>
            <li class="p-25 bg-w m-b-10 f32">
                <div class="clearfix">
                    <div class="pull-left c2a" v-text="initObj.cm_brand + ' ' + initObj.cm_factory + ' ' + initObj.cm_model"></div>
                </div>
                <div class="clearfix m-t-15">
                    <div class="pull-left c6" v-text="initObj.cm_model_year + '款/' + initObj.cm_displacement"></div>
                    <!--滤清器的显示-->
                    <div class="pull-right c6 f24 p-t-10" v-text="data[0].part_sku_name" v-if="data[0] && data[0].part_sku_name && data[0].part_sku_name.indexOf('滤清器') != -1"></div>
                </div>
                <!--变速箱的显示-->
                <div class="clearfix m-t-10" v-if="initObj.cm_trans_desc">
                    <div class="pull-left c6 f30" v-text="initObj.cm_trans_desc"></div>
                    <div class="pull-right f24" v-text="filterCarmodelVal(initObj.cm_gear_num)"></div>
                </div>
            </li>
            <li class="p-25 bg-w m-t-15 f26 p-tb-5" v-for="part in data">
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
.pic {
    width: 100%;
}
</style>
