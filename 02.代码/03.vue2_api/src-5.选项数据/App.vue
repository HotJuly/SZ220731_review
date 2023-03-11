<template>
  <div id="app">
    <!-- <HelloWorld :msg="msg123" :fn="$options.fn1"/> -->
    <HelloWorld :msg="msg123" :fn="fn2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      msg123:"我是App的数据"
    }
  },
  components: {
    HelloWorld
  },
  fn1(data){
    console.log('fn1',data,this)
    // this.hasdghjsa = data;
  },
  methods:{
    fn2(data){
      console.log('fn1',data,this)
      // this.hasdghjsa = data;
    }
  }
}
</script>

<style>
</style>
