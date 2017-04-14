import Vue from 'vue';
import Router from 'vue-router';
import store from '@/vuex/store';
import * as types from '@/vuex/modules/soupei-types';
import soupeidata from '@/vuex/modules/soupeidata';

import NotFoundComponent from '@/page/NotFoundComponent';
import Query from '@/page/Query';
import Demo from '@/page/Demo';
import Test from '@/page/Test';
/* 测试拦截器 */
import Login from '@/page/Login';
import Repository from '@/page/Repository';
/* 测试拦截器 end */

Vue.use(Router);

const routes = [
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
    /* 测试拦截器 */
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true, //设置需要登录
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    /* 测试拦截器 end */
    {
        // 404页面
        path: '*',
        component: NotFoundComponent
    }
];

// 拦截器 页面刷新时，重新赋值token
if (window.localStorage.getItem('user_access_token')) {
    store.commit( types.LOGIN, window.localStorage.getItem('user_access_token') );
}

const router = new Router({
    routes
});

// 路由跳转时判断是否需要拦截页面
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (window.localStorage.getItem('user_access_token')) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;
