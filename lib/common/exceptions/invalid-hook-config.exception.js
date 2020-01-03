"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class InvalidHookConfigException extends Error {
    constructor(property) {
        super(constants_1.INVALID_HOOK_CONFIG_MESSAGE `${property}`);
    }
}
exports.InvalidHookConfigException = InvalidHookConfigException;
