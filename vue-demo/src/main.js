// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import { Spinner } from 'mint-ui';
import App from './App';
import router from './router';
import store from './vuex/store.js';
import Velocity from 'velocity-animate';
import ListTransition from './components/common/ListTransition';
import './assets/css/main.scss';

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

// 页面标题设置
Vue.directive('title', {
    inserted: function setTitle(el) {
        document.title = el.dataset.title;
    }
});

// 注册Spinner组件
Vue.component('mt-spinner', Spinner);

// 注册列表动画过渡组件
Vue.component('listTransition', ListTransition);

// 注册http插件
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
});
