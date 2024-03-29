# VueRouter

1. 对VueRouter的理解
   1. 他是一个npm包,是Vue框架的可扩展插件库(Vue.use)
   2. 它可以实现单页面应用(SPA)
      1. **问题:什么是单页面应用?**
      2. **回答:页面指的就是html文件,那么单页面应用就是说当前项目中只有一个html文件**
         1. **单页面应用只所以可以看到非常多的内容切换,其实是使用了DOM的增删改查方法,对页面结构进行了操作,从而达到不同内容的切换效果**
      3. 问题:不使用VueRouter,光使用Vue能否实现单页面应用?
      4. 回答:可以,使用v-if,v-show或者component动态组件都可以实现所谓的单页面应用
      5. 问题:请问大家是否做过多页面项目?
      6. 回答:例如一阶段学的尚品汇项目,多页面项目其实是一种比较老的项目架构

2. VueRouter提供给我们什么东西?
   1. 构造函数
      1. 通过VueRouter构造函数,可以创建出一个路由器对象
   2. 全局组件
      1. router-view组件
         1. 用处:用来显示匹配当前地址的路由的对应路由组件
         2. **原理:其实是使用到了响应式原理实现的**
            1. 它内部会使用到响应式属性path,如果该属性的值发生变化,那么router-view组件就会update,更新出最新的结果进行渲染
      2. router-link组件
         1. 用处:会在页面上默认生成a标签,并跳转到指定的to路由地址下
         2. **声明式导航定义:通过标签的形式,引导用户进行跳转,这类操作称为声明式导航**
         3. **原理:**
            1. **VueRouter会给link组件生成标签,绑定一个点击事件**
            2. **在点击事件的回调函数中,禁用当前标签的默认行为(像是a标签的跳转页面功能)**
            3. **并在回调函数中,调用编程式导航中的push方法,实现路由跳转功能**
   3. 公共对象
      1. $router
         1. 这是一个路由器对象,其实就是new VueRouter创建的那一个
         2. 路由器对象身上,一般会提供一些操作当前路由的方法(API)
         3. push方法
            1. 用处:可以控制当前页面跳转到指定路由,他会保留上个历史记录,并将当前跳转的路由放入历史记录栈
               1. 简单来说,就是按返回按钮,可以回到上个路由
            2. **编程式导航定义:通过js的API,强行控制用户跳转,这类操作称为编程式导航**
            3. 原理:
               1. hash模式下
                  1. 其实是使用了**window.location.assign('/#/about')**方法实现路由跳转的控制
               2. history模式下
                  1. 其实是使用了**window.history.pushState({},"",'/about')**方法实现路由跳转的控制
         4. replace方法
            1. 用处:可以控制当前页面跳转到指定路由,他会覆盖上个历史记录,不会保留上次的路径
               1. 简单来说,就是按返回按钮,无法回到上个路由,而是返回上上个路由
            2. 原理:
               1. hash模式下
                  1. 其实是使用了**window.location.replace('/#/about')**方法实现路由的跳转控制
               2. history模式下
                  1. 其实是使用了**window.history.replaceState({},"",'/about')**方法实现路由跳转的控制
      2. $route
         1. 这是一个路由对象
         2. 路由对象身上,一般会提供当前所在路由相关的信息
         3. fullpath属性
            1. 代表当前路由的完整路径
         4. query属性
            1. 他是URL传参的一员
            2. 格式:'/home?key=value'
         5. params属性
            1. 他是URL传参的一员
            2. 格式:'/home/1000'
            3. 注意:想要正常使用params传参,需要在声明路由的时候,在path属性中填写占位符
               1. 例如:path:'/home/:id'
         6. meta属性
            1. 他不是URL传参的一员
            2. 需要在配置路由对象的时候,在path属性同级的地方,书写meta属性,进行传参

