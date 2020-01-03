import { HOOK_BEFORE, HOOK_AFTER } from './constants';
import { InvalidHookConfigException } from './exceptions/invalid-hook-config.exception';

const hookTypes = [HOOK_BEFORE, HOOK_AFTER];

export function HookService(
    type: string,
    hookFunc: (ctx: any, next: Function) => Promise<any> | any
): ClassDecorator {
    if (!hookTypes.includes(type)) throw new InvalidHookConfigException(type);
    return (target: object) => {
        let hooks =
            (Reflect.getMetadata(type, target) as Array<Function>) || [];
        hooks.push(hookFunc);
        Reflect.defineMetadata(type, hooks, target);
    };
}
