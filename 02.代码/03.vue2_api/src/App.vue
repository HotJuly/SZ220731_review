<template>
  <div id="app">
    <h1>msg:{{msg}}</h1>
    <h2>user.name:{{user.name}}</h2>
    <h2>user.age:{{user.age}}</h2>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"我是AAA",
      user:{
        name:"xiaoming"
      }
    }
  },
  mounted(){
    /*
      响应式属性和非响应式属性
        1.他们是什么?
          响应式属性是指,当开发者修改属性值的时候,页面会自动展示出最新的数据
          非响应式属性是指,当开发者修改属性值的时候,页面依旧展示之前的数据

        2.响应式属性的创建时机
          一共有2个
            1.在组件初始化的时候,Vue会将data返回对象中的所有属性名进行响应式处理
            2.在更新某个响应式属性的时候,如果属性值是对象类型,那么该对象中所有的属性都会变成响应式的

          注意:如果真的需要给一个对象添加属性,先添加完再更新更指定的响应式属性

        3.如何快速区分一个属性是否是响应式属性?
          打印这个对象,查看对象中属性值的展示形式
            如果属性值是(...),那么就说明当前属性是一个响应式属性
            如果属性值是33这种原值,那么就说明当前属性是一个非响应式属性

        4.如何在错过以上两个时间点,还能新增响应式属性
          Vue.set( target, propertyName/index, value )
          this.$set( target, propertyName/index, value )
          Vue.observable(object)


      Vue2中存在的BUG
        1.新增属性很有可能不是响应式属性
          所以解决方法用Vue.set或者this.$set都可以解决

        2.删除响应式属性,页面不会有任何变化
          Vue.delete或者this.$delete方法可以解决
    */
   setTimeout(()=>{
    // this.msg="我是BBB"

    // this.user.name="xiaowang"
    // this.user.age = 23;

    // this.user = {
    //   name:"xiaowang",
    //   age:24
    // }

    // const user = {
    //   name:"xiaowang666"
    // }


    // this.user = user;

    // user.age = 33;
    // this.$set(this.user,'age',33);

    // console.log(this.user)


    //-------------------------------
    // delete this.user.name
    this.$delete(this.user,'name')
    console.log(this.user)
   },2000)


  //  setTimeout(()=>{
    // this.user.age=66;
    // console.log(this.user)
  //  },4000)
  }
}
</script>

<style>
</style>
