<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>user.name:{{ user.name }}</h1>
  <h1>user.age:{{ user.age }}</h1>
  <h1>arr2[1]:{{ arr2[1] }}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
import { reactive } from 'vue';

const obj = {
  name:"xiaoming"
}

const user = reactive(obj);

const arr = [1,2,3,4,5];

const arr2 = reactive(arr);

setTimeout(()=>{
  // user.age = 23;
  // Vue2的写法 this.$set(user,"age",23)

  // delete user.name;

  arr2[1] = 99999;
},3000)

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
