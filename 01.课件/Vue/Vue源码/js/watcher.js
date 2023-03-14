function Watcher(vm, exp, cb) {
  // new Watcher(vm, "msg", function(value, oldValue) {
  //     textUpdater && textUpdater(文本节点, value, oldValue);
  // });
  // this->watcher实例对象,

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();

    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);
    // this->watcher对象

    // hasOwnProperty可以检查某个对象身上,是否具有某个属性名
    // 如果有就返回true,没有就返回false
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 在检查当前watcher对象的depIds中,有没有缓存当前这个dep对象
      // {1:dep,2:dep}
      // 此处watcher对象会使用depIds属性,收集到与自身相关的所有的dep对象
      // 此处插值语法会使用depIds属性,收集到与自身相关的所有响应式属性
      this.depIds[dep.id] = dep;

      // 此处dep也是用addSub方法收集对应的watcher
      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // this->watcher实例对象
    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });

    // ["person","name"].forEach(function (k) {
    //   val = data["person"];
    //   val = person["name"];
    // });
    return val;
  },
};
