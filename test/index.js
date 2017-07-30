import test from 'ava';
import {observable, isObservable, action, isAction, toJS} from 'mobx';
import Vue from 'vue';
import VueMobx from '../dist/index';

Vue.use(VueMobx, {
    // must
    toJS,
    // optional
    observable,
    isObservable 
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
}

test('connect should be a function', (t) => {
    t.plan(1);
    
    t.is(typeof VueMobx.connect, 'function');
});

test('the parameter of connect function should be a object(besides null)', (t) => {
    t.plan(9);

    let vm = new Vue({
        template: '<div>parameter test</div>'
    })

    const error = t.throws(() => {
        VueMobx.connect('test')(vm)
    }, Error);

    const error2 = t.throws(() => {
        VueMobx.connect(undefined)(vm)
    }, Error);

    const error3 = t.throws(() => {
        VueMobx.connect(3)(vm)
    }, Error);

    const error4 = t.throws(() => {
        VueMobx.connect(null)(vm)
    }, Error);

    let enhanceComponent = VueMobx.connect({})(vm);;

    t.true(error.message.includes('string'));
    t.true(error2.message.includes('undefined'));
    t.true(error3.message.includes('number'));
    t.true(error4 instanceof Error);
    t.true(enhanceComponent instanceof Vue);
});

test('same property will be override', (t) => {
    t.plan(1);

    let testModel = new TestModel();
    let com = {
        template: '<div>same property will be override</div>',
        data(){
            return {
                name: 'hello'
            }
        }
    }
    let enhanceComponent = VueMobx.connect({
        testModel
    })(com);

    let vc = new Vue({
        ...enhanceComponent
    });

    t.is(vc.$data.name, 'vue-mobx');
});

test('property which is not obserable will not be merged', (t) => {
    t.plan(3);

    let testModel = new TestModel();
    
    let enhanceComponent = VueMobx.connect({
        testModel
    })({});

    let vc = new Vue({
        ...enhanceComponent
    });

    t.true(vc.$data.hasOwnProperty('name'));
    t.false(vc.$data.hasOwnProperty('count'));
    t.false(vc.hasOwnProperty('changeCount'));
});

class TestModel2 {
    msg = 'TestModel2';
}

test('test methods and data change', (t) => {
    t.plan(9);

    let testModel = new TestModel();

    let component = {
        template: '<div>hello</div>',
        data(){
            return {
                message: 'hello'
            }
        }
    }

    let enhanceComponent = VueMobx.connect({
        testModel
    })(component);

    let vc = new Vue({
        ...enhanceComponent
    });

    t.deepEqual({name: 'vue-mobx', info: {project: 'vue-mobx'}, message: 'hello'}, vc.$data) 
    t.true(vc.hasOwnProperty('changeName'));

    t.is(typeof vc.$observable, 'function');
    t.is(typeof vc.$isObservable, 'function');
    t.is(typeof vc.$toJS, 'function');

    t.true(vc.$isObservable(testModel));
    t.false(vc.$isObservable(new TestModel2()));
    t.deepEqual({ project: 'vue-mobx' }, vc.$toJS(vc.$data.info));

    // call method
    vc.changeName();

    t.is(vc.$data.name, 'mobx-vue');
});