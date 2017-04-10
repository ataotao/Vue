import Vue from 'vue';
import Router from 'vue-router';
import NotFoundComponent from '@/page/NotFoundComponent';
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
        },
        // {
        //     // 产品数据查询
        //     path: '/',
        //     name: 'query',
        //     component: Query
        // },
        {
            // 404页面
            path: '*',
            component: NotFoundComponent
        },
    ]
});

