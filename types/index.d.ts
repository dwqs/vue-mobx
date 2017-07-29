import Vue from 'vue';
import { Config } from './install';
declare const VueMobx: {
    install: (instance: Vue, config: Config) => void;
    connect: (mapModels: object) => <C extends Vue>(vueComponent: C) => C;
};
export default VueMobx;
