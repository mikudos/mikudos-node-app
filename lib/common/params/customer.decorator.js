"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_common_1 = require("./params.common");
function Customer(param) {
    return (target, propertyKey, parameterIndex) => {
        let len = Reflect.getMetadataKeys(target.prototype).filter(value => value.includes('Customer')).length;
        params_common_1.createParamDecorator(`Customer_${len}`, parameterIndex, target, param);
    };
}
exports.Customer = Customer;
