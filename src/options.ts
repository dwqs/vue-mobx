import {IObservableFactory, IObservableFactories} from 'mobx';

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
    isObservable: isObservable,
    observable?: observable
}

export class Options {
    public static options: Config;

    public static saveOptions(config: Config): void {
        Options.options = config;
    }
}