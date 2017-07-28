import Vue from 'vue';
import * as Mobx from 'mobx';

import applyMixin from './mixin';

export type isObservable = (value: any, property?: string) => boolean;
export type observable =  Mobx.IObservableFactory & Mobx.IObservableFactories & {
    deep: {
        struct<T>(initialValue?: T): T;
    };
    ref: {
        struct<T>(initialValue?: T): T;
    };
};

export interface Config {
    isObservable: isObservable,
    observable: observable
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
        observable: (window as any).mobx.observable,
    });
}