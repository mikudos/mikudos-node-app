import { createParamDecorator } from './params.common';

export function Customer(param: any) {
    return (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        let len = Reflect.getMetadataKeys(target.prototype).filter(value =>
            (value as string).includes('Customer')
        ).length;
        createParamDecorator(`Customer_${len}`, parameterIndex, target, param);
    };
}
