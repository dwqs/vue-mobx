import Vue from 'vue';
import {IObservableFactory, IObservableFactories} from 'mobx';

import applyMixin from './mixin';

export type isObservable = (value: any, property?: string) => boolean;
export type observable =  IObservableFactory & IObservableFactories & {
    deep: {
        struct<T>(initialValue?: T): T;
    };
    ref: {
        struct<T>(initialValue?: T): T;
    };
};

export type toJST = <T>(source: T, detectCycles?: boolean) => T
export type toJSAny = (source: any, detectCycles?: boolean) => any
export type toJSArr = (source: any, detectCycles: boolean, alreadySeen: Array<[any, any]>) => any

export interface Config {
    toJS: toJST | toJSAny | toJSArr,
    isObservable?: isObservable,
    observable?: observable
}

let vm: Vue; 

export function install(instance: Vue, config: Config) {
    if (vm) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vue-mobx] already installed. Vue.use(VuexMobx) should be called only once.',
            )
        }
        return;
    }
    vm = instance;
    applyMixin(vm, config)
}

if (typeof window !== 'undefined' && (window as any).Vue && (window as any).mobx) {
    install((window as any).Vue, {
        isObservable: (window as any).mobx.isObservable,
        toJS: (window as any).mobx.toJS,
        observable: (window as any).mobx.observable,
    });
}