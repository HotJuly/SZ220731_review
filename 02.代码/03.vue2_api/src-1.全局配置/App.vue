<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <t-button></t-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  a:3,
  mounted(){
    // console.log(this.$options.a)
    // console.log(c)
  },
  components: {
    HelloWorld:HelloWorld
  }
}
</script>

<style>
</style>
