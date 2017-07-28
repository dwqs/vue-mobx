import Vue from 'vue';
export declare function isObject(data: any): boolean;
export declare function assert(condition: boolean, msg: string): void;
export declare function getValidModel<U extends Vue>(c: U, states: any): object;
export declare function getValidAction(actions: object): object;
export declare function getMobxData(models: object): object;
