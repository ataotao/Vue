<template>
    <div id="app" v-bind:class="colorScheme">
        <transition name="show">
            <router-view></router-view>
        </transition>
        <!--页面加载-->
        <PageLoading v-show="!!DONE_PAGE_LOADING"></PageLoading>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PageLoading from './components/common/PageLoading';

export default {
    name: 'app',
    data(){
        return {
            colorScheme: ''
        };
    },
    components: {
        PageLoading
    },
    computed: {
        ...mapGetters(['DONE_PAGE_LOADING'])
    },
    beforeMount() {
        //设定默认颜色方案
        this.colorScheme = 'page-default';
    }
};
</script>

<style>
#app {
    min-height: 100vh;
}
</style>
