"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
/**
 * Deletes a portfolio.
 * @param portfolio The portfolio to delete.
 */
function del(portfolio) {
    db_1.default.del(portfolio);
}
exports.del = del;
