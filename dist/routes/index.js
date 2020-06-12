"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var SessionController_1 = __importDefault(require("../authentication/SessionController"));
var PostController_1 = __importDefault(require("../controllers/Post/PostController"));
var routes = express_1.Router();
routes.post('/users/create', UserController_1.default.store);
routes.get('/users/list', UserController_1.default.index);
routes.post('/auth/login', SessionController_1.default.create);
routes.get('/auth', SessionController_1.default.load);
routes.post('/posts/create', PostController_1.default.store);
exports.default = routes;
