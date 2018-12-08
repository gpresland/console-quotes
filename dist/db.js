"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var os_1 = require("os");
var fs_1 = require("fs");
var db = /** @class */ (function () {
    function db() {
    }
    /**
     * Add symbol(s) to the portfolio.
     * @param portfolioName The portfolio to add the symbol(s) to.
     * @param symbols The symbol(s) to add to the portfolio.
     */
    db.add = function (portfolioName, symbols) {
        var _a;
        portfolioName = portfolioName.toUpperCase();
        if (fs_1.existsSync(db.FILE_PATH)) {
            var portfolios = this._read();
            var existingSymbols = lodash_1.get(portfolios, "portfolios." + portfolioName, []);
            var combinedSymbols_1 = new Set();
            lodash_1.forEach(symbols, function (symbol) { return combinedSymbols_1.add(symbol); });
            lodash_1.forEach(existingSymbols, function (symbol) { return combinedSymbols_1.add(symbol); });
            var newSymbols = Array
                .from(combinedSymbols_1)
                .map(function (symbol) { return symbol.toUpperCase(); })
                .sort();
            lodash_1.set(portfolios, "portfolios." + portfolioName, newSymbols);
            this._save(portfolios);
        }
        else {
            var newSymbols = symbols
                .map(function (symbol) { return symbol.toUpperCase(); })
                .sort();
            var data = JSON.stringify({ portfolios: (_a = {}, _a[portfolioName] = newSymbols, _a) });
            fs_1.writeFileSync(db.FILE_PATH, data);
        }
    };
    /**
     * Deletes a portfolio.
     * @param portfolioName The portfolio to delete.
     */
    db.del = function (portfolioName) {
        portfolioName = portfolioName.toUpperCase();
        if (!fs_1.existsSync(db.FILE_PATH)) {
            return;
        }
        var portfolios = this._read();
        var newPortfolio = lodash_1.omit(portfolios, "portfolios." + portfolioName.toUpperCase());
        this._save(newPortfolio);
    };
    /**
     * Get symbol(s) in portfolio.
     * @param portfolioName The portfolio to get.
     * @returns Symbol(s).
     */
    db.get = function (portfolioName) {
        portfolioName = portfolioName.toUpperCase();
        if (!fs_1.existsSync(db.FILE_PATH)) {
            return [];
        }
        var portfolios = this._read();
        return lodash_1.get(portfolios, "portfolios." + portfolioName, []);
    };
    /**
     * Gets portfolios.
     * @returns { [portfolioName]: [symbols]}
     */
    db.portfolios = function () {
        if (!fs_1.existsSync(db.FILE_PATH)) {
            return {};
        }
        var portfolios = this._read();
        return lodash_1.get(portfolios, 'portfolios', {});
    };
    /**
     * Removes symbol(s) from portfolio.
     * @param portfolioName The portfolio to remove from.
     * @param symbols The symbols to remove.
     */
    db.remove = function (portfolioName, symbols) {
        portfolioName = portfolioName.toUpperCase();
        if (!fs_1.existsSync(db.FILE_PATH)) {
            return;
        }
        var portfolios = this._read();
        var oldSymbols = lodash_1.get(portfolioName, "portfolios." + portfolioName, []);
        var newSymbols = oldSymbols.filter(function (symbol) { return symbols.indexOf(symbol) === -1; });
        lodash_1.set(portfolios, "portfolios." + portfolioName, newSymbols);
        this._write(portfolios);
    };
    /**
     * Create db file.
     */
    db._create = function () {
        this._save({
            portfolios: {}
        });
    };
    /**
     * Creates db file if necessary.
     */
    db._createIfNeeded = function () {
        if (!fs_1.existsSync(db.FILE_PATH)) {
            this._create();
        }
    };
    /**
     * Reads portfolios file.
     * @returns Portfolios.
     */
    db._read = function () {
        return JSON.parse(fs_1.readFileSync(db.FILE_PATH).toString());
    };
    /**
     * Saves data.
     * @param portfolios The data to save.
     */
    db._save = function (portfolios) {
        var data = JSON.stringify(portfolios);
        fs_1.writeFileSync(db.FILE_PATH, data);
    };
    /**
     * Write to disk.
     * @param data The portfolio.
     */
    db._write = function (data) {
        fs_1.writeFileSync(db.FILE_PATH, data);
    };
    /**
     * File name.
     */
    db.FILE_NAME = '.portfolios';
    /**
     * File path.
     */
    db.FILE_PATH = os_1.homedir + "/" + db.FILE_NAME;
    return db;
}());
exports.default = db;
