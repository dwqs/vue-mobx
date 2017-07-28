import {observable, action} from 'mobx';

class Test {
    @observable
    count = 0;   // only observable property will be merge into vue component's data
    count2 = 1;  // not will be merge into vue component's data
    @observable
    numbers = [];  // ObservableArray
    @observable
    info = {
        // ObservableObject
        name: 'test'
    }

    /**
     * 1. use @action.bound for bind correct this.
     * 2. only the method used @action decorator will be merge into vue component's methods
     */
    @action.bound   
    changeCount(){
        ++this.count;
        this.info = Object.assign({}, this.info, {
            count: this.count
        });
        this.numbers = [].concat(observable(this.numbers).slice(), this.count);
    }

    // changeCount2 not will be merge into vue component's methods
    changeCount2(){
        ++this.count2;
    }

    @action.bound
    deleteTodo(index){
        let v = Promise.resolve('deleteTodo');
        let list = observable(this.numbers).slice();
        list.splice(index, 1);
        this.deleteTodo = list;
    }
}