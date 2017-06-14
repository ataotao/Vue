// 状态配置
import * as types from '@/vuex/modules/soupei-types';
// url配置
import ENV from '@/assets/js/env';
// http配置
import axios from '@/assets/js/http';

// 生成状态
const state = {
    pageSkin: null,
    pageLoading: false,
    sopeiModel: [],
    areas: [],
    tenantData: [],
    categoryData: [],
    vinDetailData: {},
    currentTenant:{}
};

// 渲染数据
const getters = {
    [types.DONE_PAGE_SKIN]: state => {
        return state.pageSkin;
    },
    [types.DONE_PAGE_LOADING]: state => {
        return state.pageLoading;
    },
    [types.DONE_VIN_DETAIL]: state => {
        return state.vinDetailData;
    },
    [types.DONE_SOPEI_MODEL]: state => {
        return state.sopeiModel;
    },
    [types.DONE_AREAS]: state => {
        return state.areas;
    },
    [types.DONE_TENANT]: state => {
        return state.tenantData;
    },
    [types.DONE_CURRENT_TENANT]: state => {
        return state.currentTenant;
    },
    [types.DONE_CATEGORY]: state => {
        return state.categoryData;
    }
};

// 赋值数据
const mutations = {
    [types.TOGGLE_PAGE_SKIN](state, data) {
        state.pageSkin = data;
    },
    [types.TOGGLE_VIN_DETAIL](state, data) {
        state.vinDetailData = data;
    },
    [types.TOGGLE_SOPEI_MODEL](state, data) {
        state.sopeiModel = data;
        state.pageLoading = false;
    },
    [types.TOGGLE_AREAS](state, data) {
        state.areas = data;
    },
    [types.TOGGLE_TENANT](state, data) {
        state.tenantData = data;
    },
    [types.TOGGLE_CURRENT_TENANT](state, data) {
        state.currentTenant = data;
    },
    [types.TOGGLE_CATEGORY](state, data) {
        state.categoryData = data;
    },
    /* 测试拦截器 */
    [types.LOGIN]: (state, data) => {
        console.log(data);
        // window.localStorage.setItem('user_access_token', data.user_access_token);
        // window.localStorage.setItem('user_refresh_token', data.user_refresh_token);
        // window.localStorage.setItem('account_id', data.account_id);
    },
    [types.LOGOUT]: (state) => {
        console.log(state);
        window.localStorage.removeItem('user_access_token');
        window.localStorage.removeItem('user_refresh_token');
        window.localStorage.removeItem('account_id');
    }
    /* 测试拦截器 end */
};

// ajax请求
const actions = {
    // 皮肤UI
    [types.FETCH_PAGE_SKIN]({ commit }, skin) {
        //获取初始化配置
        commit(types.TOGGLE_PAGE_SKIN, skin);
        // axios.get(ENV.jsonApi + 'init.json')
        //     .then((res) => {
        //         /* eslint-disable no-new */
        //         commit(types.TOGGLE_PAGE_SKIN, res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    },
    [types.FETCH_VIN_DETAIL]({ commit }, data) {
        //VIN详情数据
        commit(types.TOGGLE_VIN_DETAIL, data);
    },
    // 加载状态
    [types.FETCH_PAGE_LOADING]({ commit }, parm) {
        state.pageLoading = parm;
    },
    // 获取搜配本地json列表
    [types.FETCH_SOPEI_MODEL]({ commit }, parm) {
        state.pageLoading = true;
        axios.get(ENV.jsonApi + 'sopeiModel.json')
            .then(res => {
                commit(types.TOGGLE_SOPEI_MODEL, res.data);
                state.pageLoading = false;
            }).catch(err => {
                console.log(err);
                console.log(parm);
            });
    },
    // 获取全国地区json列表
    [types.FETCH_AREAS]({ commit }, cb) {
        state.pageLoading = true;
        axios.get(ENV.jsonApi + 'areas_v2.json')
            .then(res => {
                commit(types.TOGGLE_AREAS, res.data);
                cb();
                state.pageLoading = false;
            }).catch(err => {
                console.log(err);
            });
    },
    // 获取企业json列表
    [types.FETCH_TENANT]({ commit }, cb) {
        state.pageLoading = true;
        let data = require('../../assets/json/tenant.json');
        commit(types.TOGGLE_TENANT, data);
        cb();
    },
    // 获取当前企业信息
    [types.FETCH_CURRENT_TENANT]({ commit }, ids) {
        state.tenantData.forEach((v) => {
            if (v.tenant_id == ids.tenantId) {
                v.brand_id = ids.brandId;
                v.category_id = ids.categoryId;
                commit(types.TOGGLE_CURRENT_TENANT, v);
            }
        });
        state.pageLoading = false;
    },
    // 品类json列表
    [types.FETCH_CATEGORY]({ commit }) {
        state.pageLoading = true;
        let data = require('../../assets/json/category.json');
        commit(types.TOGGLE_CATEGORY, data);
        state.pageLoading = false;
    }

};

export default {
    state,
    getters,
    mutations,
    actions
};
