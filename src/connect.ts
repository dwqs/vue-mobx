import Vue from 'vue';

import { 
    assert, 
    isObject, 
    getValidModel, 
    getValidAction, 
    getMobxData, 
} from './utils';

export default function connect(mapModels: object): <C extends Vue>(vueComponent: C) => C {
    return function connectedComponent<C extends Vue>(vueComponent: C): C{

        assert(isObject(mapModels), `mapData should be a object not ${typeof mapModels}`);

        const validModels = getValidModel(mapModels);
        const validActions = getValidAction(validModels);
        const mobxData = getMobxData(validModels);
        
        const oldMethodsAndData = {
            data: ((vueComponent as any).data && (vueComponent as any).data()) || {},
            methods: ((vueComponent as any).methods && (vueComponent as any).methods) || {},
        };

        const enhanceVueComponent = (Object as any).assign(vueComponent, {
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
