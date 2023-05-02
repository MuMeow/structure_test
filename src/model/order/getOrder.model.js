"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderGet = void 0;
var jwt = require("jsonwebtoken");
var OrderGet = /** @class */ (function () {
    function OrderGet(req) {
        this.token = req.headers.token;
        this.userId = undefined;
        if (this.token) {
            var tokenDecode = jwt.decode(this.token);
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id;
            }
        }
    }
    return OrderGet;
}());
exports.OrderGet = OrderGet;
