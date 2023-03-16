import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';

Vue.use(VueRouter);

// 属性名有严格要求,不能乱写的对象,称为配置对象
// 面试题:请问什么是路由?
// 路由其实就是某个路径与某个组件之间的映射关系
// 顺带问下:什么是路由器
// 用来管理多个路由的对象,称为路由器
export default new VueRouter({
    mode:"hash",
    routes:[{
        path:"/home",
        component:Home
        // component:()=>import('@/components/Home.vue')
    },{
        path:"/about",
        component:About,
        meta:{
            showHeader:true
        }
    }]
});