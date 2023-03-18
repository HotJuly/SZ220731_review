<template>
  <h1>App的count:{{count}}</h1>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App',
  // provide:{
    // count:123
  // }||()=>{}
}
</script>

<script setup>
import {ref,provide} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const count = ref(6);

provide('count123',count);
// provide('a',333);
// provide('b',444);
// provide('c',{
//   d:1,
//   e:2,
//   f:3
// });

</script>

<style>
</style>
