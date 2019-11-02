"use strict";
exports.__esModule = true;
var src_1 = require("../lib");
var path_1 = require("path");
var PROTO_PATH = path_1["default"].resolve(__dirname, './helloworld.proto');
var app = new src_1.Application(PROTO_PATH);
app.start("0.0.0.0:50051");
