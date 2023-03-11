<template>
  <div id="app">
    <h1>msg:{{msg}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
      msg:"我是初始化数据"
    }
  },
  mounted(){
    /*
      问题1:请问Vue更新数据是同步更新还是异步更新?
      回答:同步更新

      问题2:请问Vue更新DOM是同步更新还是异步更新?
      回答:异步更新

      nextTick
        1.他是什么?
          他是Vue框架独有的API

        2.为什么要使用这个API
          它可以延迟一个函数的执行时间
            延迟到下次DOM更新之后,才会执行

            分析:nextTick可以延迟函数的执行,那么就说明它内部使用到了异步任务

        3.使用方法
          给nextTick方法传入一个回调函数即可

        4.原理分析
          1.从打印结果来看,nextTick中一定使用到了微任务
            其实nextTick中使用的就是.then
              注意:浏览器中没有nextTick这个微任务
    
    */
  //  setTimeout(()=>{
  //   console.log(this.msg);
  //   this.msg="我是修改之后的数据"
  //   console.log(this.msg);
  //   // debugger
  //  },2000)

    Promise.resolve().then(()=>{
      console.log(1)
    })

    this.$nextTick(()=>{
      console.log(2)
    })

    Promise.resolve().then(()=>{
      console.log(3)
    })

    this.$nextTick(()=>{
      console.log(4)
    })
  }
}
</script>

<style>
</style>
