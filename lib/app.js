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
        const serviceBefores = Reflect.getMetadata('befores', serviceClass);
        const serviceAfters = Reflect.getMetadata('afters', serviceClass);
        if (serviceBefores) {
            this.use(`${pack}.${name}`, ...serviceBefores);
        }
        const service = new serviceClass();
        this.services[name] = service;
        for (const key in service) {
            if (service.hasOwnProperty(key)) {
                const method = service[key];
                if (!Reflect.hasMetadata('method', method))
                    continue;
                let methodName = Reflect.getMetadata('method', method);
                let befores = Reflect.getMetadata('before', method);
                let afters = Reflect.getMetadata('after', method);
                let keyArr = methodName.split('.');
                if (keyArr.length === 1) {
                    name && keyArr.unshift(name);
                    pack && keyArr.unshift(pack);
                }
                this.use(...keyArr, ...(befores || []), async (ctx) => await method(ctx), ...(afters || []), ...(serviceAfters || []));
            }
        }
        // const methodMap = get(service, 'methodMap');
        // for (const key in methodMap) {
        //     let keyArr = [key];
        //     service.service &&
        //         keyArr.unshift(
        //             `${service.package ? service.package + '.' : ''}${
        //                 service.service
        //             }`
        //         );
        //     this.use(
        //         ...keyArr,
        //         ...concat(
        //             get(hooks, 'before.all', []),
        //             get(hooks, `before.${key}`, [])
        //         ),
        //         async (ctx: any) => await service.handlers[methodMap[key]](ctx),
        //         ...concat(
        //             get(hooks, 'after.all', []),
        //             get(hooks, `after.${key}`, [])
        //         )
        //     );
        // }
    }
}
exports.Application = Application;
