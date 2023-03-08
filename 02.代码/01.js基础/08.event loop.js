/*
    setTimeout
        第一个参数必须是函数,代表延迟一段时间需要执行的代码
        第二个参数必须是数组,代表要延迟多久执行(单位是ms)
            这个参数取值范围1-无限大
                你写0,结果也是1

    node事件轮询机制
        1.node中,宏任务是分等级的(一共分为6级,其实就是6个队列)
            其实这6个阶段,就是6个宏任务队列
            注意:
                1.宏任务的执行顺序,先看阶段,再看开启顺序
                2.进入某个阶段,并不代表要清空这个阶段,有的宏任务还没有满足条件,是不能执行的

        2.node轮训机制的起点是1号阶段,专门负责定时器的
            休息区在4号阶段,专门负责文件I/O的

            注意:轮询一定是从1->6阶段,再回到1号阶段,再1->6,不存在跳阶段的可能性

*/

// const fs = require("fs");
// setTimeout(() => {
//   console.log(1);
// }, 0);

// fs.readFile("./01.原型相关.html", () => {
//   console.log(2);

//   setTimeout(() => {
//     console.log(3);
//   }, 0);

//   setImmediate(() => {
//     console.log(4);
//   });
// });

// setImmediate(() => {
//   console.log(5);
// });

// setTimeout(()=>{
//     console.log(3)
// },0)

//------------------------------------
// .then本身就是VIP了,而nextTick是SVIP
// 如果同时存在.then的微任务和nextTick的微任务,优先执行nextTick的微任务
// node具有2个微任务队列,一个是.then专用,一个是nextTick专用
// Promise.resolve().then(()=>{
//     console.log(1)

//     process.nextTick(()=>{
//         console.log(2)
//     })
    
//     Promise.resolve().then(()=>{
//         console.log(3)
//     })
    
//     process.nextTick(()=>{
//         console.log(4)
//     })
// })


process.nextTick(()=>{
    console.log(1)
    
    Promise.resolve().then(()=>{
        console.log(2)
    })

    process.nextTick(()=>{
        console.log(3)
    })
    
    Promise.resolve().then(()=>{
        console.log(4)
    })
    
})

// 写for循环的目的,是为了让主线程代码执行时间超过1ms,保证定时器的顺序正确
for (let index = 0; index < 200000; index++) {}
