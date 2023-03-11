import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  需求:当所有组件挂载的时候,打印当前组件名称
  回答:可以使用混合/混入来实现该功能
    全局混合->写的内容会作用于所有组件
    局部混合->写的内容会作用于个别组件

    如果同时存在多个相同生命周期钩子函数,那么全局混合,局部混合以及组件内置的钩子函数都会共存
      执行顺序:全局混合>局部混合>组件内置


    如果全局混合,局部混合,还有组件内部出现了同名的data,methods,computed等内容
      优先级是组件内置最高>局部混合>全局混合
*/
Vue.mixin({
  mounted(){
    console.log('全局混合',this.$options.name)
  }
})

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
