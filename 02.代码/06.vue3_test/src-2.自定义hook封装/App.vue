<template>
  <h1>pageX:{{pageX}}</h1>
  <h1>pageY:{{pageY}}</h1>
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

<script setup>
import moveHook from './hooks/moveHook';
// import { ref , onMounted ,onBeforeUnmount} from 'vue';

// const pageX= ref(0);
// const pageY= ref(0);

// const handler = ({clientX,clientY})=>{
//   // console.log('handler')
//   pageX.value = clientX;
//   pageY.value = clientY; 
// }

// onMounted(()=>{
//   document.addEventListener('mousemove',handler)
// })

// onBeforeUnmount(()=>{
//   document.removeEventListener('mousemove',handler)
// })


const {pageX,pageY} = moveHook();

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
