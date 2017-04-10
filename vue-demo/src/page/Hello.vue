<template>
    <div class="hello"
            v-title
            data-title="页面标题配置">
        <!--加载更多 动画列表demo-->
        <!--参数1 列表数据 | 参数2 默认显示多少条 -->
        <LoadMore v-bind="{ loadData: DONE_SOPEI_MODEL, num: 1 }" v-on:message="loadMoreSopeiModel" v-if="DONE_SOPEI_MODEL.length"></LoadMore>
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
        <SelectArea v-bind:areaInit="areaInit" v-on:message="getArea"></SelectArea>
        <SelectArea v-on:message="getArea"></SelectArea>
    </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
// 页面组件
import SelectArea from '../components/common/SelectArea';
import LoadMore from '../components/common/LoadMore';

// 状态配置
import * as types from '../vuex/modules/soupei-types.js';

export default {
    name: 'hello',
    components: {
        SelectArea, LoadMore
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
            ]
        };
    },
    mounted: function () {
        this.$nextTick(() => {
            if (!this.DONE_SOPEI_MODEL.length) {
                this.loadSopeiModel();
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
