import Vue from 'vue';

import { 
    assert, 
    isObject, 
    getValidModel, 
    getValidAction, 
    getMobxData, 
} from './utils';

export default function connect(mapData: object, mapMethods: object): <C extends Vue>(vueComponent: C) => C {
    return function connectedComponent<C extends Vue>(vueComponent: C): C{

        assert(isObject(mapData), `mapData should be a object not ${typeof mapData}`);
        assert(isObject(mapMethods), `mapMethods should be a object not ${typeof mapMethods}`);

        const validModels = getValidModel(mapData);
        const validActions = getValidAction(mapMethods);
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
