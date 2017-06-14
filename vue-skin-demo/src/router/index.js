import Vue from 'vue';
import Router from 'vue-router';
// import store from '@/vuex/store';
// import * as types from '@/vuex/modules/soupei-types';
// import soupeidata from '@/vuex/modules/soupeidata';

import NotFoundComponent from '@/components/page/NotFoundComponent';
import Loading from '@/components/page/Loading';
import Main from '@/components/page/_MAIN';

// import Demo from '@/components/page/Demo';
// import Test from '@/components/page/Test';
// import Parent from '@/components/Parent';
/* 测试拦截器 */
// import Login from '@/components/page/Login';
// import Repository from '@/components/page/Repository';
/* 测试拦截器 end */

Vue.use(Router);

const routes = [
    {
        // loading
        path: '/loading',
        name: 'loading',
        component: Loading
    },
    {
        // 产品数据查询(查询首页，此页面判断品类数量)
        path: '/query',
        name: 'query',
        component: Main
    },
    {
        // 产品数据查询(功能查询页面)
        path: '/queryCategory',
        name: 'queryCategory',
        component: Main
    },
    {
        // 选择品牌
        path: '/chooseFactory/:tenantId/:brandId/:categoryId',
        name: 'chooseFactory',
        component: Main
    },
    {
        // 选择车型
        path: '/chooseModel/:tenantId/:brandId/:categoryId',
        name: 'chooseModel',
        component: Main
    },
    {
        // 更多筛选条件
        path: '/chooseCondition/:tenantId/:brandId/:categoryId',
        name: 'chooseCondition',
        component: Main
    },
    {
        // 查询结果
        path: '/queryList/:tenantId/:brandId/:categoryId',
        name: 'queryList',
        component: Main
    },
    {
        // 查询详情
        path: '/queryDetail/:tenantId/:brandId/:categoryId',
        name: 'queryDetail',
        component: Main
    },
    {
        // VIN查询
        path: '/searchVin/:tenantId/:brandId/:categoryId',
        name: 'searchVin',
        component: Main
    },
    {
        // VIN查询结果
        path: '/searchVinList/:tenantId/:brandId/:categoryId',
        name: 'searchVinList',
        component: Main
    },
    {
        // VIN查询详情
        path: '/searchVinDetail/:tenantId/:brandId/:categoryId',
        name: 'searchVinDetail',
        component: Main
    },
    {
        // 编码查询
        path: '/searchCode/:tenantId/:brandId/:categoryId',
        name: 'searchCode',
        component: Main
    },
    /* 测试拦截器 */
    // {
    //     path: '/repository',
    //     name: 'repository',
    //     meta: {
    //         requireAuth: true, //设置需要登录
    //     },
    //     component: Repository
    // },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // },
    /* 测试拦截器 end */
    {
        // 404页面
        path: '*',
        name:'notFound',
        component: NotFoundComponent
    }
];

// 拦截器 页面刷新时，重新赋值token
// if (window.localStorage.getItem('user_access_token')) {
//     store.commit(types.LOGIN, window.localStorage.getItem('user_access_token'));
// }

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
