import { createParamDecorator } from './params.common';

export function Customer(param: any) {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        let len = Reflect.getMetadataKeys(target.constructor);
        createParamDecorator(`Customer_${len}`, parameterIndex, target, param);
    };
}
