"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const params_common_1 = require("./params.common");
function App() {
    return (target, propertyKey, parameterIndex) => {
        params_common_1.createParamDecorator('App', parameterIndex, target);
    };
}
exports.App = App;
