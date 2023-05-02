"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require("jsonwebtoken");
var message_1 = require("../constant/resp/message");
var auth_route_1 = require("./auth.route");
var user_route_1 = require("./user.route");
var product_route_1 = require("./product.route");
// import OrderRoute from './order.route'
var router = (0, express_1.Router)();
var AuthToken = function (req, res, next) {
    var header = req.headers;
    if (header.token === '' || header.token === undefined) {
        return res.status(401).json({
            msg: "require token"
        });
    }
    jwt.verify(header.token, "1234", function (err) {
        if (err) {
            return res.status(401).json({
                msg: message_1.RESPONSE_MESSAGE.INVALID_TOKEN
            });
        }
        next();
    });
};
router.use('/auth', auth_route_1.default);
router.use('/user', AuthToken, user_route_1.default);
router.use('/product', AuthToken, product_route_1.default);
// router.use('/order', AuthToken, OrderRoute)
exports.default = router;
