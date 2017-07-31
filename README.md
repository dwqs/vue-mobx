[![build pass](https://api.travis-ci.org/dwqs/vue-mobx.svg?branch=master)](https://travis-ci.org/dwqs/vue-mobx) ![npm-version](https://img.shields.io/npm/v/vue-mobx.svg) ![license](https://img.shields.io/npm/l/vue-mobx.svg) ![bower-license](https://img.shields.io/bower/l/vue-mobx.svg)

# vue-mobx

Mobx binding for Vue.

> Only supports Vuejs 2.x & Mobx 2.2.x or higher.

## Installation
Install the pkg with npm:

```
npm install vue-mobx --save
```

or yarn

```
yarn add vue-mobx
```

or bower

```
bower install vue-mobx
```

## Usage

Obviously it works with Mobx and Vuejs, install via NPM: `npm i --save mobx vue vue-mobx`:

```
// entry.js
import Vue from 'vue';
import {observable, isObservable, toJS} from 'mobx';
import VueMobx from 'vue-mobx';

Vue.use(VueMobx, {
    toJS: toJS, // must
    isObservable: isObservable, // must
    observable: observable,  // optional
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
        // map models
        testModel
    })(TestComponent)
</script>
```

There is a full [example](https://github.com/dwqs/vue-mobx/tree/master/example).

You can also hot-link the CDN version: [https://unpkg.com/vue-mobx/dist/index.min.js](https://unpkg.com/vue-mobx@0.2.6/dist/index.min.js), `VueMobx` is exposed to `window` object.

## LICENSE

MIT
