import Vue from 'vue';

import applyMixin from './mixin';
import { assert } from './utils';
import { Config, Options } from './options'

// tslint:disable-next-line:variable-name
export let _Vue: typeof Vue;

export function install(instance: typeof Vue, config: Config) {
    const version = Number((instance as any).version.split('.')[0]);
    assert(version >= 2, `[vue-mobx] only adapted to Vue 2 or higher, the Vue version used is ${version}. Upgrade vue version of your project, please.`);

    if ((install as any).installed) {
        return;
    }
    (install as any).installed = true;

    _Vue = Vue;
    
    assert(
        !!config, 
        `missed config parameter, here is the doc: https://github.com/dwqs/vue-mobx`,
    );
    
    assert(
        config.hasOwnProperty('toJS') && typeof config.toJS === 'function', 
        `missed config#toJS parameter, here is the doc: https://github.com/dwqs/vue-mobx`,
    );

    assert(
        config.hasOwnProperty('isObservable') && typeof config.isObservable === 'function', 
        `missed config#isObservable parameter, here is the doc: https://github.com/dwqs/vue-mobx`,
    );

    Options.saveOptions(config);
    applyMixin(config);
}

if (typeof window !== 'undefined' && (window as any).Vue && (window as any).mobx) {
    install((window as any).Vue, {
        isObservable: (window as any).mobx.isObservable,
        toJS: (window as any).mobx.toJS,
        observable: (window as any).mobx.observable,
    });
}