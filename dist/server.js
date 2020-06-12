"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var next_1 = __importDefault(require("next"));
require('dotenv/config');
var PORT = process.env.PORT || 3000;
var dev = process.env.NODE_ENV !== "production";
var app = next_1.default({ dev: dev });
var routes_1 = __importDefault(require("./routes"));
var server = express_1.default();
var handle = app.getRequestHandler();
app
    .prepare()
    .then(function () {
    server.use(express_1.default.json());
    server.use(cors());
    server.use(routes_1.default);
    server.get('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(PORT, function (err) {
        if (err)
            throw err;
        console.log("> Ready on localhost:" + PORT + " - env " + process.env.NODE_ENV);
    });
})
    .catch(function (exception) {
    console.error(exception.stack);
    process.exit(1);
});
