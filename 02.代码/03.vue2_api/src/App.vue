<template>
  <div id="app">
    <!-- <h1 ref="h1">msg:{{ msg }}</h1>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/> -->
    <BigImage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  data(){
    return{
      msg:111
    }
  },
  a:1,
  mounted(){
    // console.log(this.$options.data())
    // const obj = this.$options.data();
    // obj.msg = 222;
    // console.log(obj)

    // console.log(this.$data)
    // this.$data.msg=222;

    // console.log(this.$children[0].msg)

    // console.log(this.$refs.h1)
    console.log(this.$refs.hello)
  },
  components: {
    HelloWorld,
    BigImage
  }
}
</script>

<style>
</style>
