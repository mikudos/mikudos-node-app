"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class InvalidServiceConfigException extends Error {
    constructor(property) {
        super(constants_1.INVALID_SERVICE_CONFIG_MESSAGE `${property}`);
    }
}
exports.InvalidServiceConfigException = InvalidServiceConfigException;
