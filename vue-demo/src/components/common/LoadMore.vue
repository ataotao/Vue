<template>
    <div class="load-more">
        <!--加载更多-->
        <button class="btn btn-primary" v-on:click="updataState" v-text="!state ? '加载更多' : '收起菜单'"></button>
    </div>
</template>

<script>
export default {
    name: 'LoadMore',
    props: ['loadData', 'num'],
    data(){
        return {
            state: true
        };
    },
    computed: {
        moreDataFilter() {
            if(this.state){
                return this.loadData;
            }else{
                return this.loadData.slice(0, this.num);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.updataState();
        });
    },
    beforeDestroy() {
        this.$off('message', this.updataState);
    },
    methods: {
        // 更新状态
        updataState() {
            this.state = !this.state;
            this.$emit('message', this.moreDataFilter);
        }
    }
};
</script>

<style scoped>

</style>