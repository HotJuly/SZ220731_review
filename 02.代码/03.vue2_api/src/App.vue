<template>
  <div id="app">
    <h1 ref="h1" v-if="isShow1">我是H1</h1>
    <h2 ref="h2" v-if="isShow2">我是H2</h2>
    <h3 ref="h3" v-if="isShow3">我是H3</h3>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      isShow1: false,
      isShow2: false,
      isShow3: false
    }
  },
  // mounted() {
  //   /*
  //     问题:Vue2更新数据是同步更新还是异步更新?
  //     回答:同步更新
    
  //     问题:Vue2更新DOM是同步更新还是异步更新?
  //     回答:异步更新
  //       更新DOM是在微任务中做的
  //       其实更新DOM是在nextTick中做的
  //        异步更新DOM的目的,就是将多次DOM更新合并为一次
  //   */
  //   this.isShow1 = true;
  //   // 这里似乎有一个看不见nextTick

  //   Promise.resolve().then(() => {
  //     console.log(1)
  //   })

  //   this.$nextTick(() => {
  //     console.log(2)
  //   })

  //   Promise.resolve().then(() => {
  //     console.log(3)
  //   })

  //   this.$nextTick(() => {
  //     console.log(4)
  //   })
  // },
  mounted() {
    /*
      nextTick会将接收到的回调函数延迟执行
        会延迟到DOM更新之后执行
    
      注意:一定要等更新数据之后,在使用$nextTick,才能得到最新的DOM节点
        因为更新响应式属性的时候,Vue会将更新DOM的函数传入nextTick中
          如果先执行$nextTick,在更新数据,那么前面$nextTick的回调函数,会在更新DOM之前执行
            将会无法获取到最新的DOM节点

      问题:请问Vue2更新DOM的范围是多大?
      回答:以组件为单位更新

      总结:
        1.整个项目第一个更新的组件,会将更新DOM的方法传入nextTick中
        2.一个组件更新多次响应式属性,也只会被queue数组收集到一次
          也就是说,即便一个组件更新了多次响应式属性,该组件也只会更新一次

        Vue会使用一个更新DOM的方法,遍历queue数组中收集到的所有需要更新的组件的watcher对象,
          一次性遍历更新
    */
    

    this.isShow1 = true;

    this.$nextTick(() => {
      console.log(this.$refs.h1,this.$refs.h2)
    })
    
    this.isShow2 = true;
  },
  components: {
    HelloWorld
  }
}
</script>

<style></style>
