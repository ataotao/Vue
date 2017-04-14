import Vue from 'vue';
import Vuex from 'vuex';
import soupeidata from '@/vuex/modules/soupeidata';

//状态管理
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        soupeidata
    }
});
