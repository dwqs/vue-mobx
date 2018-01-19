import Vue from 'vue';
import VueRouter from "vue-router";
import {observable, isObservable, toJS} from 'mobx';
import VueMobx from '../dist/index';

Vue.use(VueRouter);
Vue.use(VueMobx, {
    /**
     * config is needed.
     * you can visit it by this.$observable/this.$isObservable/$toJS in your vue component
     */
    toJS: toJS,  // must
    isObservable: isObservable, //must
    observable: observable,  //optional
});

import App from './app.vue';

const Outer = {template: '<router-view></router-view>'};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/index', component: App }
    ]
});

const app = new Vue({
    router,
    store,
    ...Outer
});

app.$mount('#test');