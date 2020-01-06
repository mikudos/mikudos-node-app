"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_service_config_exception_1 = require("./exceptions/invalid-service-config.exception");
const constants_1 = require("./constants");
const metadataKeys = [constants_1.METADATA.NAME, constants_1.METADATA.SERVICE_NAME, constants_1.METADATA.PACKAGE];
const validateKeys = (keys) => {
    const validateKey = (key) => {
        if (metadataKeys.includes(key)) {
            return;
        }
        throw new invalid_service_config_exception_1.InvalidServiceConfigException(key);
    };
    keys.forEach(validateKey);
};
function Service(metadata) {
    const propsKeys = Object.keys(metadata);
    validateKeys(propsKeys);
    return (target) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[property], target);
            }
        }
    };
}
exports.Service = Service;
