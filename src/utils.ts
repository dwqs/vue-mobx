import { _Vue } from './install';
import { Options } from './options';

export function isObject(data: any): boolean {
    return data !== null && typeof data === 'object';
}

export function assert(condition: boolean, msg: string): void {
    if (!condition) {
        throw new Error(`[vue-mobx]: ${msg}`);
    }
}

const $mobx: string = '__mobxDidRunLazyInitializers';
const $$mobx: string = '$mobx';

function getProto(obj: object): object {
    return Object.getPrototypeOf(obj);
}

function getOwnProps(obj: object): string[] {
    // ES6 class methods aren't enumerable, can't use Object.keys
    return Object.getOwnPropertyNames(obj);
}

export function getValidModel(models: object): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        // support typescript
        if (Options.options.isObservable(models[key])) {
            res[key] = models[key]
        }
    });

    return res;
}

export function getValidAction(models: object, methods: object): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        const props: string[] = getOwnProps(getProto(models[key]));
        for (let i = 0, l = props.length; i < l; i++) {
            if (typeof models[key][props[i]] === 'function' && models[key][props[i]].isMobxAction) {
                assert(!methods[props[i]], `The "${props[i]}" method is already defined in methods.`);
                res[props[i]] = models[key][props[i]];
            }
        }
    });

    return res;
}

export function getMobxData(models: object): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        const props: string[] = getOwnProps(getProto(models[key]));
        // res = (Object as any).assign({}, res, {
        //     ...models[key].$mobx.values,
        // })
        for (let i = 0, l = props.length; i < l; i++) {
            if (props[i] !== 'constructor' && props[i] !== $mobx && typeof models[key][props[i]] !== 'function') {
                res[props[i]] = models[key][props[i]];
            }
        }
    });
    
    return res;
}

export function createComputedProps(models: object, data: object, computed: object, vm: any): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        const model = models[key];
        const props = getOwnProps(model);

        for (let i = 0, l = props.length; i < l; i++) {
            if (props[i] !== $mobx && props[i] !== $$mobx) {
                assert(!(props[i] in data), `The computed property "${props[i]}"  is already defined in data.`);
                assert(!(props[i] in computed), `The computed property "${props[i]}" is already defined in computed.`);

                const property = Object.getOwnPropertyDescriptor(model, props[i]);
                (_Vue as any).util.defineReactive(model, props[i], null, null, true);

                res[props[i]] = {
                    get() {
                        return model[props[i]];
                    },

                    set(val: any) {
                        (property as any).set.call(vm, val);
                    },
                };
            }
        }
    });

    return res;
}