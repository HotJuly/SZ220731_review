<template>
  <h1>App的count:{{count}}</h1>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App',
  // provide:{}||()=>{}
}
</script>

<script setup>
import {ref,provide} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const count = ref(6);

provide('count123',count);

</script>

<style>
</style>
