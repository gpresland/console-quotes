"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var db_1 = __importDefault(require("../db"));
function list() {
    var portfolios = db_1.default.portfolios();
    lodash_1.forOwn(portfolios, function (value, key) {
        console.log(key, value);
    });
}
exports.list = list;
