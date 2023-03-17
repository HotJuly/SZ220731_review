<template>
  <h1>count:{{count}}</h1>
  <button @click="add">加一操作</button>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
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
import {ref} from 'vue'
// setup标签其实是一个语法糖
// 当解析.vue文件的时候,webpack会将setup标签中的内容变成setup生命周期钩子函数
// setup标签中,所有的直系变量都会自动暴露出去,给模版进行使用

/*
  ref的使用
    返回值:是一个Ref对象
      ref对象具有一个value属性,具有响应式效果

    1.可以将基本数据类型的数据传入ref函数中,将其变为响应式数据

    使用方法:
      1.在template中使用
        Vue在模版中遇到Ref对象,他会自动读取该对象的value进行展示

      2.在js代码中
        在写代码的时候,如果想要读取或者修改Ref中的值,必须自己写好.value属性写法

*/

let count = ref(0);
// console.log(count)

const add = ()=>{
  count.value++;
  console.log(count)
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
