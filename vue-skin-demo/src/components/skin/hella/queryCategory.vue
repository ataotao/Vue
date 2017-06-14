<template>
    <div class="p-15" v-title data-title="商品云查询">

        <div class="hella-bg"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>
        <!--button-->
        <div class="btn-group btn-group-justified btn-box">
            <div class="btn-group">
                <button type="button" class="btn btn-hella-blue btn-hei btn-left" v-on:click="handleClick('vinSearch')">
                    <span class="iconfont icon-vinchaxun f36 m-r-5 vm"></span><span class="vm">VIN查询</span>
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-hella-blue btn-hei btn-right" v-on:click="handleClick('modelSearch')">
                    <span class="iconfont icon-dangqianpinlei f36 m-r-5 vm"></span><span class="vm">条件查询</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import pageSet from '../js/queryCategory';

export default {
    name: 'queryCategory',
    data: pageSet.data,
    mounted: pageSet.mounted,
    computed: pageSet.computed,
    methods: pageSet.methods
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";

.hella-bg{top:4.25rem;}

.logo-box {
    padding-top: $s25;
    padding-left: $s25;
    margin: 0;
    height: $s320;

}

.logo {
    width: $s180;
}

.toTopRight-deg{
  background-image:-webkit-linear-gradient(90deg, #fdd000, #ffe090);
  background-image:linear-gradient(90deg, #fdd000, #ffe090);
}

.btn-hei{height: $s76;}

.btn-left {
    border-top-left-radius: 0;
}
.btn-right {
    background-image:url('../../../assets/img/line_y.png');
    background-repeat: no-repeat;
    background-position: 1px center;
    border-top-right-radius: 0;
}
</style>
