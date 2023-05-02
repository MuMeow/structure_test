"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
// Start the server
var port = 3000;
Server_1.default.listen(port, "0.0.0.0", function () {
    console.log("service listening on : http://localhost:".concat(port));
});
