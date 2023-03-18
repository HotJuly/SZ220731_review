<template>
  <HelloWorld ref="hello111"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import { ref , onMounted} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const hello111 = ref();

onMounted(()=>{
  console.log('hello111',hello111.value.count)
  console.log('hello111',hello111.value.count2)
})

</script>

<style>
</style>
