/*
  ES6模块化的特点
    在项目中,如果多个文件都是用ES6模块化语法引入同一个文件,
      这个文件中的代码只会执行一次

*/
// 由于ES6模块化的特点,导致整个项目中只会存在一个callbacks数组
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 如果当前环境支持Promise,那么就使用Promise+.then实现nextTick
// 如果当前环境不支持Promise,那么就使用mutationObserver实现nextTick
// 如果当前环境不支持mutationObserver,那么就使用setTimeout替代微任务实现nextTick
if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}

// 无论多少个文件引用当前这个js,都只会创建一个nextTick函数
export function nextTick (cb,vm) {
  // 使用callbacks数组收集当前传入的回调函数
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  if (!pending) {
    // 无论调用多少次nextTick函数,这个判断只有第一个nextTick函数可以进入
    pending = true

    // 无论调用多少次nextTick,都只会调用一次timerFunc,也就是说只会开启一个微任务
    timerFunc()
  }
}


/*
  nextTick源码重点总结:
    1.当Vue引入nextTick.js文件的时候,会在堆内存中创建一个全项目独一无二的callbacks

    2.当用户多次调用nextTick函数的时候,
      Vue会将传入的回调函数全部收集在callbacks数组中

    3.第一次调用nextTick可以进入一个pending的判断
      在这个判断中,会使用.then方法开启一个nextTick专用的微任务

      而后续调用nextTick,是不会在进入这个判断的
      总结:也就是说无论调用多少次nextTick,都只会开启一个微任务

    4.在主线程代码结束之后,在清空微任务队列的时候,会执行nextTick专用的微任务
      在这个微任务中,Vue会遍历callbacks数组,获取到内部存储的每一个回调函数,并自动调用

*/
