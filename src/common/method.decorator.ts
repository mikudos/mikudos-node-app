import { METHOD_METADATA } from './constants';
import { InvalidServiceConfigException } from './exceptions/invalid-service-config.exception';

const metadataKeys = [METHOD_METADATA];

export const MethodMapping = (method: string): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        let param = Reflect.getMetadata(METHOD_METADATA, descriptor.value) || {
            methodList: []
        };
        (param.methodList as Array<string>).push(method);
        Reflect.defineMetadata(METHOD_METADATA, param, descriptor.value);
        return descriptor;
    };
};

export function Method(methodName: string): MethodDecorator {
    return MethodMapping(methodName);
}
