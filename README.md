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

#### 1. install vue-mobx plugin:

```js
// entry.js
import Vue from 'vue';
import {observable, isObservable, toJS} from 'mobx';
import VueMobx from 'vue-mobx';

Vue.use(VueMobx, {
    toJS: toJS, // must
    isObservable: isObservable, // must
    observable: observable,  // optional
});
```
#### 2. create models:

```js
// create models

import {observable, action} from 'mobx';

class Test {
    @observable
    count = 0;

    @action.bound
    changeCount(){
        ++this.count;
    }
}

const test = new Test();
export default test;
```

#### 3. use models in vue component:

```js
// in vue component
<template>
    <div>
        <p>count: {{count}}</p>
        <p @click="changeCount">Update</p>
    </div>
</template>    
<script>
    import testModel from './mobx/test';

    export default {
        fromMobx: {
            testModel
        }
    }
</script>
```

There is a full [example](https://github.com/dwqs/vue-mobx/tree/master/example).

## LICENSE

MIT
