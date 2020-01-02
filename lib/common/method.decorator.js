"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const metadataKeys = [constants_1.METHOD_METADATA];
exports.MethodMapping = (param) => {
    return (target, key, descriptor) => {
        console.log('target:', target);
        console.log('TCL: key', key);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, param, descriptor.value);
        return descriptor;
    };
};
function Method(methodName) {
    return exports.MethodMapping({
        method: methodName
    });
}
exports.Method = Method;
