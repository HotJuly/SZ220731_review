<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>hello的count123:{{count123}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // inject:["count123"]
}
</script>

<script setup>
import {inject} from 'vue';

const count123 = inject("count123");

setTimeout(()=>{
  count123.value = 999;
},2000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
