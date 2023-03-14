function MVVM(options) {
  /*
    this->实例对象vm
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  // Vue1中的this._data,其实就是Vue2中的this.$data
  // 也就是说_data中会存放真正的状态数据
  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);
  // var data = this.$options.data;

  var me = this;

  /*
    MVVM源码第一部分:数据代理
    代理:我们找代理商拿货,代理商会找厂家拿货,最后代理商把从厂家那边得到的货物转交给我们
        从我们的角度来看,代理商是有货的,但是实际上他没有货,真正有货的是厂家

    理解:
      数据代理就是根据data对象的属性名,给vm对象也添加一份同名属性
        注意:属性是跟着对象走的,多个对象可以具有相同的属性名,但是他们绝对不是同一个属性
            只是对vm进行了操作,对data对象没有做任何事情

    目的:
      1.只是为了简化开发者的代码书写
        由于所有的状态数据都是存在data对象中,如果没有数据代理,那么开发者就算需要每次都this.$data.属性名获取数据

    次数:2次(与data对象中存在的直系属性名个数有关)

    流程:
      1.使用Object.keys方法,获取到了data对象中,所有的直系属性名组成的数组,并进行遍历
      2.在遍历得到每个属性名的过程中,会执行vm._proxy方法,并传入这个属性名字符串
      3.在_proxy方法中,会调用Object.defineProperty方法,给vm对象添加与data对象同名的属性
        这些属性都是访问描述符,因为他们具有get/set方法,不具有value值
          如果开发者读取这些属性的值,就会触发get方法,并自动读取data对象中同名属性的值,并进行返回
          如果开发者修改这些属性的值,就会触发set方法,会自动找到data对象中的同名属性并进行赋值操作
  
  */
  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // Object.keys方法可以获取到一个对象身上,所有直系属性名组成的数组
  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  /*
    响应式
    需求:当属性被修改时,页面需要自动展示最新的结果
    拆解:
      1.当属性被修改时
        监视有关
        肯定有使用Object.defineProperty,将某些属性从数据描述符变成访问描述符
          因为可以通过访问描述符的set方法,监视开发者有没有修改属性这个操作

      2.页面需要自动展示最新的结果
        应该是通过原生DOM的增删改查去实现
          例如:找到对应的节点,然后修改他的文本内容,文本内容的数据应该是这个响应式属性的最新结果
  
    准备工作:
      1.在bind方法中,会new调用Wachter方法,用来创建watcher实例对象
        传入三个参数,组件实例对象vm,插值表达式的内容"msg",用来更新对应文本节点的回调函数cb

      2.在Watcher函数中,会调用原型链上的get方法,来获取当前表达式最新的结果值

      3.在get方法中,
        -将Dep.target的值修改为当前的watcher实例对象
        -调用getVMVal方法,读取对应表达式的结果
        -将Dep.target的值修改为null

      4.在getVMVal方法中,
          -将表达式以.进行切割,得到多个属性名组成的数组
          -对该数组进行for循环遍历,循环读取data对象中对应的属性的值
            由于正在读取data对象中的属性值,会触发数据劫持的get方法

      5.在数据劫持的get方法中,由于Dep.target已经有值,就会执行dep.depend方法

      6.在depend方法中,会调用watcher对象的addDep方法

      7.在addDep方法中,
        -判断当前watcher对象的depIds中,是否具有与dep.id同名的属性
        -如果没有同名属性,就会使用depIds收集当前这个dep对象
        -dep对象调用addSub方法,收集当前这个watcher对象

      8.在addSub方法中,dep对象会使用自己的subs属性,收集与自身相关的所有的watcher对象

      更新页面流程:
        1.开发者书写vm.msg="123",
          此时由于msg是经过数据代理处理过的属性,所以此处会触发数据代理的set方法

        2.在数据代理的set方法中,会同步修改data对象中同名的属性msg,对其进行赋值操作
          由于data中的msg是经过数据劫持处理过的属性,所以此处会触发数据劫持的set方法

        3.在数据劫持的set方法中,会调用dep.notify方法

        4.在dep.notify方法中,会遍历自己的subs数组,调用所有收集到的watcher对象的update方法

        5.在watche的update方法中,会调用run方法

        6.在run方法中,Vue会获取到当前表达式的最新结果,并使用call方法借调cb函数

        7.在cb函数中,会调用之前使用闭包缓存的对应的文本更新器函数,更新指定的文本节点,
          将文本节点的文本内容更新为最新结果
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:限制别人的人身自由,并强迫他做他不想做的事情

    理解
      将data对象中,所有的数据描述符,全部重写为访问描述符
        让每个属性都具有get/set方法

        注意:数据劫持只会对data对象以及内部出现的对象的属性进行处理,对vm对象没有任何影响

    目的
      通过访问描述符的set方法,可以监视到开发者对这些响应式属性的修改/读取操作
        从而完成响应式,实现数据变化,页面自动更新的效果

    次数:4次(与data对象中所有的属性名个数有关)

    流程:
      1.调用observe方法,并将data对象传入该函数
      2.在observe方法中,
        -判断传入的data是否为空,并且判断data是否是一个对象
          如果是才能继续执行后续代码,否则数据劫持结束
        -会构造调用Observer方法,创建实例对象ob
      3.在Observer方法中,Vue会调用ob对象的walk方法,并传入data对象
      4.在walk方法中,使用Object.keys获取到data对象所有直系属性名组成的数组,并对其进行遍历
        在遍历的过程中,会多次调用defineReactive方法,并将属性名和属性值都传入其中
      5.在defineReactive方法中,
        -创建一个dep对象
          总结:data对象中,每个属性名都会创建一个对应的dep对象
        -再次调用observe方法,并将属性值传入其中,实现深度数据劫持
        -调用Object.defineProperty方法,将data对象身上所有的属性名进行重写操作
          将原本所有的数据描述符,全部重写成为访问描述符
            如果开发者读取这些被数据劫持过的属性,会触发get方法,会返回闭包缓存的value值
            如果开发者修改这些被数据劫持过的属性,会触发set方法,
              -如果新值与旧值相同,后续代码就不执行
              -将闭包中缓存的值换成新值
              -将新值传入observe方法中,对新值进行深度数据劫持
              -调用dep.notify方法,通知DOM进行更新

  
  */
  observe(data, this);
  // observe(data, vm);

  /*
    MVVM源码第三部分:模版解析
    
    理解
      就是将页面中的插值语法等Vue相关的内容,转换成对应的效果

    目的
      找到模版结构中,对应的插值语法和指令,对其进行解析,将插值语法替换成需要显示的对应状态数据

    流程:
      1.构造调用Compile方法,将options.el属性传入内部
      2.在Compile函数中,
        -会通过传入的option.el字符串找到对应的真实DOM对象
        -将app元素节点中的所有直系子节点,全部转移到文档碎片中
        -调用init方法
      3.在init方法中,会调用compileElement方法开始解析文档碎片的子节点
      4.在compileElement方法中,会获取到当前元素所有子节点组成的数组,会开始遍历内部所有子节点
        -如果这个子节点是元素节点,就开始获取他所有的标签属性,判断是否是Vue的指令
        -如果这个子节点是文本节点,而且满足插值语法的正则匹配,那么调用compileText方法,解析该插值语法
        -如果当前子节点还有子节点,那么就开始调用compileElement方法,递归后续子节点处理
      5.在compileText方法中,会调用bind方法
      6.在bind方法中,
        -找到对应的文本更新器函数(textUpdater)
        -调用getVMVal方法,获取到对应插值表达式的结果值,并将该结果值传入文本更新器函数
          最终文本更新期函数,会将对应的文本节点,更新成最新的数据
        -创建一个对应的watcher实例对象
          总结:页面上,每具有一个插值表达式,就会创建一个对应的watcher实例对象


  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);


  /*
    Vue1与Vue2源码区别

      1.请问Vue1中更新数据是同步更新还是异步更新?
        同步更新

      2.请问Vue2中更新数据是同步更新还是异步更新?
        同步更新

      3.请问Vue1中更新DOM是同步更新还是异步更新?
        同步更新
          因为Vue1的响应式流程中,没有看到使用异步任务的代码

      4.请问Vue2中更新DOM是同步更新还是异步更新?
        异步更新
          异步更新DOM可以实现类似于防抖的效果
          Vue2其实是把更新DOM的方法,放入了微任务中

          挂载是同步的,渲染是异步的,页面会在微任务清空之后再渲染
          注意:无论是Vue1还是Vue2,渲染页面都一定是异步的
            因为GUI线程负责页面的渲染,而GUI的工作时间一定是在微任务清空之后

      5.请问Vue1更新DOM的范围是多大?(整个页面,整个组件,某个节点)
        某个节点(精准更新)
          Vue1只会更新使用到当前响应式属性的节点

          Vue1会给每个插值语法都创建一个watcher对象

      6.请问Vue2更新DOM的范围是多大?(整个页面,整个组件,某个节点)
        整个组件(范围更新)
          Vue2如果更新了某个响应式属性,会导致当前组件所有节点都更新
            所有节点中,绝大多数节点,应该都没用到这个响应式属性,但是他们也被更新了
              存在误杀的情况

          感觉上,Vue1的更新方案性能会高于Vue2的更新方案
          但是,其实并不是这样的
            因为Vue2他还有第二手准备,为了解决误杀情况,他加入了diff算法
              会使用diff算法去避免这些节点的误杀情况

          其实性能来说:Vue2的方案性能优于Vue1的方案
            Vue2会给每个组件创建一个watcher对象

      7.请问Vue1中,使用下标操作数组的数据,是否具有响应式效果?
        具有响应式效果

      8.请问Vue2中,使用下标操作数组的数据,是否具有响应式效果?
        不具有响应式效果
          千万不要使用下标操作数组的数据

        问题:数组的下标为什么不做数据劫持,变成响应式属性?
        回答:这是尤大大故意为之的,由于数组一般存放的都是大量数据,
          如果对其下标进行数据劫持,那么就会创建出非常多个dep对象
            而且,开发者很少通过下标修改数组的内容,那么生成这么多dep对象就太浪费内存了

        问题:请问Vue2中,如何实现修改数组的内容具有响应式效果?
        回答:Vue2对数组的7种方法进行了重写操作,使用这些方法操作数组的话
              不仅具有原本方法的对应效果,还会强制页面更新最新结果
              7种:splice,push,pop,shift,unshift,sort,reverse

        问题:请问Vue2是如何做到对数组的下标,不进行数据劫持操作的?
        回答:其实很简单
          1.在observe中,Vue2会使用Array.isArray方法,对即将进行数据劫持的数据进行类型判断
          2.如果确定是个数组,就将该数组传给observeArray方法,进行数据劫持
          3.在observeArray方法,执行for循环,获取到数组内部的数据,对内部数据进行数据劫持
            此处用for循环跳过了对下标的数据劫持

          注意:虽然跳过了数组的下标的数据劫持,但是内部数据如果是个对象,这些对象的属性还会被数据劫持
            扩展:此处可以说到的性能优化
              由于数组中如果还有对象,可能会产生很多无用的响应式属性以及dep对象
                可以使用大数组冻结方法解决该问题,
                  其实就是用Object.freeze方法,将数组以及内部的所有对象,都变为只读状态
                    只读状态的对象是没办法被进行数据劫持的

        问题:请问Vue2中,是如何重写数组的7种方法的?
            普通数组和data中存在的数组,他们使用的splice并不是同一个
              普通数组的splice没有更新DOM的效果
              data中的数组,他的splice是具有更新DOM的效果的

            流程总结:
              1.使用Object.create创建一个全新的对象,并将该对象的__proto__修改为Array的原型对象
              2.在数据劫持的时候,如果发现劫持的数据是一个数组,那么就将该数组的__proto__修改为流程1创建的全新对象
              3.如果开发者在开发代码的过程中,使用了重写的7种方法,就会优先找到新创建的对象
                新创建对象身上,会存储七种与数组同名的方法
                  调用的效果:会调用数组的同名方法对数组的数据进行处理,同时还会执行dep.notify方法,通知DOM进行更新
  */
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
  //   vm._proxy("msg");
  // this->vm对象,key->"msg"
    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      }
    });


    /*
      在ES6语法推出之前,js中属性只有一种,就是key和value值的组合(又称为属性描述符,数据描述符)
      在ES6语法推出之后,js多出了一个API==>Object.defineProperty
      Object.defineProperty方法可以给一个对象新增/修改属性
        在ES6之后,一共有两种属性
          1.数据描述符
            这种属性具有value值,不具有get/set方法
            如果读取他的属性值,会直接返回value值

          2.访问描述符
            这个属性不具有value值,他有get/set方法
            如果开发者读取该属性,就会触发他的get方法,执行内部代码,并自动返回get方法的返回值
            如果开发者修改该属性,就会触发他的set方法,执行内部代码
    */
  //  由于在执行_proxy方法之前,vm身上没有msg属性,所以此处是在新增属性
  // 此处vm身上会多出很多与data对象中同名的属性

  // 如果读取代理属性的属性值,就会自动找到data对象中,获取到同名属性的值进行返回
  // 如果修改代理属性的属性值,就会自动找到data对象中,对他的同名属性进行赋值操作

    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

  },
};
