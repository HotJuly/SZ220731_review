<template>
  <div class="hello">
    <h1>hello:{{ count }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // setup(){
  //   const a=1;
  // }
}
</script>

<script setup>
import { ref , defineExpose} from 'vue';

const count = ref(111);
const count2 = ref(222);

defineExpose({
  count:count
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
