"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mali_1 = __importDefault(require("mali"));
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
class Application extends mali_1.default {
    constructor(path, name, options) {
        super(path, name, options);
        this.config = config_1.default;
        this.settings = {};
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
        this.set(`services.${name}`, service);
        const methodMap = lodash_1.get(service, 'methodMap', {});
        for (const key in methodMap) {
            this.use(key, ...lodash_1.concat(lodash_1.get(hooks, 'before.all', []), lodash_1.get(hooks, `before.${methodMap[key]}`, [])), async (ctx) => await service[methodMap[key]](ctx), ...lodash_1.concat(lodash_1.get(hooks, 'after.all', []), lodash_1.get(hooks, `after.${methodMap[key]}`, [])));
        }
    }
}
exports.Application = Application;
