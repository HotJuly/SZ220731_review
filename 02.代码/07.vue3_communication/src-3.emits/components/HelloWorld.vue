<template>
  <div class="hello">
    <h1 @click="click">hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
const emits = defineEmits(["abc"]);

const click=()=>{
  emits("abc",789);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
