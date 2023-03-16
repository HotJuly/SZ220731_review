<template>
  <div id="app">
    <!-- <HelloWorld v-if="isShow" msg="Welcome to Your Vue.js App"/> -->
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{ item }}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="handler">添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3,4,5]
    }
  },
  methods:{
    handler(){
      this.arr.splice(1,0,6);
    }
  },  
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
