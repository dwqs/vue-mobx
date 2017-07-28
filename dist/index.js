(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueMobx = factory());
}(this, (function () { 'use strict';

const __assign = Object.assign || function (target) {
    for (var source, i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (var prop in source) {
            if (Object.prototype.hasOwnProperty.call(source, prop)) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(data) {
    return data !== null && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object';
}
function assert(condition, msg) {
    if (!condition) {
        throw new Error("[vue-mobx]: " + msg);
    }
}
function getValidModel(c, states) {
    var res = {};
    console.log('vue-mobx getValidModel', c);
    Object.keys(states).forEach(function (key) {
        console.log('vue-mobx5555555555', states[key].hasOwnProperty('$mobx'));
        if (states[key].hasOwnProperty('$mobx')) {
            res[key] = states[key];
        }
    });
    return res;
}
function getValidAction(actions) {
    var res = {};
    Object.keys(actions).forEach(function (key) {
        if (actions[key].isMobxAction) {
            res[key] = actions[key];
        }
    });
    return res;
}
function getMobxData(models) {
    var res = {};
    Object.keys(models).forEach(function (key) {
        res = Object.assign({}, res, __assign({}, models[key].$mobx.values));
    });
    return res;
}

function applyMixin(instance, config) {
    assert(!!config, "missed config parameter, here is the doc: https://github.com/dwqs/vue-mobx");
    assert(config.hasOwnProperty('observable') && typeof config.observable === 'function', "missed config#observable parameter, here is the doc: https://github.com/dwqs/vue-mobx");
    assert(config.hasOwnProperty('isObservable') && typeof config.isObservable === 'function', "missed config#isObservable parameter, here is the doc: https://github.com/dwqs/vue-mobx");
    var version = Number(instance.version.split('.')[0]);
    if (version >= 2) {
        instance.mixin({
            beforeCreate: function beforeCreate() {
                console.log('vue-mobx 1111111,asdasd', this);
                this.$observable = config.observable, this.$isObservable = config.isObservable;
            }
        });
    } else {
        if (process.env.NODE_ENV !== 'production') {
            console.error("[vue-mobx] only adapted to Vue 2 or higher, the Vue version used is " + version + ". Upgrade vue version of your project, please.");
        }
    }
}

var vm;
function install(instance, config) {
    if (vm) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('[vue-mobx] already installed. Vue.use(VuexMobx) should be called only once.');
        }
        return;
    }
    vm = instance;
    applyMixin(vm, config);
}
if (typeof window !== 'undefined' && window.Vue && window.mobx) {
    install(window.Vue, {
        isObservable: window.mobx.isObservable,
        observable: window.mobx.observable
    });
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function connect(mapData, mapMethods) {
    return function connectedComponent(vueComponent) {
        assert(isObject(mapData), "mapData should be a object not " + (typeof mapData === "undefined" ? "undefined" : _typeof$1(mapData)));
        assert(isObject(mapMethods), "mapMethods should be a object not " + (typeof mapMethods === "undefined" ? "undefined" : _typeof$1(mapMethods)));
        console.log('vue-mobx, connect component', vueComponent);
        var validModels = getValidModel(vueComponent, mapData);
        var validActions = getValidAction(mapMethods);
        var oldMethodsAndData = {
            data: vueComponent.data && vueComponent.data() || {},
            methods: vueComponent.methods && vueComponent.methods || {}
        };
        var mobxData = getMobxData(validModels);
        console.log('oldMethodsAndData', oldMethodsAndData, mobxData);
        var enhanceVueComponent = Object.assign(vueComponent, {
            methods: __assign({}, Object.assign(oldMethodsAndData.methods, __assign({}, validActions))),
            data: function data() {
                return Object.assign(oldMethodsAndData.data, __assign({}, mobxData));
            }
        });
        console.log('11111111enhance component', enhanceVueComponent, enhanceVueComponent.data());
        return enhanceVueComponent;
    };
}

var VueMobx = {
    install: install,
    connect: connect
};

return VueMobx;

})));
