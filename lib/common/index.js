"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_decorator_1 = require("./service.decorator");
const method_decorator_1 = require("./method.decorator");
require("reflect-metadata");
let Test = class Test {
    constructor() { }
    test111() {
        console.log('111');
    }
    test222() { }
};
__decorate([
    method_decorator_1.Method('test')
], Test.prototype, "test111", null);
Test = __decorate([
    service_decorator_1.Service({ name: 'teste11' })
], Test);
let t = new Test();
let res = Reflect.hasMetadata('method', t.test222);
console.log('TCL: res', res);
let metadata = Reflect.getMetadata('method', t.test111);
console.log('TCL: metadata', metadata);
