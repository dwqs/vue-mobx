import Vue from 'vue';

import { Config } from './options';
import { assert } from './utils';

export default function applyMixin(instance: typeof Vue, config: Config): void {
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

    const version = Number((instance as any).version.split('.')[0]);

    if (version >= 2) {
        (instance as any).mixin({
            beforeCreate() {
                this.$toJS = config.toJS;
                this.$isObservable = config.isObservable;
                if (config.observable && typeof config.observable === 'function') {
                    this.$observable = config.observable;
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