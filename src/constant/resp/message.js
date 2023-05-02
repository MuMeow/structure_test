"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_MESSAGE = void 0;
var RESPONSE_MESSAGE;
(function (RESPONSE_MESSAGE) {
    RESPONSE_MESSAGE["SUCCESS"] = "success";
    RESPONSE_MESSAGE["USER_NOT_FOUND"] = "user not found";
    RESPONSE_MESSAGE["PRODUCT_NOT_FOUND"] = "product not found";
    RESPONSE_MESSAGE["ORDER_NOT_FOUND"] = "order not found";
    RESPONSE_MESSAGE["CANNOT_CANCEL_NOT_OWN_ORDER"] = "can't cancel not own order";
    RESPONSE_MESSAGE["CANNOT_CANCEL_FINISH_CANCEL_ORDER"] = "can't cancel finish or cancel order";
    RESPONSE_MESSAGE["WRONG_PASSWORD"] = "wrong password";
    RESPONSE_MESSAGE["DUPLICATE_USERNAME"] = "duplicate username";
    RESPONSE_MESSAGE["DUPLICATE_FULLNAME"] = "duplicate fullname";
    RESPONSE_MESSAGE["INVALID_TOKEN"] = "invalid token";
    RESPONSE_MESSAGE["INTERNAL_SERVER_ERROR"] = "internal server error";
})(RESPONSE_MESSAGE || (RESPONSE_MESSAGE = {}));
exports.RESPONSE_MESSAGE = RESPONSE_MESSAGE;
