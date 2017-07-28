import Vue from 'vue';
import VueRouter from "vue-router";
import {observable, isObservable} from 'mobx';
import VueMobx from 'vue-mobx';

Vue.use(VueRouter);
Vue.use(VueMobx, {
    /**
     * config is needed.
     * you can visit it by this.$observable/this.$isObservable in your vue component
     */
    observable: observable,
    isObservable: isObservable
});

import App from './app.vue';

const Outer = {template: '<router-view></router-view>'};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/index', component: App }
    ]
})