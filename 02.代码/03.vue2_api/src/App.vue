<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      msg:123
    }
  },
  components: {
    HelloWorld
  },
  // 生命周期不是我们创建的,我们只是写了生命周期钩子函数
  // 生命周期是一个特殊的时间点,不是一个函数
  // 能区分出这么多生命周期时间点,说明他们之前一定做了一些特殊的事情
  // mounted(){
  //   console.log(this.$options.name)
  // },
  beforeCreate(){
    console.log('---------App beforeCreate--------')
  //   console.log('---------beforeCreate--------',this,this.$data,this.msg,this.$el)
  },
  created(){
    console.log('---------App created--------')
  //   console.log('---------created--------',this,this.$data,this.msg,this.$el)
  },
  beforeMount(){
    console.log('---------App beforeMount--------')
    // console.log('---------beforeMount--------',this,this.$data,this.msg,this.$el)
    // $vnode属性中,存放的父组件的虚拟DOM
    // _vnode属性中,存放的是当前组件的虚拟DOM
    // console.log('---------beforeMount--------',this.$vnode,this._vnode)
  },
  mounted(){
    console.log('---------App mounted--------')
    // console.log('---------mounted--------',this.$vnode,this._vnode)
  }
}
</script>

<style>
</style>
