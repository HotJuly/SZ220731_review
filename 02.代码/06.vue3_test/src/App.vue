<template>
  <h1>obj.name:{{obj.name}}</h1>
  <h1>user1.name:{{user1.name}}</h1>
  <h1>user2.name:{{user2.name}}</h1>
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
import {ref,reactive} from 'vue'

/*
  ref和reactive的区别
    ref负责对基本数据类型实现响应式效果
    reactive负责对对象数据类型实现响应式效果

    注意:其实ref也可以对对象使用
      ref函数,如果接收到了一个对象,那么他还是返回Ref对象,不过他的value值里面会存放一个代理对象
        这个代理对象其实是通过reactive生成的,ref函数会把元对象,传给reactive函数进行处理

    使用场景:
      1.如果只是修改某个对象身上的属性值,没有替换全新的对象
        那么就选择使用reactive,因为reactive读取或者修改属性,都不需要写.value,语法简单

      2.如果未来需要更换对象
        那么就选择使用ref,因为ref他的value属性是响应式的,如果给他赋值一个全新的对象
          全新的对象也会具有响应式效果

    总结:reactive能做到的事情,ref都能做到
*/

// 这个对象称为元对象,就是真正存有数据的对象
let obj = {
  name:"xiaoming"
}

let user1 = ref(obj);
// console.log(user1)

let user2 = reactive(obj);

const changeName = ()=>{
  // user1.value.name="laowang6666";
  // user2.name="laowang6666";

  // user1.value={
  //   name:"老驴77776"
  // }

  user2={
    name:"老驴77776"
  }
  console.log(user2)
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
