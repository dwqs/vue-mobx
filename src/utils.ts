export function isObject(data: any): boolean {
    return data !== null && typeof data === 'object';
}

export function assert(condition: boolean, msg: string): void {
    if (!condition) {
        throw new Error(`[vue-mobx]: ${msg}`);
    }
}

export function getValidModel(states: object): object {
    const res = {};

    Object.keys(states).forEach((key) => {
        // states[key].hasOwnProperty('$mobx')
        if (states[key].hasOwnProperty('$mobx')) {
            res[key] = states[key]
        }
    });

    return res;
}

export function getValidAction(actions: object): object {
    const res = {};

    Object.keys(actions).forEach((key) => {
        if (actions[key].isMobxAction) {
            res[key] = actions[key]
        }
    });

    return res;
}

export function getMobxData(models: object): object {
    let res = {};

    Object.keys(models).forEach((key) => {
        res = (Object as any).assign({}, res, {
            ...models[key].$mobx.values,
        })
    });
    
    return res;
}