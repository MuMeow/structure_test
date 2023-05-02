"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("./router");
var server = router_1.app.listen(10800, "0.0.0.0", function () {
    var _a = server.address(), port = _a.port, address = _a.address;
    console.log("service listening on :", "http://" + address + ":" + port);
});
