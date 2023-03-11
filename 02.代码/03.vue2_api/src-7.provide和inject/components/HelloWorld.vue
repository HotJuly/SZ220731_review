<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>aaa:{{ aaa }}</h1>
    <h1>bbb:{{ bbb }}</h1>
    <h1>ccc中的名字:{{ ccc.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  inject:["aaa","bbb","ccc"],
  mounted(){
    setTimeout(()=>{
      this.ccc.name="laowang"
    },2000)
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
