import Vue from 'vue';

import { Config } from './install';
import { assert } from './utils';

export default function applyMixin(instance: Vue, config: Config): void {
    assert(
        !!config, 
        `missed config parameter, here is the doc: https://github.com/dwqs/vue-mobx`,
    );
    
    assert(
        config.hasOwnProperty('toJS') && typeof config.toJS === 'function', 
        `missed config#toJS parameter, here is the doc: https://github.com/dwqs/vue-mobx`,
    );

    const version = Number((instance as any).version.split('.')[0]);

    if (version >= 2) {
        (instance as any).mixin({
            beforeCreate() {
                this.$toJS = config.toJS;
                if (config.observable && typeof config.observable === 'function') {
                    this.$observable = config.observable;
                }

                if (config.isObservable && typeof config.isObservable === 'function') {
                    this.$isObservable = config.isObservable ;
                }
            },
        })
    } else {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                `[vue-mobx] only adapted to Vue 2 or higher, the Vue version used is ${version}. Upgrade vue version of your project, please.`,
            )
        }
    }
}