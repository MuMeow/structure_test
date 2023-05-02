"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPostCancel = void 0;
var jwt = require("jsonwebtoken");
var regex_1 = require("../../constant/regex/regex");
var OrderPostCancel = /** @class */ (function () {
    function OrderPostCancel(req) {
        this.orderId = req.body.order_id;
        this.token = req.headers.token;
        this.userId = undefined;
        this.error = undefined;
        this.errorExtend = [];
        if (this.token) {
            var tokenDecode = jwt.decode(this.token);
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id;
            }
        }
        if (req.body.order_id) {
            if (!regex_1.ONLYNUMBER.test(req.body.order_id))
                this.errorExtend.push('order_id invalid pattern');
        }
        else {
            this.errorExtend.push('require order_id');
        }
        if (this.errorExtend.length > 0)
            this.error = this.errorExtend.join(' , ');
    }
    return OrderPostCancel;
}());
exports.OrderPostCancel = OrderPostCancel;
