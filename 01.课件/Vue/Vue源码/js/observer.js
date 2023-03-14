function Observer(data) {
    // return new Observer(data);
    // this->ob对象,data->data对象
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this.walk(data);//走起
        // this->ob对象
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        // this->ob对象
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(data, "msg", "hello mvvm"); 
        // this->ob对象

        // 每次调用defineReactive方法,就会创建一个全新的dep对象
        // 也就是说data对象,每具有一个直系属性名,就会创建一个全新的dep对象
        // 总结:每个响应式属性都具有一个对应的dep对象
        var dep = new Dep();  

        // 此处出现了隐式递归,也就是defineReactive函数调用了自己的上级函数observe
        // observe是数据劫持的入口
        // 此处在对属性值进行深度递归,实现深度数据劫持
        // 深度数据劫持就是指如果属性值又是一个对象,就会继续将该对象中所有的属性进行数据劫持
        var childObj = observe(val);
        // var childObj = observe("hello mvvm");

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 注意:由于data对象本身就具有msg属性,所以此处不是在新增属性,而是在重写属性
        // 此处其实就是将data中所有的属性,都从数据描述符,变成访问描述符,让他们具有get/set方法
        //  由于data中的msg属性变成了访问描述符,那么他将会失去自己的value值
        //  但是,Vue使用闭包的形式,将value值也缓存了下来,相对这个msg属性同时具有get/set和value值

        // 目的就是可以通过此处的set方法,监视开发者修改属性值的操作
        // 如果开发者读取data对象中的msg属性,就会触发此处的get方法,会将闭包缓存的value值进行返回
        // 如果开发者修改data对象中的msg属性,就会触发此处的set方法,

        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //      如果新值与旧值相同,后续代码就不会执行
        //      只要新值与旧值相同,页面就不会重新渲染
        //         if (newVal === val) {
        //             return;
        //         }

        //         val = newVal;

        //          此处就是响应式属性的第二个创建时机
        //          如果更新给响应式属性的值是一个对象,那么就会对这个对象中所有的属性都进行数据劫持
        //         childObj = observe(newVal);
                
        //          此处在通知DOM进行更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
//   observe(data, vm);
// 此处在检查value形参有没有值,而且这个值是否是一个对象
// 如果没有值或者不是一个对象,就会进入该判断
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
    // return new Observer(data);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);
        // this->dep,sub->watcher对象
        this.subs.push(sub);
        // 此处dep对象在使用自己的subs属性,收集与自身相关的所有的watcher对象
        // 此处响应式属性在使用subs属性,收集与自身相关的插值语法
    },

    depend: function() {
        // this->dep对象
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;