<template>
    <div class="p-15" v-title :data-title="$route.name == 'searchVin' ? '按VIN查询' : '按编码查询'">

        <div class="hella-bg"></div>

        <!--logo-->
        <h1 class="toTopRight-deg logo-box">
            <img class="logo" v-bind:src="DONE_CURRENT_TENANT.tenant_logo">
        </h1>
        <!--VIN查询-->
        <div class="clearfix search-bg" v-if="$route.name == 'searchVin'">
            <div class="col-xs-9">
                <input type="text" class="form-control search-input" placeholder="输入车架号查询配件用品信息"
                    maxlength="20"
                    v-model="vinCode"
                    v-on:input="vinInputFn()"
                />
            </div>
            <div class="col-xs-3">
                <button class="btn btn-hella-blue search-btn" type="button"
                v-on:click="searchFn($route.name)"
                v-bind:disabled="vinCode.length < 20">
                    <span class="iconfont icon-chaxunzongshu f28 m-r-5"></span>查询
                </button>
            </div>
        </div>

        <!--编码查询-->
        <div class="clearfix search-bg" v-if="$route.name == 'searchCode'">
            <div class="col-xs-9">
                <input type="text" class="form-control search-input" placeholder="输入编码查询配件用品信息"
                    maxlength="50"
                    v-model="partskuCode"
                    v-on:input="partskuCodeInputFn()"
                />
            </div>
            <div class="col-xs-3">
                <button class="btn btn-hella-blue search-btn" type="button"
                v-on:click="searchFn($route.name)">
                    <span class="iconfont icon-chaxunzongshu f28 m-r-5"></span>查询
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import pageSet from '../js/search';

export default {
    name: 'search',
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


.search-bg {
    background-color: $color-hella-blue;
    padding-top: $s10;
    padding-bottom: $s10;
    border-bottom-left-radius: $s8;
    border-bottom-right-radius: $s8;
    .col-xs-9{
        padding-left: $s15;
        padding-right: $s15;
    }
    .col-xs-3{
        padding-left: 0;
        padding-right: $s15;
    }
}

.search-input {
    border-radius: 0;
    border: none;
    height: $s60;
}

.search-btn {
    height: $s60;
}


</style>
