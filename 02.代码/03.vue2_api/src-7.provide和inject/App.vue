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
