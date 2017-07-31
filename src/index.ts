// tslint:disable-next-line:no-unused-variable
import Vue, {PluginObject} from 'vue';

// tslint:disable-next-line:no-unused-variable
import { install } from './install';
import { connect } from './connect';
import { Config } from './options';

const VueMobx: PluginObject<Config> = {
    install,
    connect,
}

export default VueMobx;
