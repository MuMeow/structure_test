"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPostRegister = void 0;
var AuthPostRegister = /** @class */ (function () {
    function AuthPostRegister(req) {
        this.username = req.body.username;
        this.password = req.body.password;
        this.fullname = req.body.fullname;
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
        if (this.fullname) {
            if (typeof this.fullname !== "string")
                this.errorExtend.push('fullname invalid type');
        }
        else {
            this.errorExtend.push('require fullname');
        }
        if (this.errorExtend.length > 0)
            this.error = this.errorExtend.join(' , ');
    }
    return AuthPostRegister;
}());
exports.AuthPostRegister = AuthPostRegister;
