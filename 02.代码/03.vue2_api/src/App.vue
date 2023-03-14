<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>arr[1]:{{arr[1]}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3,4]
    }
  },
  mounted(){
    setTimeout(()=>{
      // this.arr[1] = 9;
      // splice方法可以修改数组数据的同时,还会强制页面更新
      // this.arr.splice(1,1,9);
      // console.log(this.arr)
      // console.log(this.arr)

      const arr = [3,4,5,6];
      // arr.splice(1,1,9);
      console.log(arr)
    },3000)
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
