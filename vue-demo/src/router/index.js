import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/page/Hello';
import Test from '@/page/Test';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/Test/:id',
            name: 'Test',
            component: Test
        }
    ]
});
