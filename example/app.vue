<template>
    <div class="test">
        <div>
            <p>{{title}} count: {{count}}</p>
            <p @click="changeCount">Update</p>
        </div>
        <ul>
            <li v-for="(item, index) in $observable(numbers.value).slice()" :key="index" @click="deleteTodo(index)">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import testModel from './models/test';
    import {connect} from 'vue-mobx';

    const TestComponent = {
        data(){
            return {
                title: 'test'
            }
        },

        updated(){
            console.log('info updated', this.info.value);
        }
    };

    export default connect({
        // map data
        testModel
    }, {
        // map methods
        "changeCount": testModel.changeCount,
        "deleteTodo": testModel.deleteTodo
    })(TestComponent)
</script>