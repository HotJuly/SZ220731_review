<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h3>我是X轴坐标:{{pageX}}</h3>
    <input type="text" v-model="pageY">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import moveMixin from '@/mixins/move';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      pageX:-1
    }
  },
  mixins:[moveMixin]
  // mounted(){
  //   console.log(this.$options.name)
  // }
}
</script>

<style>
</style>
