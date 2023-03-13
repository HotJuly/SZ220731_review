<template>
  <div id="app">
    <h1>user.name:{{ user.name }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "我是APP的数据",
      user: {
        name: "xiaoming"
      }
    }
  },
  // provide:{
  //   aaa:111,
  //   bbb:this.msg
  // },
  // 如果provide是一个函数,那么他的执行时机就会是在data函数执行之后
  // data函数会在组件创建实例对象的时候才会调用
  provide() {
    return {
      aaa: 111,
      bbb: this.msg,
      ccc: this.user
    }
  }
}
</script>

<style></style>
