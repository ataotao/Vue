<template>
    <div v-title data-title="更多筛选条件">

        <div class="p-25">
            <!--title-->
            <div class="f36" v-text="initObj.cmBrand + '/' + initObj.cmFactory">丰田/广汽丰田</div>
            <div class="f28 c6 m-t-10" v-text="initObj.cmModel"></div>

            <!--select-->
            <div class="rel m-t-10" v-for="select in selects" v-if="selects.length">
                <select class="form-control select-style f14" v-model="select.queryActive" v-on:change="selectChange()">
                    <option value="" selected>
                        {{'请选择' + select.queryColumnName + '（选填）'}}
                    </option>
                    <option v-for="option in select.queryValues" v-bind:value="option">{{ option.cm_model_value }}</option>
                </select>

                <i class="arrow-down" v-if="!select.queryActive"></i>

                <span class="rel-delete cur" v-on:click="removeSelectFn(select)" v-if="select.queryActive">
                    <span class="iconfont icon-delete blue f36"></span>
                </span>
            </div>

            <!--button-->
            <div class="m-t-20 m-b-30">
                <button class="btn btn-blue btn-block f32" v-on:click="routeTo('queryList')">查询</button>
            </div>

        </div>

    </div>
</template>

<script>
import pageSet from '../js/chooseCondition';

export default {
    name: 'chooseCondition',
    data: pageSet.data,
    mounted: pageSet.mounted,
    computed: pageSet.computed,
    methods: pageSet.methods
};

</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";
.select-style {
    -webkit-appearance: none;
}
.arrow-down {
    width: 0;
    height: 0;
    border-left: $s10 solid transparent;
    border-right: $s10 solid transparent;
    border-top: $s10 solid rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 50%;
    margin-top: -$s5;
    right: $s10;
}
.rel-delete{
    position: absolute;
    top: $s8;
    right: $s5;
    padding: $s10;
}
</style>
