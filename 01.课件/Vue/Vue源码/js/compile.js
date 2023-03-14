function Compile(el, vm) {
    // this.$compile = new Compile("#app", vm);
    // this->com实例对象
    // el->"#app" , vm->MVVM实例对象

    this.$vm = vm;

    // 通过传入的el配置,找到对应的DOM节点
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);
        // 到此之前,Vue都在准备需要解析的模版内容

        // 从此开始,Vue会解析收集到的模版解析
        this.init();

        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el是当前app元素节点
        var fragment = document.createDocumentFragment(),
            child;

        // 此处在对app元素,进行抄家处理
        // 将app内部所有的直系子节点,全部转移到文档碎片中去
        // 注意:只要放入文档碎片的节点,他就会从页面上消失
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->文档碎片对象, this->com对象
        // childNodes是一个伪数组,内部存放所有的子节点
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // 第一次进入:[文本节点,p元素节点,文本节点].forEach(function(node) {
        // 第二次进入:[文本节点].forEach(function(node) {
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         me.compile(p元素节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(文本节点,"msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(p元素节点);
        //     }
        // });

    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

            console.log(nodeAttrs);

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        //me.compileText(文本节点,"msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(文本节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // this->compileUtil对象
        // compileUtil.text(文本节点, vm, "msg");
        this.bind(node, vm, exp, 'text');
        // this.bind(文本节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(文本节点, vm, "msg", 'text');
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(文本节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(文本节点, "hello mvvm");

        // watcher对象在首次渲染中,没有用,他的目的是为了实现响应式流程
        // 每个插值语法都会生成一个watcher实例对象
        // new Watcher(vm, exp, function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")
        var val = vm._data;

        // exp->["msg"]
        // exp->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        //     val = data["person"];
        //     val = person["name"];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // node->文本节点,value->"hello mvvm"
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};