<template>
  <div class="hello">
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {useAttrs} from 'vue';

defineProps(["b"])
defineEmits(['ddd'])
const attrs = useAttrs();
console.log(attrs)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
