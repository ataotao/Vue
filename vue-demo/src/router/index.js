import Vue from 'vue';
import Router from 'vue-router';
import NotFoundComponent from '@/page/NotFoundComponent';
import Query from '@/page/Query';
import Demo from '@/page/Demo';
import Test from '@/page/Test';

Vue.use(Router);

export default new Router({
    routes: [
        {
            // 产品数据查询
            path: '/',
            name: 'query',
            component: Query
        },
        {
            path: '/Demo',
            name: 'Demo',
            component: Demo
        },
        {
            path: '/Test/:id',
            name: 'Test',
            component: Test
        },
        {
            // 404页面
            path: '*',
            component: NotFoundComponent
        },
    ]
});

