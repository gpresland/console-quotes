"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var pkg = require('../package.json');
var lodash_2 = require("lodash");
var commander_1 = __importDefault(require("commander"));
var options_1 = require("./options");
commander_1.default
    .version(pkg.version)
    .description('Command Line Quotes')
    .option('-a, --add', 'adds a symbol')
    .option('-d, --delete', 'deletes a portfolio')
    .option('-l, --list', 'lists portfolios and their symbols')
    .option('-o, --open', 'opens the portfolio for manual editing')
    .option('-p, --portfolio', 'shows your portfolio')
    .option('-r, --remove', 'removes a symbol from a portfolio')
    .parse(process.argv);
if (commander_1.default.add) {
    options_1.add(commander_1.default.args);
}
else if (commander_1.default.delete) {
    var portfolio_1 = lodash_2.first(commander_1.default.args) || '';
    if (lodash_1.isNil(portfolio_1)) {
        process.exit();
    }
    options_1.del(portfolio_1);
}
else if (commander_1.default.list) {
    options_1.list();
}
else if (commander_1.default.open) {
    options_1.open();
}
else if (commander_1.default.portfolio) {
    var portfolioName = lodash_2.first(commander_1.default.args) || '';
    options_1.portfolio(portfolioName);
}
else if (commander_1.default.remove) {
    var portfolioName = lodash_2.first(commander_1.default.args) || '';
}
else {
    options_1.portfolio();
}
