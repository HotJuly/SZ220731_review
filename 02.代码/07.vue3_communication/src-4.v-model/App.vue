<template>
  <h1>App的count:{{count}}</h1>
  <HelloWorld v-model:msg="count"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import { ref } from 'vue';
import HelloWorld from '@/components/HelloWorld'

const count = ref(6);

</script>

<style>
</style>
