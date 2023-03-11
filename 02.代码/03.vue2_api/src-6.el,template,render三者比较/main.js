import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问Vue项目中,可以控制页面显示内的配置有几个?
  回答:
    一共有三个地方可以控制页面显示内容
    1.public文件夹中,index.html文件中的app元素内部的子节点会被作为模版解析
    2.在main.js中,new Vue的配置对象中,可以添加template配置选项,用于传入页面模版内容
    3.在main.js中,new Vue的配置对象中,可以添加render配置选项,用于传入需要渲染的组件

  面试题:请问以上三者中,优先级是如何排序的?
    优先级:render配置>template配置>el配置
*/

new Vue({
  el:"#app",
  data:{
    msg:"我是index.html文件的模版内容",
    msg1:"我是template的模版内容"
  },
  template:"<h2>{{msg1}}</h2>",
  render: h => h(App),
})
// .$mount('#app')
