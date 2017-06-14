<template>
    <div v-title data-title="选择车型">

        <div class="p-15">
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
.list-group-item-heading {
    margin-bottom: 0;
    background-color: $color-3;
    color: $color-F;
}
</style>
