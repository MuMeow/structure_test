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
exports.updateDb = exports.writeDb = exports.readDb = void 0;
var fs = require("fs");
var message_1 = require("../src/constant/resp/message");
var readDb = function (keyName) { return __awaiter(void 0, void 0, void 0, function () {
    var readResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                readResult = new Promise(function (resolve, reject) {
                    fs.readFile("./db/db.json", "utf8", function (err, data) {
                        if (err) {
                            console.log("Error reading file from disk:", err);
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                        try {
                            var parseData = JSON.parse(data);
                            resolve(parseData[keyName]);
                        }
                        catch (err) {
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                    });
                });
                return [4 /*yield*/, Promise.resolve(readResult)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.readDb = readDb;
var writeDb = function (keyName, insertData) { return __awaiter(void 0, void 0, void 0, function () {
    var read, readData, writeResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                read = new Promise(function (resolve, reject) {
                    fs.readFile("./db/db.json", "utf8", function (err, data) {
                        if (err) {
                            console.log("Error reading file from disk:", err);
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                        try {
                            var parseData = JSON.parse(data);
                            resolve(parseData);
                        }
                        catch (err) {
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                    });
                });
                return [4 /*yield*/, Promise.resolve(read)];
            case 1:
                readData = _a.sent();
                if (typeof readData === "string")
                    return [2 /*return*/, message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR];
                try {
                    readData[keyName].push(insertData);
                }
                catch (err) {
                    return [2 /*return*/, message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR];
                }
                writeResult = new Promise(function (resolve, reject) {
                    fs.writeFile("./db/db.json", JSON.stringify(readData), function (err) {
                        if (err) {
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                        else {
                            resolve(message_1.RESPONSE_MESSAGE.SUCCESS);
                        }
                    });
                });
                return [4 /*yield*/, Promise.resolve(writeResult)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.writeDb = writeDb;
var updateDb = function (keyName, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var read, readData, getIndex, writeResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                read = new Promise(function (resolve, reject) {
                    fs.readFile("./db/db.json", "utf8", function (err, data) {
                        if (err) {
                            console.log("Error reading file from disk:", err);
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                        try {
                            var parseData = JSON.parse(data);
                            resolve(parseData);
                        }
                        catch (err) {
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                    });
                });
                return [4 /*yield*/, Promise.resolve(read)];
            case 1:
                readData = _a.sent();
                if (typeof readData === "string")
                    return [2 /*return*/, message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR];
                try {
                    getIndex = readData[keyName].findIndex(function (kN) { return kN["".concat(keyName, "_id")] === updateData["".concat(keyName, "_id")]; });
                    if (getIndex > -1)
                        readData[keyName][getIndex] = updateData;
                }
                catch (err) {
                    return [2 /*return*/, message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR];
                }
                writeResult = new Promise(function (resolve, reject) {
                    fs.writeFile("./db/db.json", JSON.stringify(readData), function (err) {
                        if (err) {
                            resolve(message_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
                        }
                        else {
                            resolve(message_1.RESPONSE_MESSAGE.SUCCESS);
                        }
                    });
                });
                return [4 /*yield*/, Promise.resolve(writeResult)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateDb = updateDb;
