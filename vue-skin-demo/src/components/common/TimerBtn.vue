<template>
    <button type="button" id="TimerBtn" :disabled="disabled || time > 0" v-on:click="run">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'timerBtn',
    props: {
        second: {
            type: Number,
            default: 60
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            time: 0
        };
    },
    computed: {
        text() {
            return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
        }
    },
    mounted() {
        this.$nextTick(() => {
      
        });
    },
    methods: {
        run() {
            this.time = this.second;
            console.log(this.second);
            this.timer();
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            }
        }
    }
};

</script>