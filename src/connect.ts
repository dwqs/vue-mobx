import Vue from 'vue';

import { 
    assert, 
    isObject, 
    getValidModel, 
    getValidAction, 
    getMobxData, 
} from './utils';

// components hooks
const $internalHooks = [
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'beforeRouteEnter',
    'beforeRouteLeave',
];

// components resources
const $internalResources = [
    'filters',
    'directives',
    'components',
    'computed',
];

export function connect(mapModels: object): <C extends Vue>(vueComponent: C) => C {
    return function connectedComponent<C extends Vue>(vueComponent: C): C{

        assert(isObject(mapModels), `mapData should be a object not ${typeof mapModels}`);

        const validModels = getValidModel(mapModels);
        const validActions = getValidAction(validModels);
        const mobxData = getMobxData(validModels);

        let oldMethodsAndData: any = {
            data: {},
            methods: {},
        };
        let vm: typeof Vue;
        let enhanceVueComponent: any;
        
        if (typeof vueComponent === 'object') {
            oldMethodsAndData = {
                data: ((vueComponent as any).data && (vueComponent as any).data()) || {},
                methods: (vueComponent as any).methods || {},
            };
        } else {
            // for vue class syntax
            vm = new (vueComponent as any)();
            oldMethodsAndData = {
                data: (vm as any)._data || {},
                methods: (vm as any).$options.methods || {},
            };

            enhanceVueComponent = (Object as any).assign({}, {
                data: function data() {
                    return (Object as any).assign({}, oldMethodsAndData.data, mobxData)
                },
                methods: (Object as any).assign({}, oldMethodsAndData.methods, validActions),
            });

            $internalHooks.forEach((hook) => {
                if ((vm as any).$options[hook]) {
                    enhanceVueComponent[hook] = (vm as any).$options[hook];
                }
            });

            $internalResources.forEach((res) => {
                if ((vm as any).$options[res]) {
                    enhanceVueComponent[res] = (vm as any).$options[res];
                }
            });

            return enhanceVueComponent;
        }

        enhanceVueComponent = (Object as any).assign(vueComponent, {
            methods: {
                ...(Object as any).assign(oldMethodsAndData.methods, {
                    ...validActions,
                }),
            },
            data: () => (Object as any).assign(oldMethodsAndData.data, {
                ...mobxData,
            }),
        });

        return enhanceVueComponent;
    }
}
