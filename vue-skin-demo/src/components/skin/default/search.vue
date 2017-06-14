<template>
    <div v-title :data-title="$route.name == 'searchVin' ? '按VIN查询' : '按编码查询'">

        <form class="p-25 code-search">

            <div class="text-center code-search-top">
                <span class="iconfont"
                v-bind:class="{'icon-VINchaxun blue': $route.name == 'searchVin', 'icon-bianmachaxun blue': this.$route.name == 'searchCode'}"></span>
            </div>

            <!--VIN查询-->
            <div class="row m-t-20" v-if="$route.name == 'searchVin'">
                <div class="col-xs-12">
                    <div class="input-group input-group-lg">
                        <input type="text" class="form-control input-text" placeholder="输入车架号查询配件用品信息" maxlength="20" v-model="vinCode"
                        v-on:input="vinInputFn()" />
                        <span class="input-group-btn">
                            <button class="btn btn-blue input-text" type="button"
                            v-on:click="searchFn($route.name)"
                            v-bind:disabled="vinCode.length < 20">查询</button>
                        </span>
                    </div>
                </div>
            </div>

            <!--编码查询-->
            <div class="row m-t-20" v-if="$route.name == 'searchCode'">
                <div class="col-xs-12">
                    <div class="input-group input-group-lg">
                        <input type="text" class="form-control input-text" placeholder="输入编码查询配件用品信息" maxlength="50" v-model="partskuCode"
                        v-on:input="partskuCodeInputFn()" />
                        <span class="input-group-btn">
                            <button class="btn btn-blue input-text" type="button"
                            v-on:click="searchFn($route.name)">查询</button>
                        </span>
                    </div>
                </div>
            </div>

            <div class="text-center bt c6">搜配提供云查询服务</div>
        </form>

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
.input-text.form-control,
.input-group-btn .input-text.btn{
    font-size:$s28;
}
.bt {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: $s30;
}

.code-search {
    height: 100vh;
}

.code-search-top {
    padding-top: $s30;
    padding-bottom: $s30;
    .iconfont {
        font-size: $s240;
    }
}
</style>
