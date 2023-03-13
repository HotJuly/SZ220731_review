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
    需求:当属性被修改时,页面需要自动展示最新的结果
    拆解:
      1.当属性被修改时
        监视有关
        肯定有使用Object.defineProperty,将某些属性从数据描述符变成访问描述符
          因为可以通过访问描述符的set方法,监视开发者有没有修改属性这个操作

      2.页面需要自动展示最新的结果
        应该是通过原生DOM的增删改查去实现
          例如:找到对应的节点,然后修改他的文本内容,文本内容的数据应该是这个响应式属性的最新结果
  
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:限制别人的人身自由,并强迫他做他不想做的事情

    理解
      将data对象中,所有的数据描述符,全部重写为访问描述符
        让每个属性都具有get/set方法

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

  this.$compile = new Compile(options.el || document.body, this);
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
      },
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
