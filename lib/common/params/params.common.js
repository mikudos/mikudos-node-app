"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createParamDecorator(name, index, target, param) {
    Reflect.defineMetadata(name, { index, param }, target.prototype);
}
exports.createParamDecorator = createParamDecorator;
