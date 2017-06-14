<template>
    <div class="hello">
        <h1 v-bind:id="dynamicId">{{ msg }}</h1>
        <h2>{{ haha }}</h2>
        <h2>{{ 测试1 }}</h2>
        <h2>Essential Links</h2>
        <ul>
            <li><a href="https://vuejs.org"
                   target="_blank"
                   class="red">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org"
                   target="_blank">Forum</a></li>
            <li><a href="https://gitter.im/vuejs/vue"
                   target="_blank">Gitter Chat</a></li>
            <li><a href="https://twitter.com/vuejs"
                   target="_blank">Twitter</a></li>
            <br>
            <li><a href="http://vuejs-templates.github.io/webpack/"
                   target="_blank">Docs for This Template</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a href="http://router.vuejs.org/"
                   target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/"
                   target="_blank">vuex</a></li>
            <li><a href="http://vue-loader.vuejs.org/"
                   target="_blank">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue"
                   target="_blank">awesome-vue</a></li>
        </ul>
        <ol v-on:click="reverseMessage(1)">
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ol>
        <button v-on:click="reverseMessage">逆转消息</button>
        <button v-on:click="updateMessage">更新数据</button>
    
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            haha: '测试',
            测试1: '测试1',
            todos: [
                { text: '学习 JavaScript' },
                { text: '学习 Vue' },
                { text: '整个牛项目' }
            ],
            dynamicId: 'A123456',
            message: 'not updated'
        };
    },
    created() {
        // `this` 指向 vm 实例
        this.updateMessage();
    },
    methods: {
        reverseMessage(tag) {
            console.log(tag);
            console.log(event);
            this.msg = this.msg.split('').reverse().join('');
        },
        updateMessage() {
            console.log(this);
            this.message = 'updated';
            // console.log(this.$el.textContent); // => '没有更新'
            this.$nextTick(() => {
                console.log(this.$el.textContent); // => '更新完成'
            });
        }
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
