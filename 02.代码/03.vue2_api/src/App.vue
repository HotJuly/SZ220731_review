<template>
  <div id="app">
    <HelloWorld v-if="$route.meta.showHeader" msg="Welcome to Your Vue.js App"/>
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link tag="h1" to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    toAbout(){
      this.$router.push("/about");
      // this.$router.replace("/about");
    }
  },
  mounted(){
    // console.log(this.$route.meta)
  }
}
</script>

<style>
</style>
