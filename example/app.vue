<template>
    <div class="test">
        <div>
            <p>{{title}} count: {{count}}</p>
            <p @click="changeCount">Update</p>
        </div>
        <ul>
            <li v-for="(item, index) in $toJS(numbers)" :key="index" @click="deleteTodo(index)">
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
            console.log('info updated', this.$toJS(this.info));
        }
    };

    export default connect({
        // map models
        testModel
    })(TestComponent)
</script>