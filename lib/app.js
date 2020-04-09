"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mali_1 = __importDefault(require("mali"));
const config_1 = __importDefault(require("config"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('mikudos:app');
class Application extends mali_1.default {
    constructor(path, name, options) {
        super(path, name, options);
        this.services = {};
        this.settings = lodash_1.default.merge({}, config_1.default);
        debug('booting mikudos app');
    }
    get(name) {
        return lodash_1.default.get(this.settings, name);
    }
    set(name, value) {
        lodash_1.default.set(this.settings, name, value);
        return this;
    }
    disable(name) {
        lodash_1.default.set(this.settings, name, false);
        return this;
    }
    disabled(name) {
        return !lodash_1.default.get(this.settings, name);
    }
    enable(name) {
        lodash_1.default.set(this.settings, name, true);
        return this;
    }
    enabled(name) {
        return !!lodash_1.default.get(this.settings, name);
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
                    pack && (serviceName = `${pack}.${serviceName}`);
                    serviceName && keyArr.unshift(serviceName);
                }
                else {
                    let methName = keyArr.pop();
                    keyArr = [keyArr.join('.'), methName];
                }
                debug('register method: %o.%o with %o before hooks %o after hooks and %o serviceAfter hooks', name, key, (befores || []).length, (afters || []).length, (serviceAfters || []).length);
                this.use(...keyArr, ...(befores || []), async (ctx, next) => await service[key](ctx, next), ...(afters || []), ...(serviceAfters || []));
            });
        }
    }
    retriveParamsForService(serviceClass) {
        let params = [];
        let keys = Reflect.getMetadataKeys(serviceClass.prototype);
        for (const value of keys) {
            const metadata = Reflect.getMetadata(value, serviceClass.prototype);
            const { index, param } = metadata;
            if (value == 'App')
                params[index] = this;
            else
                params[index] = param;
        }
        return params;
    }
}
exports.Application = Application;
