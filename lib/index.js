"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mali_1 = __importDefault(require("mali"));
const config_1 = __importDefault(require("config"));
const lodash_2 = require("lodash");
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
    register(name, service, hooks = {}) {
        this.services[name] = service;
        const methodMap = lodash_2.get(service, 'methodMap');
        for (const key in methodMap) {
            let keyArr = [key];
            service.service &&
                keyArr.unshift(`${service.package ? service.package + '.' : ''}${service.service}`);
            this.use(...keyArr, ...lodash_2.concat(lodash_2.get(hooks, 'before.all', []), lodash_2.get(hooks, `before.${key}`, [])), async (ctx) => await service.handlers[methodMap[key]](ctx), ...lodash_2.concat(lodash_2.get(hooks, 'after.all', []), lodash_2.get(hooks, `after.${key}`, [])));
        }
    }
}
exports.Application = Application;
