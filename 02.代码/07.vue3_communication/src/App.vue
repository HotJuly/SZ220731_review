<template>
  <HelloWorld>
    <template #default>
      <h1>我是默认插槽</h1>
    </template>
    <template #header>
      <h1>我是具名插槽header</h1>
    </template>
    <template #footer="scope">
      <h1>我是{{scope.msg}}插槽footer</h1>
    </template>
  </HelloWorld>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>
</style>
