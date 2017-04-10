<template>
    <div id="app">
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
    components: {
        PageLoading
    },
    computed: {
        ...mapGetters(['DONE_PAGE_LOADING'])
    },
};
</script>

<style>
#app {
    min-height: 100vh;
}
</style>
