<template>
    <div class="p-15" v-title data-title="选择车型">

        <div class="hella-bg trans"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box text-center">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>

        <!--title-->
        <div class="bg-F1-15"></div>
        <div class="title-badge"><span>选择车型</span></div>


        <div class="p-25">
            <ul class="list-group" v-for="factory in carModelList">
                <li class="list-group-item-heading list-group-item" v-text="factory.cm_factory"></li>
                <li class="list-group-item cur" v-for="model in factory.list" v-on:click="routeTo('chooseCondition', factory, model)">
                    <span v-text="model.cm_model"></span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import pageSet from '../js/chooseModel';

export default {
    name: 'chooseModel',
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

.list-group-item-heading {
    margin-bottom: 0;
    background-color: $color-hella-blue;
    color: $color-F;
    border-color: $color-hella-blue;
}


</style>
