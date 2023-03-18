<template>
  <div class="hello">
    <h1>hello</h1>
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" msg="作用域"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
