"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCtr = void 0;
var postOrderCreate_model_1 = require("../../model/order/postOrderCreate.model");
var postOrderUpdateCancel_model_1 = require("../../model/order/postOrderUpdateCancel.model");
var getOrder_model_1 = require("../../model/order/getOrder.model");
var db_1 = require("../../../db/db");
var message_1 = require("../../constant/resp/message");
var orderStatus_1 = require("../../constant/order/orderStatus");
var OrderCtr = /** @class */ (function () {
    function OrderCtr() {
    }
    OrderCtr.prototype.postCreateOrder = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var reqInit, getUser, findUser, getProduct, findProduct, getOrder, allId, insertOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInit = new postOrderCreate_model_1.OrderPostCreate(req);
                        if (reqInit.error) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: reqInit.error
                                    }
                                }];
                        }
                        if (!reqInit.userId) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INVALID_TOKEN
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("user")];
                    case 1:
                        getUser = _a.sent();
                        if (getUser === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        findUser = getUser.find(function (u) { return u.user_id === reqInit.userId; });
                        if (!findUser) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.USER_NOT_FOUND
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("product")];
                    case 2:
                        getProduct = _a.sent();
                        if (getProduct === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        findProduct = getProduct.find(function (p) { return p.product_id === reqInit.productId; });
                        if (!findProduct) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.PRODUCT_NOT_FOUND
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("order")];
                    case 3:
                        getOrder = _a.sent();
                        if (getOrder === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        allId = getOrder.map(function (u) { return u.order_id; });
                        allId.sort(function (a, b) { return a - b; });
                        return [4 /*yield*/, (0, db_1.writeDb)("order", {
                                order_id: allId[allId.length - 1] + 1,
                                user_id: reqInit.userId,
                                product_id: reqInit.productId,
                                status: orderStatus_1.ORDER_STATUS.WAITING
                            })];
                    case 4:
                        insertOrder = _a.sent();
                        if (insertOrder === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        return [2 /*return*/, {
                                status: 200,
                                data: {
                                    data: {
                                        order_id: allId[allId.length - 1] + 1
                                    },
                                    msg: message_1.RESPONSE_MESSAGE.SUCCESS
                                }
                            }];
                }
            });
        });
    };
    OrderCtr.prototype.postUpdateCancelOrder = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var reqInit, getUser, findUser, getOrder, findOrder, updateOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInit = new postOrderUpdateCancel_model_1.OrderPostCancel(req);
                        if (reqInit.error) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: reqInit.error
                                    }
                                }];
                        }
                        if (!reqInit.userId) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INVALID_TOKEN
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("user")];
                    case 1:
                        getUser = _a.sent();
                        if (getUser === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        findUser = getUser.find(function (u) { return u.user_id === reqInit.userId; });
                        if (!findUser) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.USER_NOT_FOUND
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("order")];
                    case 2:
                        getOrder = _a.sent();
                        if (getOrder === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        findOrder = getOrder.find(function (p) { return p.order_id === reqInit.orderId; });
                        if (!findOrder) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.ORDER_NOT_FOUND
                                    }
                                }];
                        }
                        if (findOrder.user_id !== reqInit.userId) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.CANNOT_CANCEL_NOT_OWN_ORDER
                                    }
                                }];
                        }
                        if (findOrder.status !== orderStatus_1.ORDER_STATUS.WAITING) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.CANNOT_CANCEL_FINISH_CANCEL_ORDER
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.updateDb)("order", {
                                order_id: reqInit.orderId,
                                user_id: findOrder.user_id,
                                product_id: findOrder.product_id,
                                status: orderStatus_1.ORDER_STATUS.CANCEL
                            })];
                    case 3:
                        updateOrder = _a.sent();
                        if (updateOrder === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        return [2 /*return*/, {
                                status: 200,
                                data: {
                                    data: {
                                        order_id: reqInit.orderId
                                    },
                                    msg: message_1.RESPONSE_MESSAGE.SUCCESS
                                }
                            }];
                }
            });
        });
    };
    OrderCtr.prototype.getOrder = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var reqInit, getUser, findUser, getOrder, getProduct, allOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqInit = new getOrder_model_1.OrderGet(req);
                        if (reqInit.error) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: reqInit.error
                                    }
                                }];
                        }
                        if (!reqInit.userId) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INVALID_TOKEN
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("user")];
                    case 1:
                        getUser = _a.sent();
                        if (getUser === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        findUser = getUser.find(function (u) { return u.user_id === reqInit.userId; });
                        if (!findUser) {
                            return [2 /*return*/, {
                                    status: 400,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.USER_NOT_FOUND
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("order")];
                    case 2:
                        getOrder = _a.sent();
                        if (getOrder === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        return [4 /*yield*/, (0, db_1.readDb)("product")];
                    case 3:
                        getProduct = _a.sent();
                        if (getProduct === message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
                            return [2 /*return*/, {
                                    status: 500,
                                    data: {
                                        msg: message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                                    }
                                }];
                        }
                        allOrder = [];
                        getOrder.forEach(function (o) {
                            if (o.user_id === reqInit.userId && o.status === orderStatus_1.ORDER_STATUS.WAITING) {
                                var findProduct = getProduct.find(function (p) { return p.product_id === o.product_id; });
                                allOrder.push({
                                    order_id: o.order_id,
                                    user_id: o.user_id,
                                    product_id: o.product_id,
                                    product_name: (findProduct) ? findProduct.product_name : null,
                                    status: o.status
                                });
                            }
                        });
                        return [2 /*return*/, {
                                status: 200,
                                data: {
                                    data: allOrder,
                                    msg: message_1.RESPONSE_MESSAGE.SUCCESS
                                }
                            }];
                }
            });
        });
    };
    return OrderCtr;
}());
exports.OrderCtr = OrderCtr;
