"use strict";
exports.__esModule = true;
var __1 = require("..");
var path_1 = require("path");
var PROTO_PATH = path_1["default"].resolve(__dirname, './helloworld.proto');
var app = new __1["default"](PROTO_PATH);
app.start("0.0.0.0:50051");
