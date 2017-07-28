import Vue from 'vue';
export default function connect(mapData: object, mapMethods: object): <C extends Vue>(vueComponent: C) => C;
