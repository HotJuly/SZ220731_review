<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" a="1" b="2" @abc="()=>{}" @ddd="()=>{}"/> -->
    <HintButton content="你确定要删除吗?" size="small" type="danger" @click="click1"/>
    <HintButton content="你确定要添加吗?" size="big" type="primary" @click="click2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButton from './components/HintButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HintButton
  },
  methods:{
    click1(){
      console.log(1)
    },
    click2(){
      console.log(2)
    }
  }
}
</script>

<style>
</style>
