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
var $mobx = '__mobxLazyInitializers';
function getProto(obj) {
    return Object.getPrototypeOf(obj);
}
function getOwnProps(obj) {
    return Object.getOwnPropertyNames(obj);
}
function getValidModel(models) {
    var res = {};
    Object.keys(models).forEach(function (key) {
        var proto = getProto(models[key]);
        if (proto.hasOwnProperty($mobx)) {
            res[key] = models[key];
        }
    });
    return res;
}
function getValidAction(models) {
    var res = {};
    Object.keys(models).forEach(function (key) {
        var props = getOwnProps(getProto(models[key]));
        for (var i = 0, l = props.length; i < l; i++) {
            if (typeof models[key][props[i]] === 'function' && models[key][props[i]].isMobxAction) {
                res[props[i]] = models[key][props[i]];
            }
        }
    });
    return res;
}
function getMobxData(models) {
    var res = {};
    Object.keys(models).forEach(function (key) {
        var props = getOwnProps(getProto(models[key]));
        for (var i = 0, l = props.length; i < l; i++) {
            if (props[i] !== 'constructor' && props[i] !== $mobx && typeof models[key][props[i]] !== 'function') {
                res[props[i]] = models[key][props[i]];
            }
        }
    });
    return res;
}

function applyMixin(instance, config) {
    assert(!!config, "missed config parameter, here is the doc: https://github.com/dwqs/vue-mobx");
    assert(config.hasOwnProperty('toJS') && typeof config.toJS === 'function', "missed config#toJS parameter, here is the doc: https://github.com/dwqs/vue-mobx");
    var version = Number(instance.version.split('.')[0]);
    if (version >= 2) {
        instance.mixin({
            beforeCreate: function beforeCreate() {
                this.$toJS = config.toJS;
                if (config.observable && typeof config.observable === 'function') {
                    this.$observable = config.observable;
                }
                if (config.isObservable && typeof config.isObservable === 'function') {
                    this.$isObservable = config.isObservable;
                }
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
        toJS: window.mobx.toJS,
        observable: window.mobx.observable
    });
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function connect(mapModels) {
    return function connectedComponent(vueComponent) {
        assert(isObject(mapModels), "mapData should be a object not " + (typeof mapModels === 'undefined' ? 'undefined' : _typeof$1(mapModels)));
        var validModels = getValidModel(mapModels);
        var validActions = getValidAction(validModels);
        var mobxData = getMobxData(validModels);
        var oldMethodsAndData = {
            data: vueComponent.data && vueComponent.data() || {},
            methods: vueComponent.methods && vueComponent.methods || {}
        };
        var enhanceVueComponent = Object.assign(vueComponent, {
            methods: __assign({}, Object.assign(oldMethodsAndData.methods, __assign({}, validActions))),
            data: function data() {
                return Object.assign(oldMethodsAndData.data, __assign({}, mobxData));
            }
        });
        return enhanceVueComponent;
    };
}

var VueMobx = {
    install: install,
    connect: connect
};

return VueMobx;

})));
