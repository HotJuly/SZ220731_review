<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 @click="handler">aaa:{{ aaa }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    aaa:String
  },
  methods:{
    handler(){
      // this.aaa=8888;
      this.$emit('update:aaa',"我是Hello的最新数据")
    }
  },
  mounted(){
    this.$bus.$on('abc',(data)=>{
      console.log('abc',data)
    })
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