3. 我们提供给VueRouter什么东西?
   1. 配置对象
      1. mode属性
         1. 可以控制当前VueRouter的路由模式
         2. hash模式
            1. 优点:
               1. 兼容性非常好,兼容到IE6
               2. 在上线的时候,不需要做任何特殊的配置
                  1. 因为无论用户在哪个路由地址下刷新页面,请求的都是服务器的/路径
            2. 缺点:
               1. 丑就是原罪.路径中有#不好看
               2. 由于hash模式,原理其实就是锚点功能,所以使用hash模式的话,会导致锚点功能无法正常使用
            3. **原理:**
               1. **通过给window对象,绑定事件,来监视地址栏中地址的变化**
                  1. **事件名称:hashchange**
                  2. **在事件回调函数中,可以通过location.hash属性获取到当前地址栏中最新的路由地址**
               2. **将流程1中获取到的最新的路由地址,赋值给响应式属性path即可**
         3. history模式
            1. 优点:
               1. 颜值就是正义,路径中没有#
               2. 锚点功能可以正常使用
            2. 缺点
               1. 兼容性比较差,它内部的原理其实是用到了HTML5的新特性,history对象
               2. **在上线的时候,需要服务器做出特殊配置**
                  1. **问题:用户在观看某个路由的时候,如果刷新当前页面,浏览器就会误将前端路由当作后端路由,发送请求后端服务器,服务器没有该接口,就会返回响应状态码404,页面显示失败**
                  2. **解决流程:**
                     1. **用户在观看某个路由的时候,如果刷新当前页面,浏览器依旧会误将前端路由当作后端路由,发送请求后端服务器**
                     2. **服务器如果接收到自己没有配置的接口请求,统一返回index.html文件**
                     3. **浏览器接收到html文件之后,会开始解析该页面,会发现该页面需要请求一个js文件,会再次请求服务器,获取对应的main.js文件**
                     4. **服务器返回main.js文件,浏览器接收到后,自动执行内部代码**
                     5. **main.js文件被执行,那么它内部的VueRouter代码就会生效,VueRouter会自动获取地址栏中的路由路径,并进行解析**
                     6. **最终VueRouter代码,会将解析之后的结果显示在页面上**
            3. **原理:**
               1. **通过给window对象,绑定事件,来监视地址栏中地址的变化**
                  1. **事件名称:popstate**
                  2. **在事件回调函数中,可以通过location.pathname属性获取到当前地址栏中最新的路由地址**
               2. **将流程1中获取到的最新的路由地址,赋值给响应式属性path即可**
               3. **注意:popstate事件只能在使用浏览器的前进后退按钮时候才能触发,所以pushState和replaceState方法都没办法触发这个事件回调函数,所以在push和replace两个方法中,history模式下需要多出一行代码,这行代码的目的就是为了主动修改响应式属性path,来更新页面**
      2. routes属性
         1. 数据类型:RouteObj[]
         2. 路由对象中的重要属性
            1. path属性
               1. 代表当前路由的地址
            2. component属性
               1. 代表当前路由对应显示的路由组件

4. 导航守卫

   1. 一共有三大类,一共有7个导航守卫

      1. 个人理解,导航守卫就是一种新式的生命周期

   2. 全局守卫

      1. 全局前置守卫(beforeEach)

         1. 在路由跳转之前触发

      2. 全局解析守卫(beforeResolve)

         1. 该守卫主要是对付异步组件的
         2. 一般没有什么用

      3. 全局后置守卫(afterEach)

         1. 在路由跳转到达目的地之后再触发

      4. ```javascript
         router.beforeEach((to, from, next) => {
           //to->想去哪
           //from->从哪来
           //next->放行的函数
         	//next()->想去哪就去哪
           	//next(false)->从哪来回哪去
             //next('/login')->强行控制跳转到某个路由
         })
         ```

         ​

   3. 路由独享守卫

      1. 进入当前路由之前,会触发的守卫

      2. ```javascript
         const router = new VueRouter({
           routes: [
             {
               path: '/foo',
               component: Foo,
               beforeEnter: (to, from, next) => {
                 // ...
               }
             }
           ]
         })
         ```

         ​

   4. 组件守卫

      1. 组件进入守卫

         1. 进入该组件之前触发

      2. 组件更新守卫

      3. 组件离开守卫

         1. 可以监视离开组件这个操作,离开组件的时候会触发

      4. ```javascript
         export default {
           data(){
             return{
               msg:123
             }
           },
           beforeRouteEnter(to, from, next) {
             // 在渲染该组件的对应路由被 confirm 前调用
             // 不！能！获取组件实例 `this`
             // 因为当守卫执行前，组件实例还没被创建
           },
           beforeRouteUpdate(to, from, next) {
             // 在当前路由改变，但是该组件被复用时调用
             // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
             // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
             // 可以访问组件实例 `this`
           },
           beforeRouteLeave(to, from, next) {
             // 导航离开该组件的对应路由时调用
             // 可以访问组件实例 `this`
           }
         }
         ```

         ​