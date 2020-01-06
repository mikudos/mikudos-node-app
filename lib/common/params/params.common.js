"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createParamDecorator(name, index, target, param) {
    Reflect.defineMetadata(name, index, target.constructor, 'index');
    param &&
        Reflect.defineMetadata(name, param, target.constructor, 'property');
}
exports.createParamDecorator = createParamDecorator;
