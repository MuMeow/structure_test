"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt = require("jsonwebtoken");
var auth_route_1 = require("./auth.route");
// import UserRoute from './agent.route'
// import ProductRoute from './product.route'
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
            return res.status(401)
                .json({
                data: null,
                code: 401000,
                devMessage: 'Unauthorized'
            });
        }
        next();
    });
};
router.use('/auth', auth_route_1.default);
// router.use('/user', AuthToken, UserRoute)
// router.use('/product', AuthToken, ProductRoute)
// router.use('/order', AuthToken, OrderRoute)
exports.default = router;
