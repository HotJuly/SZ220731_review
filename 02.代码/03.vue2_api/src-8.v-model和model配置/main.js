import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问主流框架的数据流向?
    Vue->单向数据流(伪双向数据流)
      Vue中有双向数据绑定,指的是v-model这个指令
      v-model看起来是用户修改input框的值,就会立即修改data中的数据
        但其实原理上,是用户输入数据会触发input事件,事件回调函数中会修改data中的数据

    React->单向数据流
    小程序->单向数据流

*/

new Vue({
  render: h => h(App),
}).$mount('#app')
