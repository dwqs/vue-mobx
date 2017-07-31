import Vue from 'vue';

import applyMixin from './mixin';
import { Config, Options } from './options'


let vm: typeof Vue; 

export function install(instance: typeof Vue, config: Config) {
    if (vm) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vue-mobx] already installed. Vue.use(VuexMobx) should be called only once.',
            )
        }
        return;
    }
    vm = instance;
    Options.saveOptions(config);
    applyMixin(vm, config)
}

if (typeof window !== 'undefined' && (window as any).Vue && (window as any).mobx) {
    install((window as any).Vue, {
        isObservable: (window as any).mobx.isObservable,
        toJS: (window as any).mobx.toJS,
        observable: (window as any).mobx.observable,
    });
}