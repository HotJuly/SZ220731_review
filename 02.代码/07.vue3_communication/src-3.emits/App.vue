<template>
  <h1>App的count:{{count}}</h1>
  <HelloWorld @abc="handler"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue'
import HelloWorld from '@/components/HelloWorld'
const count = ref(4);

const handler = (num)=>{
  count.value = num;
}

</script>

<style>
</style>
