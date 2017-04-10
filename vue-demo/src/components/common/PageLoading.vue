<template>
    <div class="page-loading">
        <p><span class="iconfont icon-soupei double-flash f160"></span></p>
        <p class="f24">正在加载...</p>
    </div>
</template>

<script>
export default {
    name: 'PageLoading'
};
</script>

<style scoped>
.page-loading {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.85);
    padding-top: 25%;
}

.page-loading p {
    text-align: center;
}

.double-flash {
    animation: double-flash_5308 3s ease infinite;
}

@keyframes double-flash_5308 {
    0% {
        opacity: 1
    }
    12.5% {
        opacity: 0
    }
    25% {
        opacity: 1
    }
    37.5% {
        opacity: 0
    }
    50% {
        opacity: 1
    }
    100% {
        opacity: 1
    }
}
</style>