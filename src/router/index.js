"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_route_1 = require("./auth.route");
// import UserRoute from './agent.route'
// import ProductRoute from './product.route'
// import OrderRoute from './order.route'
var router = (0, express_1.Router)();
// const AuthenToken = (req: Request, res: Response, next: NextFunction) => {
//     const header: { token: string } = req.headers as { token: string }
//     if (header.token === '')
//         return res.status(401)
//             .json({
//                 data: 'require token',
//                 code: 401000,
//                 devMessage: 'Unauthorized'
//             })
//     jwt.verify(header.token, "1234", (err: any) => {
//         if (err) {
//             return res.status(401)
//                 .json({
//                     data: null,
//                     code: 401000,
//                     devMessage: 'Unauthorized'
//                 })
//         }
//         next()
//     })
// }
router.use('/auth', auth_route_1.default);
// router.use('/user', AuthenToken, UserRoute)
// router.use('/product', AuthenToken, ProductRoute)
// router.use('/order', AuthenToken, OrderRoute)
exports.default = router;
