// 状态配置
import * as types from './soupei-types';
// url配置
import env from '../../assets/js/env';
// http配置
import $http from 'axios';

// 生成状态
const state = {
    PageLoading: false,
    SopeiModel: [],
    Areas: []
};

// 渲染数据
const getters = {
    [types.DONE_PAGE_LOADING]: state => {
        return state.PageLoading;
    },
    [types.DONE_SOPEI_MODEL]: state => {
        return state.SopeiModel;
    },
    [types.DONE_AREAS]: state => {
        return state.Areas;
    }
};

// 赋值数据
const mutations = {
    /* 测试拦截器 */
    [types.LOGIN]: (state, data) => {
        // window.localStorage.setItem('user_access_token', data.user_access_token);
        // window.localStorage.setItem('user_refresh_token', data.user_refresh_token);
        // window.localStorage.setItem('account_id', data.account_id);
    },
    [types.LOGOUT]: (state) => {
        window.localStorage.removeItem('user_access_token');
        window.localStorage.removeItem('user_refresh_token');
        window.localStorage.removeItem('account_id');
    },
    /* 测试拦截器 end */
    [types.TOGGLE_SOPEI_MODEL](state, data) {
        state.SopeiModel = data;
        state.PageLoading = false;
    },
    [types.TOGGLE_AREAS](state, data) {
        state.Areas = data;
    }
};

// ajax请求
const actions = {
    // 获取搜配本地json列表
    [types.FETCH_SOPEI_MODEL]({ commit }, parm) {
        state.PageLoading = true;
        $http.get(env.json + 'sopeiModel.json')
            .then(res => {
                commit(types.TOGGLE_SOPEI_MODEL, res.data);
                state.PageLoading = false;
            }).catch(err => {
                console.log(err);
                console.log(parm);
            });
    },
    // 获取全国地区json列表
    [types.FETCH_AREAS]({ commit }, cb) {
        state.PageLoading = true;
        $http.get(env.json + 'areas_v2.json')
            .then(res => {
                commit(types.TOGGLE_AREAS, res.data);
                cb();
                state.PageLoading = false;
            }).catch(err => {
                console.log(err);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
