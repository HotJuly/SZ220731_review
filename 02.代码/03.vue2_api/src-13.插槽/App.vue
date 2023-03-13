<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是具名插槽</h1>
      </template>
      <!-- v-slot指令的缩写是# -->
      <!-- <template #footer="scope"> -->
      <template #footer="{msg}">
        <h1>我是作用域插槽,我是{{msg}}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style></style>
