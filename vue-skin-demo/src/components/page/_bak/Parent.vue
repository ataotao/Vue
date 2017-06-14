<template>
    <div class="parent">
        <h2>Parent</h2>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'Parent',
    data() {
        return {
            transitionName: 'slide-left'
        };
    },
    // dynamically set transition based on route change
    watch: {
        $route(to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./../assets/css/config.scss";
#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
/* 上面是为了保证滑动的时候不出现抖动情况 */
.child-view {
    position: absolute;
    left:0;
    top: 0;
    height: 100%;
    width: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    background-color: #f2f2f2;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
/* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition-delay: .5s;
    -webkit-transition-delay: .5s;
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    transition-delay: .5s;
    -webkit-transition-delay: .5s;
}
.slide-enter-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
.slide-leave-active {
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* 然后写上切换时候的类名的CSS变化(这里最好看一下VUE的transition文档) */
</style>
