import test from 'ava';
import {observable, isObservable, action, isAction, toJS} from 'mobx';
import Vue from 'vue';
import VueMobx from '../dist/index';

Vue.use(VueMobx, {
    // must
    toJS,
    // must
    isObservable,
    // optional
    observable,
});

class TestModel{
    @observable 
    name = 'vue-mobx';
    count = 3;
    @observable
    info = {
        project: 'vue-mobx'
    }

    @action
    changeName(){
        this.name = 'mobx-vue';
    }

    changeCount(){
        this.count = 2; 
    }

    @action
    async actionTest () {
        const v = await Promise.resolve('async action');
        this.name = v;
    }
}

test('fromMobx must be a object', (t) => {
    t.plan(4);
    const error = t.throws(() => {
        new Vue({
            template: '<div>parameter test</div>',
            fromMobx: 'test'
        })
    }, Error);

    const error2 = t.throws(() => {
        new Vue({
            template: '<div>parameter test</div>',
            fromMobx: 3
        })
    }, Error);

    t.true(error.message.includes('string'));
    t.true(error2.message.includes('number'));
});

test('same property will throw error', (t) => {
    t.plan(4);

    let testModel = new TestModel();

    const error = t.throws(() => {
        new Vue({
            template: '<div>same property will throw error</div>',
            data: {
                name: 'hello'
            },
            fromMobx: {
                testModel
            }
        })
    }, Error);

    const error2 = t.throws(() => {
        new Vue({
            template: '<div>same property will throw error</div>',
            data: {
                n: 'hello'
            },
            computed: {
                name () {
                    return 'error';
                }
            },
            fromMobx: {
                testModel
            }
        })
    }, Error);
    
    t.true(error.message.includes('already defined in data'));
    t.true(error2.message.includes('already defined in computed'));
});

test('property which is not obserable will not be merged', (t) => {
    t.plan(4);

    let testModel = new TestModel();

    const vm = new Vue({
        template: '<div>same property will throw error</div>',
        fromMobx: {
            testModel
        }
    })

    t.true(vm.name === 'vue-mobx');
    t.true(vm.hasOwnProperty('changeName'));
    t.false(vm.hasOwnProperty('count'));
    t.false(vm.hasOwnProperty('changeCount'));
});

class Model2 {
    test = '111';
}

test('test methods and data change', (t) => {
    t.plan(8);

    let testModel = new TestModel();

    const vm = new Vue({
        template: '<div>same property will throw error</div>',
        data(){
            return {
                message: 'hello'
            }
        },

        fromMobx: {
            testModel
        }
    });

    t.is(vm.info.project, 'vue-mobx') 
    t.is(typeof vm.$observable, 'function');
    t.is(typeof vm.$isObservable, 'function');
    t.is(typeof vm.$toJS, 'function');

    t.true(vm.$isObservable(testModel));
    t.false(vm.$isObservable(new Model2()));
    t.deepEqual({ project: 'vue-mobx' }, vm.$toJS(vm.info));

    // call method
    vm.changeName();

    t.is(vm.name, 'mobx-vue');
});

test('test async action', async (t) => {
    t.plan(4);

    let testModel = new TestModel();

    const vm = new Vue({
        template: '<div>vm1</div>',
        fromMobx: {
            testModel
        }
    });

    const vm2 = new Vue({
        template: '<div>vm2</div>',
        fromMobx: {
            testModel
        }
    });

    t.is(vm.name, 'vue-mobx');
    t.is(vm2.name, 'vue-mobx');

    await vm.actionTest();

    t.is(vm.name, 'async action');
    t.is(vm2.name, 'async action');
});