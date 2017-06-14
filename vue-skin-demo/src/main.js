// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate from 'vee-validate';
// import { Validator } from 'vee-validate';
// import Velocity from 'velocity-animate';
import { Spinner } from 'mint-ui';
import VuePreview from 'vue-preview';
import App from './App';
import router from './router';
import store from './vuex/store';
import { locale, mobile } from './components/common/VeeValidate';
import ListTransition from './components/common/ListTransition';
import axios from './assets/js/http';
import '@/assets/css/main.scss';
// 通用工具方法
import Util from '@/assets/js/utility';

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

// 页面标题设置
Vue.directive('title', {
    inserted: function setTitle(el) {
        document.title = el.dataset.title;
    }
});

// Spinner组件
Vue.component('mt-spinner', Spinner);

// 列表动画过渡组件
Vue.component('listTransition', ListTransition);

// '将axios'挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$http = axios;

// 配置表单验证message语言类型
VeeValidate.Validator.addLocale(locale);
// 表单验证插件
Vue.use(VeeValidate, { locale: 'zh_CN' });
//自定义验证手机号码
VeeValidate.Validator.extend('mobile', mobile);

// PC端图片预览
Vue.use(VuePreview);

//解决IOS下:active伪类无效
document.body.addEventListener('touchstart', function () {});

Vue.prototype.filterCarmodelVal = Util.filterCarmodelVal;

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
});
