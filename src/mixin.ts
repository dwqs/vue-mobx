import { _Vue } from './install';

import { Config } from './options';
import { 
    assert, isObject, 
    getValidModel, getValidAction,
    createComputedProps,
} from './utils';

export default function applyMixin(config: Config): void {
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

    _Vue.mixin({
        beforeCreate() {
            if ((this.$options as any).fromMobx) {
                const mapModels = (this.$options as any).fromMobx;
                assert(isObject(mapModels), `fromMobx should be a object not ${typeof mapModels}`);

                // tslint:disable-next-line:variable-name
                const _data = (typeof this.$options.data === 'function' && (this.$options as any).data()) || {};
                // tslint:disable-next-line:variable-name
                const _computed = this.$options.computed || {};
                // tslint:disable-next-line:variable-name
                const _methods = this.$options.methods || {};

                const validModels: object = getValidModel(mapModels);
                const validActions: object = getValidAction(validModels, _methods);

                this.$options.methods = {
                    ..._methods,
                    ...validActions,
                };

                const computedProps = createComputedProps(validModels, _data, _computed, this);

                this.$options.computed = {
                    ..._computed,
                    ...computedProps,
                };

                (this as any).$toJS = config.toJS;
                (this as any).$isObservable = config.isObservable;
                if (config.observable && typeof config.observable === 'function') {
                    (this as any).$observable = config.observable;
                }
            }
        },
    });
}