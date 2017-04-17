<template>
    <div class="Demo" v-title data-title="页面标题配置">
        <!--表单验证Demo-->
        <p>1- 获取第一个错误 {{errors.first('reg_tel')}}</p>
        <p>2- 获取所有错误(对象形式) {{errors.collect()}}</p>
        <p>3- 检查错误 {{errors.has('reg_tel')}}</p>
        <p>4- 获取所有错误消息 {{errors.all()}}</p>
        <p>5- 检查是否存在错误 {{errors.any()}}</p>
        <!--
            first('field') 获取第一个错误
            collect('field') 获取所有错误
            has('field') 检查错误
            all() 获取所有错误消息。
            any() 检查是否存在错误
        -->
        <form novalidate name="testForm">
            <div class="form-group" :class="{ 'has-error': errors.has('email') }">
                <!--<input class="form-control" v-validate="'required|email'" name="email" type="text" placeholder="邮箱">-->
                <input class="form-control" data-vv-delay="1000" v-validate="{ rules: { required: true, email: true } }" name="email" type="text" placeholder="邮箱">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('alpha') }">
                <input class="form-control" v-validate="'required|alpha'" name="alpha" type="text" placeholder="只能为字母">
                <span v-show="errors.has('alpha')">{{ errors.first('alpha') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('alpha_dash') }">
                <input class="form-control" v-validate="'required|alpha_dash'" name="alpha_dash" type="text" placeholder="可能包含字母字符、 数字、 短划线或下划线。">
                <span v-show="errors.has('alpha_dash')">{{ errors.first('alpha_dash') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('alpha_num') }">
                <input class="form-control" v-validate="'required|alpha_num'" name="alpha_num" type="text" placeholder="包含字母或数字">
                <span v-show="errors.has('alpha_num')">{{ errors.first('alpha_num') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('between') }">
                <input class="form-control" v-validate="'required|between:1,5'" name="between" type="text" placeholder="请输入1-5之间的数字">
                <span v-show="errors.has('between')">{{ errors.first('between') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('password') }">
                <input class="form-control" v-validate="'required|alpha_dash'" name="password" type="password" placeholder="请输入密码">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('confirmPassword') }">
                <input class="form-control" v-validate="'required|confirmed:password'" name="confirmPassword" type="password" placeholder="请重新输入密码">
                <span v-show="errors.has('confirmPassword')">{{ errors.first('confirmPassword') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('numeric') }">
                <input class="form-control" v-validate="'required|numeric'" name="numeric" type="text" placeholder="只能为数字">
                <span v-show="errors.has('numeric')">{{ errors.first('numeric') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('reg_tel') }">
                <input class="form-control" v-validate="{ rules: { required: false, regex: /^((13[0-9])|(15[012356789])|(17[678])|(18[0-9])|(14[57]))[0-9]{8}$/} }" name="reg_tel" type="tel" placeholder="正则验证，手机号码">
                <span v-show="errors.has('reg_tel')">{{ errors.first('reg_tel') }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.has('mobile') }">
                <input class="form-control" v-model="mobileInput" v-validate="{ rules: { required: true, mobile: true } }" name="mobile" type="text" placeholder="自定义异步在线验证手机号码是否注册" maxlength="11">
                <span v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>
            </div>
            <!--倒计时获取验证码-->
            <div class="form-group" :class="{ 'has-error': errors.has('mobile') }">
                <TimerBtn class="btn btn-default" v-bind="{ second: 5, disabled: !mobileInput || errors.has('mobile') }"></TimerBtn>
            </div>
        </form>
        <!--加载更多 动画列表demo-->
        <!--参数1 列表数据 | 参数2 默认显示多少条 -->
        <LoadMore v-bind="{ loadData: DONE_SOPEI_MODEL, num: 1 }" v-on:message="loadMoreSopeiModel" v-if="DONE_SOPEI_MODEL.length" ref="profile"></LoadMore>
        <ul>
            <li v-for="(item, index) in moreDataFilter" v-text="item.name"></li>
        </ul>
        <!--加载更多-->
        <!--参数1 列表数据 | 参数2 默认显示多少条 -->
        <LoadMore v-bind="{ loadData: DONE_AREAS, num: 2 }" v-on:message="loadMoreAreas" v-if="DONE_AREAS.length"></LoadMore>
        <ul>
            <li v-for="item in moreAreasFilter" v-text="item.province_name"></li>
        </ul>
        <!--加载动画列表demo-->
        <listTransition>
            <li v-for="(item, index) in textList" v-bind:key="item">
                <div v-text="item"></div>
            </li>
        </listTransition>
        <transition-group name="list" tag="ul">
            <li v-for="(item, index) in textList" v-bind:key="item">
                <div v-text="item"></div>
            </li>
        </transition-group>
        <button class="btn btn-primary" v-on:click="textList.push(1)">添加一条数据</button>
        <p></p>

        <button class="btn btn-primary" v-on:click="openModal">模态框</button>
        <button class="btn btn-primary" v-on:click="openToast">消息提示</button>
        <router-link :to="{name: 'Test', params: {id: 12345}}" class="btn btn-primary">路由跳转</router-link>
        <p></p>
        <!--select多级菜单 不带props则默认第一项-->
        <SelectArea v-bind:areaInit="areaInit" v-on:message="getArea" ref="profile1"></SelectArea>
        <SelectArea v-on:message="getArea"></SelectArea>

    </div>
</template>

<script>
// url配置
import env from '@/assets/js/env';
import { MessageBox, Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
// 页面组件
import SelectArea from '@/components/common/SelectArea';
import LoadMore from '@/components/common/LoadMore';
import TimerBtn from '@/components/common/TimerBtn';

// 状态配置
import * as types from '@/vuex/modules/soupei-types.js';

export default {
    name: 'Demo',
    components: {
        SelectArea, LoadMore, TimerBtn
    },
    data() {
        return {
            areaInit: {
                province_id: 210000,
                city_id: 210200,
                town_id: 210204
            },
            moreDataFilter: [],
            moreAreasFilter: [],
            textList: [
                '1-----------',
                '2-----------',
                '3-----------',
                '4-----------',
                '5-----------',
            ],
            username: '',
            comment: '',
            mobileInput: ''
        };
    },
    mounted: function () {
        this.$nextTick(() => {
            /* async/await实现代码 */
            const makeRequest = async () => {
                const data = await this.$http.get(env.json + 'areas_v2.json');
                if (data) {
                    const moreData = await this.$http.get(env.json + 'sopeiModel.json');
                    console.log(data, '----------data----------');
                    console.log(moreData, '----------moreData----------');
                    return moreData.data;
                }
            };

            makeRequest().then((res)=>{
                console.log(res, '----------makeRequest----------');
            });
            /* async/await实现代码 end */

            if (!this.DONE_SOPEI_MODEL.length) {
                this.loadSopeiModel();
                setTimeout(()=>{
                    // 获取子组件例子
                    // $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。
                    console.log(this.$refs);
                }, 1000);

                //同步请求例子
                this.$http.get('http://203.195.242.135:29000/api/sopei/v1.0/factory_info/sp38121728506000000')
                .then((res)=>{
                    if(res.data.code === 0){
                        // return的值将传递给下一个then
                        return res.data.result;
                    }
                })
                .then((factoryInfo)=>{
                    console.log(factoryInfo, '上一个请求值');
                    this.$http.get(env.json + 'areas_v2.json')
                    .then((res)=>{
                        console.log(res.data, '当前请求值');
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }
        });
    },
    computed: {
        ...mapGetters([types.DONE_SOPEI_MODEL, types.DONE_AREAS])
    },

    methods: {
        // 加载搜配列表
        loadSopeiModel() {
            this.$store.dispatch(types.FETCH_SOPEI_MODEL, { msg: '搜配列表加载失败！' });
        },
        // 查看更多车型
        loadMoreSopeiModel(data) {
            this.moreDataFilter = data;
        },
        // 查看更多地区
        loadMoreAreas(data) {
            this.moreAreasFilter = data;
        },
        // 获取SelectArea更新
        getArea(data){
            console.log(data);
        },
        // 模态框
        openModal() {
            //MessageBox demo
            MessageBox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            }).then((action) => {
                if (action == 'cancel') {
                    console.log('取消');
                } else {
                    console.log('确定');
                }
            });
        },
        // 消息提示
        openToast() {
            //Toast demo
            Toast({
                message: '操作成功',
                iconClass: 'iconfont icon-expression f160',
                // position: 'bottom',
                duration: 2000
            });
        }
    }
};
</script>

<style scoped>

</style>
