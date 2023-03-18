<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>hello的count:{{ count }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props:["count"],
  // props:{
  //   count:Number
  // }
}
</script>

<script setup>
// defineProps为什么没有引入就能使用?
// Vue3将defineProps和defineEmits都注册成为了编程宏
const props = defineProps(["count","add"])
// defineProps<{
//   count:Number
// }>();

setTimeout(()=>{
  // console.log(props.count)
  props.add(6)
},3000)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
