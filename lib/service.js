"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(handlers, methodMap, service, packageName) {
        this.handlers = handlers;
        this.methodMap = methodMap;
        this.service = service;
        this.name = '';
        this.package = packageName;
    }
}
exports.Service = Service;
