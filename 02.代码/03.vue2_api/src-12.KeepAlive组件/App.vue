<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <A v-if="isShow"/>
    <B v-else/>
    <button @click="isShow=!isShow">切换</button> -->

    <!-- 动态组件写法 -->
    <!-- <component :is="showComponent"></component>
    <button @click="handler">切换</button> -->

    <!-- keep-alive组件使用 -->
    <!-- 
        v-if是不解析该节点,会导致组件出现多次挂载和卸载
        v-show是解析该节点,但是使用css样式隐藏和显示该节点,只会挂载一次组件
        keep-alive
          被keep-alive包裹的组件,会失去他们的卸载阶段,同时也丧失他们再次挂载的能力
          他与v-if和v-show又不同,keep-alive组件会将即将被卸载的内部组件的组件实例对象缓存起来
            留给下一次使用,也就是下次想要再次显示某个内部组件,会直接复用上次缓存的组件实例对象,不需要重新挂载

          include属性->可以缓存名称匹配的组件(名称指的是组件配置对象的name)
          exclude属性->可以不缓存名称匹配的组件(名称指的是组件配置对象的name)
          max属性->可以控制KeepAlive一共缓存多少个组件实例对象
                如果达到上限,那么活跃度最低组件实例会被销毁
     -->
    <keep-alive exclude="A" max="3">
      <A v-if="isShow"/>
      <B v-else/>
    </keep-alive>
    <button @click="isShow=!isShow">切换</button>

    <!-- 这是Vue2写法 -->
    <!-- <KeepAlive>
      <router-view></router-view>
    </KeepAlive> -->

    <!-- 这是Vue3写法 -->
    <!-- <router-view>
      <template>
        <KeepAlive></KeepAlive>
      </template>
    </router-view> -->

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return{
      isShow:true,
      showComponent:A
    }
  },
  methods:{
    handler(){
        this.showComponent = B;
    }
  },
  components: {
    HelloWorld,
    A,
    B
  }
}
</script>

<style>
</style>
