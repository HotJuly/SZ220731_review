<template>
  <div id="app">
    <input type="text" v-model="msg">
    <!-- <input type="text" :value="msg" @input="(event)=>msg=event.target.value"> -->

    <HelloWorld v-model="msg"/>
    <!-- <HelloWorld :value="msg" @input="(data)=>msg=data"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"我是APP的初始数据"
    }
  }
}
</script>

<style>
</style>
