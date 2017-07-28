import Vue from 'vue';
import * as Mobx from 'mobx';
export declare type isObservable = (value: any, property?: string) => boolean;
export declare type observable = Mobx.IObservableFactory & Mobx.IObservableFactories & {
    deep: {
        struct<T>(initialValue?: T): T;
    };
    ref: {
        struct<T>(initialValue?: T): T;
    };
};
export interface Config {
    isObservable: isObservable;
    observable: observable;
}
export declare function install(instance: Vue, config: Config): void;
