"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_common_1 = require("./params.common");
function Customer(param) {
    return (target, propertyKey, parameterIndex) => {
        let len = Reflect.getMetadataKeys(target.constructor);
        params_common_1.createParamDecorator(`Customer_${len}`, parameterIndex, target, param);
    };
}
exports.Customer = Customer;
