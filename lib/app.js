"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mali_1 = __importDefault(require("mali"));
const config_1 = __importDefault(require("config"));
class Application extends mali_1.default {
    constructor(path, name, options) {
        super(path, name, options);
        this.services = {};
        this.config = config_1.default;
        this.settings = lodash_1.default.merge({}, config_1.default);
    }
    get(name) {
        return this.settings[name];
    }
    set(name, value) {
        this.settings[name] = value;
        return this;
    }
    disable(name) {
        this.settings[name] = false;
        return this;
    }
    disabled(name) {
        return !this.settings[name];
    }
    enable(name) {
        this.settings[name] = true;
        return this;
    }
    enabled(name) {
        return !!this.settings[name];
    }
    configure(fn) {
        fn.call(this, this);
        return this;
    }
    register(serviceClass) {
        const pack = Reflect.getMetadata('package', serviceClass);
        const name = Reflect.getMetadata('name', serviceClass);
        let serviceName = Reflect.getMetadata('serviceName', serviceClass);
        serviceName = serviceName || name;
        const serviceBefores = Reflect.getMetadata('before', serviceClass);
        const serviceAfters = Reflect.getMetadata('after', serviceClass);
        if (serviceBefores) {
            this.use(`${pack ? pack + '.' : ''}${serviceName}`, ...serviceBefores);
        }
        const service = new serviceClass(...this.retriveParamsForService(serviceClass));
        this.services[name] = service;
        let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
        for (const key of properties) {
            const method = service[key];
            if (!Reflect.hasMetadata('method', method))
                continue;
            let param = Reflect.getMetadata('method', method);
            let befores = Reflect.getMetadata('before', method);
            let afters = Reflect.getMetadata('after', method);
            let methodList = param.methodList;
            methodList.forEach((methodName) => {
                let keyArr = methodName.split('.');
                if (keyArr.length === 1) {
                    let serviceName = name;
                    pack && (serviceName = `${pack}.${name}`);
                    serviceName && keyArr.unshift(serviceName);
                }
                else {
                    let methName = keyArr.pop();
                    keyArr = [keyArr.join('.'), methName];
                }
                this.use(...keyArr, ...(befores || []), async (ctx) => await method(ctx), ...(afters || []), ...(serviceAfters || []));
            });
        }
    }
    retriveParamsForService(serviceClass) {
        let params = [];
        let keys = Reflect.getMetadataKeys(serviceClass.constructor, 'index');
        keys.map(value => {
            let index = Reflect.getMetadata(value, serviceClass.constructor, 'index');
            let param = Reflect.getMetadata(value, serviceClass.constructor, 'property');
            if (value === 'App')
                param = this;
            typeof index == 'number' && (params[index] = param);
            console.log('TCL: index', params);
        });
        return params;
    }
}
exports.Application = Application;
