import test from 'ava';
import {observable, isObservable, action, isAction} from 'mobx';
import Vue from 'vue';
import VueMobx from '../dist/index';

Vue.use(VueMobx, {
    observable,
    isObservable
});

let vm = new Vue({
    data: {
        count: 100
    }
});

test('connect should be a function', (t) => {
    t.plan(1);
    
    t.is(typeof VueMobx.connect, 'function');
});

test('connect function should be a vue component', (t) => {
    t.plan(1);
    let enhanceComponent = VueMobx.connect({}, {})(vm);
    t.true(enhanceComponent instanceof Vue);
});

test('$observable should be a function', (t) => {
    t.plan(1);
    t.is(typeof vm.$observable, 'function');
});

test('the parameter of connect function should be a object(besides null)', (t) => {
    t.plan(15);
    const error = t.throws(() => {
        VueMobx.connect('test', {})(vm)
    }, Error);

    const error2 = t.throws(() => {
        VueMobx.connect(undefined, {})(vm)
    }, Error);

    const error3 = t.throws(() => {
        VueMobx.connect(3, {})(vm)
    }, Error);

    const error4 = t.throws(() => {
        VueMobx.connect({}, 'test')(vm)
    }, Error);

    const error5 = t.throws(() => {
        VueMobx.connect({}, undefined)(vm)
    }, Error);

    const error6 = t.throws(() => {
        VueMobx.connect({}, 3)(vm)
    }, Error);

    const error7 = t.throws(() => {
        VueMobx.connect({}, null)(vm)
    }, Error);

    let enhanceComponent = VueMobx.connect({}, {})(vm);;

    t.true(error.message.includes('string'));
    t.true(error2.message.includes('undefined'));
    t.true(error3.message.includes('number'));
    t.true(error4.message.includes('string'));
    t.true(error5.message.includes('undefined'));
    t.true(error6.message.includes('number'));
    t.true(error7 instanceof Error);
    t.true(enhanceComponent instanceof Vue);
});

test('same property will be override', (t) => {
    t.plan(3);

    let testModel = observable({
        count: 20,
        name: 'vue-mobx'
    });
    let vm2 = VueMobx.connect({
        testModel
    }, {})(vm);

    t.true(vm2.$isObservable(testModel));
    t.is(20, vm2.data().count.value);
    t.is('vue-mobx', vm2.data().name.value);
});

test('property which is not obserable will not be merged', (t) => {
    t.plan(2);

    let obj = {
        name: 'test'
    };
    let vm2 = VueMobx.connect({
        obj
    }, {})(new Vue({
        data: {
            count: 10
        }
    }));

    t.false(vm2.$isObservable(obj));
    t.false(vm2.data().hasOwnProperty('name'));
});

test('test methods and data change', (t) => {
    t.plan(5);

    function testAva(){}

    let testModel = observable({
        name: 'vue-mobx',
        changeName: action.bound(function(){
            this.name = 'mobx-vue';
        })
    });

    let vm2 = VueMobx.connect({
        testModel
    }, {
        'changeName': testModel.changeName,
        'testAva': testAva
    })(new Vue());

    t.true(vm2.hasOwnProperty('methods'));
    t.false(vm2.hasOwnProperty('testAva'));
    t.is(typeof vm2.methods['changeName'], 'function');
    t.is(vm2.data().name.value, 'vue-mobx');
    
    // call method
    vm2.methods['changeName']();

    t.is(vm2.data().name.value, 'mobx-vue');
});