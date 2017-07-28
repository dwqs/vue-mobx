![npm-version](https://img.shields.io/npm/v/vue-mobx.svg) ![license](https://img.shields.io/npm/l/vue-mobx.svg) ![bower-license](https://img.shields.io/bower/l/vue-mobx.svg)

# vue-mobx

Mobx binding for Vue.

> Only supports Vuejs 2.x current.

## Installation
Install the pkg with npm:

```
npm install redux-actions-promise --save
```

or yarn

```
yarn add redux-actions-promise
```

or bower

```
bower install redux-actions-promise
```

## Usage

Obviously it works with Redux and Vuejs, install via NPM: `npm i --save mobx vue vue-mobx`:

```
// entry.js
import Vue from 'vue';
import {observable, isObservable} from 'mobx';
import VueMobx from 'vue-mobx';

Vue.use(VueMobx, {
    observable: observable,
    isObservable: isObservable
});

// create models

import {observable, action} from 'mobx';

Class Test {
    @observable
    count = 0;

    @action.bound
    changeCount(){
        ++this.count;
    }
}

const test = new Test();
export default test;

// in vue component
<template>
    <div>
        <p>count: {{count}}</p>
        <p @click="changeCount">Update</p>
    </div>
</template>    
<script>
    import testModel from './mobx/test';
    import {connect} from 'vue-mobx';

    const TestComponent = {

    }
    
    export default connect({
        // map state
        testModel
    }, {
        // map methods
        'changeCount': testModel.changeCount
    })(TestComponent)
</script>
```

## LICENSE

MIT
