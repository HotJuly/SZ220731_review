<template>
  <div class="hello">
    <h1 @click="handler">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String
  },
  methods:{
    handler(){
      this.$emit('input789',"我是Hello的数据")
    }
  },
  model:{
    prop:"msg",
    event:"input789"
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
