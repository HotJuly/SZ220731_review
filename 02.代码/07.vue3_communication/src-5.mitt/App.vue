<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import myBus from '@/myBus';
import HelloWorld from '@/components/HelloWorld'

myBus.on('ccc',(data)=>{
  console.log('ccc',data)
})

</script>

<style>
</style>
