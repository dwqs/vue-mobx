import Vue from 'vue';
import { Config } from './install';
declare const VueMobx: {
    install: (instance: Vue, config: Config) => void;
    connect: (mapData: object, mapMethods: object) => <C extends Vue>(vueComponent: C) => C;
};
export default VueMobx;
