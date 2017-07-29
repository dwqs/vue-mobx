export function isObject(data: any): boolean {
    return data !== null && typeof data === 'object';
}

export function assert(condition: boolean, msg: string): void {
    if (!condition) {
        throw new Error(`[vue-mobx]: ${msg}`);
    }
}

const $mobx: string = '__mobxLazyInitializers';

function getProto(obj: object): object {
    return Object.getPrototypeOf(obj);
}

function getOwnProps(obj: object): string[] {
    return Object.getOwnPropertyNames(obj);
}

export function getValidModel(models: object): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        const proto: object = getProto(models[key]);
        // if (models[key].hasOwnProperty('$mobx')) {
        //     res[key] = models[key]
        // }
        if (proto.hasOwnProperty($mobx)) {
            res[key] = models[key]
        }
    });

    return res;
}

export function getValidAction(models: object): object {
    const res = {};

    Object.keys(models).forEach((key) => {
        const props: string[] = getOwnProps(getProto(models[key]));
        // if (actions[key].isMobxAction) {
        //     res[key] = actions[key]
        // }
        for (let i = 0, l = props.length; i < l; i++) {
            if (typeof models[key][props[i]] === 'function' && models[key][props[i]].isMobxAction) {
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