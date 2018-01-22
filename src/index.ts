// tslint:disable-next-line:no-unused-variable
import Vue, {PluginObject} from 'vue';

// tslint:disable-next-line:no-unused-variable
import { install } from './install';
import { Config } from './options';

const VueMobx: PluginObject<Config> = {
    install,
}

export default VueMobx;

if (typeof window !== 'undefined' && (window as any).Vue && (window as any).mobx) {
    (window as any).Vue.use(VueMobx, {
        isObservable: (window as any).mobx.isObservable,
        toJS: (window as any).mobx.toJS,
        observable: (window as any).mobx.observable,
    })
}
