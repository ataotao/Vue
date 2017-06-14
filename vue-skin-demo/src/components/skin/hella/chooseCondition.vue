<template>
    <div class="p-15" v-title data-title="更多筛选条件">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--title-->
        <div class="bg-F1-15"></div>
        <div class="title-badge"><span>更多筛选条件</span></div>

        <div class="p-25">
            <!--title-->
            <div class="f36 white" v-text="initObj.cmBrand + '/' + initObj.cmFactory">丰田/广汽丰田</div>
            <div class="f28 white m-t-10" v-text="initObj.cmModel"></div>

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
                <button class="btn btn-hella-blue btn-block f32" v-on:click="routeTo('queryList')">查询</button>
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
