<template>
  <div id="app">
    <h1>APP的aaa:{{aaa}}</h1>
    <h1 v-pre>APP的aaa:{{aaa}}</h1>
    <h1 v-once>APP的aaa:{{aaa}}</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" :aaa.sync="aaa"/> -->
    <HelloWorld msg="Welcome to Your Vue.js App" :aaa="aaa" @update:aaa="(data)=>aaa=data"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      aaa:"我是APP的初始数据"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    // mounted的执行顺序,是子组件先执行mounted,再到父组件的mounted
    // 所以APP这边只能发布消息,订阅的话得不到数据
    this.$bus.$emit('abc',666)
  }
}
</script>

<style>
</style>
