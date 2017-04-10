<template>
    <div class="select-area-scope">
        <!--select多级菜单-->
        <div class="col-xs-4">
            {{province.province_name}}
            <select v-model="province" class="form-control" v-on:change="selectChange">
                <option v-for="option in areas" v-bind="{ value: option, id: option.province_id }">
                    {{ option.province_name }}
                </option>
            </select>
        </div>
    
        <div class="col-xs-4">
            {{city.city_name}}
            <select v-model="city" class="form-control" v-on:change="selectChange">
                <option v-for="option in province.cityItems" v-bind="{ value: option, id: option.city_id }">
                    {{ option.city_name }}
                </option>
            </select>
        </div>
    
        <div class="col-xs-4">
            {{town.town_name}}
            <select v-model="town" class="form-control" v-on:change="selectChange">
                <option v-for="option in city.items" v-bind="{ value: option, id: option.town_id }">
                    {{ option.town_name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 状态配置
import * as types from '../../vuex/modules/soupei-types.js';

export default {
    name: 'SelectArea',
    props: ['areaInit'],
    data(){
        return {
            province: '',
            city: '',
            town: ''
        };
    },
    computed: {
        ...mapGetters([types.DONE_AREAS]),
        areas() {
            return this.DONE_AREAS;
        }
    },
    mounted: function () {
        this.$nextTick(() => {
            !this.areas.length 
            ? this.loadAreas() 
            : this.updataSelectState(this.areaInit);
        });
    },
    beforeDestroy() {
        this.$off('message', this.updataSelectState);
    },
    methods: {
        // 加载全国地区列表
        loadAreas() {
            this.$store.dispatch(types.FETCH_AREAS, this.selectChange);
        },
        //选择slect更新状态
        selectChange(e) {
            !e 
            ? this.updataSelectState(this.areaInit)
            : this.updataSelectState(e.target.selectedOptions[0].id);
        },
        //更新select状态
        updataSelectState(data) {
            var _this = this,
                areas = _this[types.DONE_AREAS];            
            if (!data) {
                initFn({
                    province_id: areas[0].province_id,
                    city_id: areas[0].cityItems[0].city_id,
                    town_id: areas[0].cityItems[0].items[0].town_id
                });
            }else if (typeof data == 'object') {
                initFn(_this.areaInit);
            } else {
                if (data.slice(2, 6) == '0000') {
                    provinceFn(data);
                } else if (data.slice(4, 6) == '00') {
                    cityFn(data);
                } else {
                    townFn(data);
                }
            }

            // 通知父组件
            var obj = {
                province_id: _this.province.province_id,
                city_id: _this.city.city_id,
                town_id: _this.town.town_id
            };           
            this.$emit('message', obj);

            function initFn(areaInit) {
                for (let i = 0; i < areas.length; i++) {
                    if (areas[i].province_id == areaInit.province_id) {
                        _this.province = areas[i];
                        break;
                    }
                }
                var citys = _this.province.cityItems;
                for (let i = 0; i < citys.length; i++) {
                    if (citys[i].city_id == areaInit.city_id) {
                        _this.city = citys[i];
                        break;
                    }
                }
                var towns = _this.city.items;
                for (let i = 0; i < towns.length; i++) {
                    if (towns[i].town_id == areaInit.town_id) {
                        _this.town = towns[i];
                        break;
                    }
                }
            }

            function provinceFn(id) {
                for (let i = 0; i < areas.length; i++) {
                    if (id == areas[i].province_id) {
                        _this.province = areas[i];
                        _this.city = areas[i].cityItems[0];
                        _this.town = areas[i].cityItems[0].items[0];
                        break;
                    }
                }
            }

            function cityFn(id) {
                var cityItems = _this.province.cityItems;
                for (let i = 0; i < cityItems.length; i++) {
                    if (id == cityItems[i].city_id) {
                        _this.city = cityItems[i];
                        _this.town = cityItems[i].items[0];
                        break;
                    }
                }
            }

            function townFn(id) {
                var townItems = _this.city.items;
                for (let i = 0; i < townItems.length; i++) {
                    if (id == townItems[i].town_id) {
                        _this.town = townItems[i];
                        break;
                    }
                }
            }

        }
    }
};
</script>

<style scoped>

</style>