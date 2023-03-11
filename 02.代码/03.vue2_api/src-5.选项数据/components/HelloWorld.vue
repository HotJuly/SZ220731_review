<template>
  <div class="hello">
    <h1 @click="handler">{{ msg }}</h1>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
    <h2>{{msg333}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ["msg", "fn"],
  // props:{
  //   msg:Number
  // },
  data() {
    // {}->new Object
    return {
      _msg111: 123,
      // a:2333,
      user: Object.freeze({
        name: "xiaoming"
      }),
      msg222: "777"
    }
  },
  mounted() {
    // console.log(this._msg111)
    // console.log(this.user.name)
    // this.user.name = 7777;
  },
  methods: {
    handler() {
      this.fn('我是来自子组件的数据')
    }
  },
  /*
    面试题:请问computed和watch的区别
    回答:
      1.相同点
        -他们的基本语法都相同
          computed和watch中存放的都是对象,对象内部会存放很多个方法

        -他们都可以监视某个属性值的变化,如果监视的属性值发生变化,那么对应的函数就会重新执行

      2.不同点
        -使用场景
          computed
            个人认为,如果我现在想要一个值,可惜我手头没有,不过我可以通过现有的数据计算得到
            例如:购物车的全选按钮,总价,总数等功能

          watch
            个人认为,如果一个属性值发生变化,我就要做一些事情(函数/代码)
            例如:三级列表联动的监视,分页功能

          个人理解,computed更注重于结果,watch更注重于过程

        -缓存问题
          多次使用computed,他不会每次都执行回调函数计算结果
            如果监视的数据没有发生变化,那么回调函数就不会再次执行,computed会复用上次的计算结果
          watch的返回值没有任何作用,所以他不存在缓不缓存的问题

        -回调函数的执行时机
          computed由于首次挂载就要显示在页面上,所以组件初始化阶段就需要执行回调函数
          watch是监视数据的变化,也就是说必须有旧的数据和新的数据的变化,才会执行回调函数
            所以watch默认情况下,是跟着update走的
              如果在配置对象中,添加immdiate:true就可以让watch在组件初始化的时候执行
              watch是浅监视,他只能见识到属性值的变化,如果属性值是一个对象就无法发现内部属性的变化
                除非使用deep:true才能实现深度监视
  
  */
  computed: {
    msg333(){
      console.log(1)
      return this.msg222 *3;
    }
  },
  watch: {
    msg222(){
      console.log('msg222 变了')
    }
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
}</style>
