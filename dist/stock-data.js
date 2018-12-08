"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var bluebird_1 = require("bluebird");
var market_quotes_1 = __importDefault(require("market-quotes"));
var ARROW_UP = '\u2191';
var ARROW_RIGHT = '\u2192';
var ARROW_DOWN = '\u2193';
var Stock = /** @class */ (function () {
    function Stock() {
    }
    /**
     * Gets an arrow indicating change.
     * @param originalNumber The original number.
     * @param newNumber The new number.
     * @returns Unicode arrow.
     */
    Stock._getArrow = function (originalNumber, newNumber) {
        if (originalNumber > newNumber) {
            return ARROW_DOWN;
        }
        else if (originalNumber < newNumber) {
            return ARROW_UP;
        }
        else {
            return ARROW_RIGHT;
        }
    };
    /**
     * Gets a percentage change.
     * @param originalNumber The original number.
     * @param newNumber The new number.
     * @returns The percentage change.
     */
    Stock._getPercentChange = function (originalNumber, newNumber) {
        if (originalNumber === newNumber) {
            return 0.0;
        }
        else {
            return (newNumber - originalNumber) / originalNumber;
        }
    };
    /**
     * Gets ticker data.
     * @param symbolOrSymbols to get data price for.
     * @returns Symbol price data.
     */
    Stock.getPrice = function (symbolOrSymbols) {
        return __awaiter(this, void 0, void 0, function () {
            var symbols, promises;
            var _this = this;
            return __generator(this, function (_a) {
                symbols = (typeof (symbolOrSymbols) == 'string') ? [symbolOrSymbols] : symbolOrSymbols;
                promises = {};
                lodash_1.forEach(symbols, function (symbol) {
                    return promises[symbol] = market_quotes_1.default.getPrice(symbol)
                        .then(function (result) { return _this._transform(result); });
                });
                return [2 /*return*/, bluebird_1.props(promises)];
            });
        });
    };
    /**
     * Transforms a response into a formatted object.
     * @param data The data to transform.
     * @returns The transformed data.
     */
    Stock._transform = function (data) {
        var last = lodash_1.get(data, 'regularMarketPreviousClose');
        var current = lodash_1.get(data, 'regularMarketPrice');
        var delta = lodash_1.round(current - last, 3);
        var deltaPercent = lodash_1.round(this._getPercentChange(last, current) * 100, 2);
        var arrow = this._getArrow(last, current);
        lodash_1.set(data, 'change', delta);
        lodash_1.set(data, 'changePercent', deltaPercent);
        lodash_1.set(data, 'arrow', arrow);
        return data;
    };
    return Stock;
}());
exports.default = Stock;
