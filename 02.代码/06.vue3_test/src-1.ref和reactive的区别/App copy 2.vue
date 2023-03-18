<template>
  <h1>obj.name:{{obj.name}}</h1>
  <h1>user.name:{{user.name}}</h1>
  <button @click="changeName">改名操作</button>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // setup(){
  //   /*
  //     setup生命周期
  //       他是最早执行的一个生命周期函数
  //       它内部没有this,this指向undefined
  //       所以在Vue3开发的时候,绝大多数代码都是在setup中写,但是不会使用this
  //       setup中会书写组合API
  //   */
  //   console.log('---------setup----------',this)
  // },
  // beforeCreate(){
  //   console.log('-----------beforeCreate------------',this)
  // },
  // created(){
  //   console.log('-----------created------------',this)
  // }
}
</script>

<script setup>
import {reactive} from 'vue'

/*
  reactive的使用
    reactive函数需要接收一个对象数据类型
    返回值:一个代理对象
    此处一共存在两个对象
      元对象是不具有响应式效果的一个普通对象,但是他身上存有数据
      代理对象是一个具有响应式效果的对象,但是他身上没有数据
        只要当前操作经过代理对象,那么本次操作一定具有响应式效果


    注意:
      1.元对象没有响应式效果,千万不要去操作他

*/
// 这个对象称为元对象,就是真正存有数据的对象
let obj = {
  name:"xiaoming"
}

// 这个对象称为代理对象,他没有数据,
// 开发者对他做的任何事情,他都会对元对象进行操作
// 该对象具有响应式效果
let user = reactive(obj);

// console.log(user,obj)

const changeName = ()=>{
  // obj.name="laowang";
  user.name="laowang";
  console.log(obj)
}
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
