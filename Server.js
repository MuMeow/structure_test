"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var router_1 = require("./router");
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '10MB' }));
app.use('/', router_1.default);
exports.default = app;
