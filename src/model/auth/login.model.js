"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPostLogin = void 0;
var AuthPostLogin = /** @class */ (function () {
    function AuthPostLogin(req) {
        this.username = req.body.username;
        this.password = req.body.password;
        this.error = undefined;
        this.errorExtend = [];
        if (this.username) {
            if (typeof this.username !== "string")
                this.errorExtend.push('username invalid type');
        }
        else {
            this.errorExtend.push('require username');
        }
        if (this.password) {
            if (typeof this.password !== "string")
                this.errorExtend.push('password invalid type');
        }
        else {
            this.errorExtend.push('require password');
        }
        if (this.errorExtend.length > 0)
            this.error = this.errorExtend.join(' , ');
    }
    return AuthPostLogin;
}());
exports.AuthPostLogin = AuthPostLogin;
