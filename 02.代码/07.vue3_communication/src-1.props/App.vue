<template>
  <HelloWorld :count="count" :add="add"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue';
import HelloWorld from '@/components/HelloWorld'
const count = ref(3);

// Vue2必须将函数声明在methods中,目的就是让methods中的函数this全部指向当前组件实例对象
// 后续方便通过函数中的this找到当前组件实例,然后修改状态数据

// 然后Vue3中,子向父传参的原理从改变this指向,变成了使用闭包来修改父组件的数据
const add = (num)=>{
  count.value+=num;
}

</script>

<style>
</style>
