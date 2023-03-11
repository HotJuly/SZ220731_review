import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// Vue.config.devtools = true;
/*
  需求:将每个组件配置对象中的a属性实现*2效果
  解决方案:
    在Vue中,如果想要统一修改所有组件的配置对象,可以使用自定义合并策略
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // console.log(parent, child, vm)
//   return child / 2
// }

/*
  面试题:请问你在项目开发的时候,是如何捕获项目中出现的报错的?
  回答:
    1.try...catch...
    2.Promise的catch方法
    3.Vue组件生命周期errorCaptured
    4.Vue.config.errorHandler

  面试题:请问在项目上线之后,你是如何知道项目出现了哪些报错的?
    问题:如何知道运行在千里之外的项目,出现了什么报错
      1.使用Vue.config.errorHandler方法,捕获到项目中出现的报错

      2.在错误的回调函数中,可以使用ajax相关技术,将错误信息全部发回公司服务器
        公司会给出接口,用于收集出现的报错

      3.最终,公司会将收集到的错误,全部汇总到报错的相关平台工具上(例如:禅道,TAPD等)

      扩展:请问项目中出现了报错,你会做什么?
        1.如果出现的与金钱无关的bug,仅仅是显示问题
          先解决这个显示BUG之后,在重新上线一般最新版本的代码

        2.如果出现的是与金钱相关的bug
          先讲项目服务器暂停,回退代码到上个版本,再上线(先让用户使用旧版本的效果)
          然后再抓紧解决bug,最后上线新版代码

*/
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
// }
Vue.config.ignoredElements = [
  'About',
  /^t-/
]

new Vue({
  render: h => h(App),
}).$mount('#app')
