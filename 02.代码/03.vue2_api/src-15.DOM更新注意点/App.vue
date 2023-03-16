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

      Vue2响应式更新流程:
        1.开发者修改某个代理属性的值,此时会触发该代理属性的set方法
          例如:this.isShow1 = true;

        2.在数据代理的set方法中,会自动修改$data对象中,同名的属性值,
          此时会触发数据劫持的set方法
          例如:this.$data.isShow1 = true;

        3.在数据劫持的set方法中,Vue2会调用dep.notify方法

        4.在notify方法中,会遍历dep.subs数组,获取到内部存储的多个watcher对象 
          并调用这些watcher对象的update方法

        5.在update方法中,会调用queueWatcher方法

        6.在queueWatcher方法中,
          -首先会判断当前这个watcher对象,是否已经登记过要更新了
            如果已经登记过,后续代码不触发

          -会使用queue数组,收集本次触发update方法的watcher对象

          -然后再判断当前本次执行queueWatcher方法,是否是第一次执行
            如果不是第一次执行,后续代码不执行

          -如果这是第一次执行queueWacther方法,就会将更新DOM的方法传给nextTick方法
            由于nextTick中,用的其实是微任务执行回调函数,所以更新DOM的方法触发时间是在清空微任务队列的时候

        7.在执行nextTick的微任务的时候,会触发更新DOM的方法
          -使用sort对所有要更新的watcher对象进行排序(根据watcher的id进行排序)
            watcher的id越小,层级越高,组件越大

          -使用for循环,遍历queue数组,获取到所有需要更新的watcher对象
            调用每个watcher对象的run方法,run方法中会调用cb回调函数,来让对应的组件进行更新


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
