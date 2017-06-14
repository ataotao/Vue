<template>
    <div v-if="DONE_PAGE_SKIN">
        <!--切换皮肤组件-->
        <component v-bind:is="DONE_PAGE_SKIN + '-' + this.$route.name"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '@/vuex/modules/soupei-types.js';

// 配置皮肤组件
import skinConfig from '@/components/skin/skinConfig';

export default {
    name: 'Main',
    data() {
        return {

        };
    },
    components: skinConfig,
    computed: {
        ...mapGetters([types.DONE_PAGE_SKIN])
    },
    mounted() {
        this.$nextTick(() => {

        });
    }
};

</script>

<style lang="scss" scoped>

</style>
