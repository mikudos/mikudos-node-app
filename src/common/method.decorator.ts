import { METHOD_METADATA } from './constants';
import { InvalidServiceConfigException } from './exceptions/invalid-service-config.exception';

const metadataKeys = [METHOD_METADATA];

export const MethodMapping = (param: { method: string }): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        console.log('target:', target);
        console.log('TCL: key', key);
        Reflect.defineMetadata(METHOD_METADATA, param, descriptor.value);
        return descriptor;
    };
};

export function Method(methodName: string): MethodDecorator {
    return MethodMapping({
        method: methodName
    });
}
