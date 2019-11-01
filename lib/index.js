"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mali_1 = __importDefault(require("mali"));
const config_1 = __importDefault(require("config"));
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
}
exports.Application = Application;
