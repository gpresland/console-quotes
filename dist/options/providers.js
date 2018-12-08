"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var table_1 = require("../table");
function providers() {
    var csv = fs_1.default.readFileSync('providers.csv')
        .toString()
        .trim()
        .split(/\n/)
        .map(function (line) {
        var split = line.split(',');
        return {
            country: split[0].trim(),
            index: split[1].trim(),
            suffix: split[2].trim(),
            delay: split[3].trim(),
            provider: split[4].trim()
        };
    });
    var options = {
        columns: {
            country: { alias: 'Country' },
            index: { alias: 'Market, or Index' },
            suffix: { alias: 'Suffix' },
            delay: { alias: 'Delay' },
            provider: { alias: 'Data Provider' }
        },
        isPadded: true
    };
    var table = new table_1.Table(csv, options);
    table.print();
}
exports.providers = providers;
