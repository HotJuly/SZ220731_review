<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>hello的v-model数据:{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
defineProps(["modelValue","msg"])
const emits = defineEmits(["update:msg"])

setTimeout(()=>{
  emits('update:msg',777)
},3000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
