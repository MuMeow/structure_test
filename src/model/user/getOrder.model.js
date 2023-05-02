"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetOrder = void 0;
var jwt = require("jsonwebtoken");
var UserGetOrder = /** @class */ (function () {
    function UserGetOrder(req) {
        this.token = req.headers.token;
        this.userId = undefined;
        if (this.token) {
            var tokenDecode = jwt.decode(this.token);
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id;
            }
        }
    }
    return UserGetOrder;
}());
exports.UserGetOrder = UserGetOrder;
