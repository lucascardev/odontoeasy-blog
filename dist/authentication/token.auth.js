"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var ERR_INVALID_TOKEN = require('../errors/Errortypes').ERR_INVALID_TOKEN;
var ALGORITHM = 'HS256';
var autenticatelogin = function (data) { return (new Promise(function (resolve) {
    jsonwebtoken_1.default.sign(data, process.env.JWT_KEY, { algorithm: ALGORITHM, expiresIn: 3600 }, function (err, token) {
        if (err) {
            var err_1 = ERR_INVALID_TOKEN;
            resolve({ err: err_1 });
        }
        resolve({ token: token });
    });
})); };
var verifytoken = function (token) { return (new Promise(function (resolve) {
    // console.log(token);
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, { algorithms: [ALGORITHM] }, function (err, token) {
        if (err) {
            var err_2 = ERR_INVALID_TOKEN;
            resolve({ err: err_2 });
        }
        var unhashedtokendata = { token: token };
        resolve(unhashedtokendata);
    });
})); };
exports.default = {
    autenticatelogin: autenticatelogin,
    verifytoken: verifytoken
};
