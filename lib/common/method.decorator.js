"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const metadataKeys = [constants_1.METHOD_METADATA];
exports.MethodMapping = (method) => {
    return (target, key, descriptor) => {
        let param = Reflect.getMetadata(constants_1.METHOD_METADATA, descriptor.value) || {
            methodList: []
        };
        param.methodList.push(method);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, param, descriptor.value);
        return descriptor;
    };
};
function Method(methodName) {
    return exports.MethodMapping(methodName);
}
exports.Method = Method;
