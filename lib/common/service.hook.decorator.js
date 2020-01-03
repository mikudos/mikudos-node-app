"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const invalid_hook_config_exception_1 = require("./exceptions/invalid-hook-config.exception");
const hookTypes = [constants_1.HOOK_BEFORE, constants_1.HOOK_AFTER];
function HookService(type, hookFunc) {
    if (!hookTypes.includes(type))
        throw new invalid_hook_config_exception_1.InvalidHookConfigException(type);
    return (target) => {
        let hooks = Reflect.getMetadata(type, target) || [];
        hooks.push(hookFunc);
        Reflect.defineMetadata(type, hooks, target);
    };
}
exports.HookService = HookService;
