import { HOOK_BEFORE, HOOK_AFTER } from './constants';
import { InvalidHookConfigException } from './exceptions/invalid-hook-config.exception';

const hookTypes = [HOOK_BEFORE, HOOK_AFTER];

export function HookMethod(
    type: string,
    hookFunc: (ctx: any, next: Function) => Promise<any> | any
): MethodDecorator {
    if (!hookTypes.includes(type)) throw new InvalidHookConfigException(type);
    return (target, key, descriptor: PropertyDescriptor) => {
        let hooks =
            (Reflect.getMetadata(type, descriptor.value) as Array<Function>) ||
            [];
        hooks.push(hookFunc);
        Reflect.defineMetadata(type, hooks, descriptor.value);
        return descriptor;
    };
}
