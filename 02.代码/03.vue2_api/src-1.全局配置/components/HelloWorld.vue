<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// 每个.vue文件,暴露出去的其实都是配置对象,不是组件实例对象
export default {
  name: 'HelloWorld',
  a:2,
  props: {
    msg: String
  },
  mounted(){
    // console.log(this.$options.a)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
