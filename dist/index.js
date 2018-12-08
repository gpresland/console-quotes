"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var options_1 = require("./options");
var pkg = require('../package.json');
commander_1.default
    .version(pkg.version)
    .description('Command Line Quotes')
    .option('-g, --get', 'get symbol(s)')
    .option('-p, --providers', 'lists providers')
    .parse(process.argv);
if (commander_1.default.get) {
    options_1.get(commander_1.default.args);
}
else if (commander_1.default.providers) {
    options_1.providers();
}
else {
    commander_1.default.outputHelp();
}
