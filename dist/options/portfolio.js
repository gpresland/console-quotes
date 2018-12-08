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
var chalk_1 = __importDefault(require("chalk"));
var numeral_1 = __importDefault(require("numeral"));
var db_1 = __importDefault(require("../db"));
var table_1 = __importDefault(require("../table"));
var stock_data_1 = __importDefault(require("../stock-data"));
var DOWN_ARROW = '\u2193';
var DOWN_TRIANGLE = '\u25BC';
var UP_ARROW = '\u2191';
var UP_TRIANGLE = '\u25B2';
/**
 * Prints a portfolio to console.
 * @param name The portfolio name.
 */
function printPortfolio(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
/**
 * Outputs portfolio.
 * @param portfolioName [OPTIONAL] Portfolio to output. Otherwise, all portfolios.
 */
exports.portfolio = function (portfolioName) {
    return __awaiter(this, void 0, void 0, function () {
        var portfolios, symbols, data, options, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (lodash_1.isNil(portfolioName)) {
                        portfolios = db_1.default.portfolios();
                        lodash_1.forOwn(portfolios, function (value, key) {
                            console.log(key + ":");
                            exports.portfolio(key);
                        });
                        return [2 /*return*/];
                    }
                    symbols = db_1.default.get(portfolioName);
                    return [4 /*yield*/, stock_data_1.default.getPrice(symbols)];
                case 1:
                    data = _a.sent();
                    options = {
                        columns: {
                            symbol: { alias: 'Symbol', transform: function (v) { return v; } },
                            regularMarketPrice: { alias: 'Last', transform: function (v) { return numeral_1.default(v).format('0.00'); } },
                            change: { alias: 'Chg', transform: function (v) { return v >= 0 ? chalk_1.default.green(v) : chalk_1.default.red(v); } },
                            changePercent: { alias: '% Chg', transform: function (v) { return v >= 0 ? chalk_1.default.green(v + "%") : chalk_1.default.red(v + "%"); } },
                            regularMarketOpen: { alias: 'Open', transform: function (v) { return numeral_1.default(v).format('0.00'); } },
                            regularMarketDayHigh: { alias: 'High', transform: function (v) { return numeral_1.default(v).format('0.00'); } },
                            regularMarketDayLow: { alias: 'Low', transform: function (v) { return numeral_1.default(v).format('0.00'); } },
                            regularMarketVolume: { alias: 'Volume', transform: function (v) { return numeral_1.default(v).format('0,0'); } }
                        },
                        isPadded: true,
                    };
                    table = new table_1.default(data, options);
                    table.print();
                    return [2 /*return*/];
            }
        });
    });
};
