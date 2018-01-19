// tslint:disable-next-line:no-unused-variable
import Vue, {PluginObject} from 'vue';

// tslint:disable-next-line:no-unused-variable
import { install } from './install';
import { Config } from './options';

const VueMobx: PluginObject<Config> = {
    install,
}

export default VueMobx;
