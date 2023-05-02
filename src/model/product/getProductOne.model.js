"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGetOne = void 0;
var jwt = require("jsonwebtoken");
var regex_1 = require("../../constant/regex/regex");
var ProductGetOne = /** @class */ (function () {
    function ProductGetOne(req) {
        this.productId = regex_1.ONLYNUMBER.test(req.query.product_id) ? Number(req.query.product_id) : req.query.product_id;
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
        if (req.query.product_id) {
            if (!regex_1.ONLYNUMBER.test(req.query.product_id))
                this.errorExtend.push('product_id invalid pattern');
        }
        else {
            this.errorExtend.push('require product_id');
        }
        if (this.errorExtend.length > 0)
            this.error = this.errorExtend.join(' , ');
    }
    return ProductGetOne;
}());
exports.ProductGetOne = ProductGetOne;
