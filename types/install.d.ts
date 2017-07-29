import Vue from 'vue';
import { IObservableFactory, IObservableFactories } from 'mobx';
export declare type isObservable = (value: any, property?: string) => boolean;
export declare type observable = IObservableFactory & IObservableFactories & {
    deep: {
        struct<T>(initialValue?: T): T;
    };
    ref: {
        struct<T>(initialValue?: T): T;
    };
};
export declare type toJST = <T>(source: T, detectCycles?: boolean) => T;
export declare type toJSAny = (source: any, detectCycles?: boolean) => any;
export declare type toJSArr = (source: any, detectCycles: boolean, alreadySeen: Array<[any, any]>) => any;
export interface Config {
    toJS: toJST | toJSAny | toJSArr;
    isObservable?: isObservable;
    observable?: observable;
}
export declare function install(instance: Vue, config: Config): void;
