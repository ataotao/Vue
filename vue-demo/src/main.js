// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from '@/assets/js/http';
import env from '@/assets/js/env';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import { locale, mobile } from '@/components/common/VeeValidate';
import { Spinner } from 'mint-ui';
import App from '@/App';
import router from '@/router';
import store from '@/vuex/store';
import Velocity from 'velocity-animate';
import ListTransition from '@/components/common/ListTransition';
// import '@/assets/css/main.scss';

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
Validator.addLocale(locale);
// 表单验证插件
Vue.use(VeeValidate, { locale: 'zh_CN' } );
//自定义验证手机号码
Validator.extend('mobile', mobile);

//获取初始化配置
axios.get(env.json + 'init.json')
    .then((res) => {
        /* eslint-disable no-new */
        new Vue({
            el: '#app',
            template: '<App/>',
            components: { App },
            router,
            store
        });
        //更换颜色主题
        if (res.data.scheme) {
            require('@/assets/css/main-' + res.data.scheme + '.scss');
        }
    })
    .catch(err => {
        console.log(err);
    });
