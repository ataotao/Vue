<template>
    <div class="Test">
        <SelectArea v-on:message="getArea"></SelectArea>
        <router-link :to="{name: 'Hello'}" class="btn btn-primary">返回上一页</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 状态配置
import * as types from '@/vuex/modules/soupei-types.js';
import SelectArea from '@/components/common/SelectArea';

export default {
    name: 'Test',
    components: {
        SelectArea
    },
    data() {
        return {

        };
    },
    mounted: function () {
        this.$nextTick(() => {

        });
    },
    computed: {
        ...mapGetters([types.DONE_PAGE_LOADING])
    },
    methods: {
        getArea(data){
            console.log(data);
        }
    }
};
</script>

<style scoped>

</style>
