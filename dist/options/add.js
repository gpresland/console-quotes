"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var db_1 = __importDefault(require("../db"));
/**
 * Add symbols to portfolio.
 * @param args Command line arguments.
 */
function add(args) {
    if (args.length < 2) {
        throw new Error('Invalid syntax. Use <portfolio> <symbol> <symbol>..');
    }
    var portfolioName = lodash_1.first(args) || '';
    if (lodash_1.isNil(portfolioName)) {
        return;
    }
    var symbols = lodash_1.tail(args);
    db_1.default.add(portfolioName, symbols);
}
exports.add = add;
