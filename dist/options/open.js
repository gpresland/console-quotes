"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var os_1 = __importDefault(require("os"));
//import sys from 'sys';
var db_1 = __importDefault(require("../db"));
function getCommandLine() {
    switch (os_1.default.platform()) {
        case 'aix': return 'xdg-open';
        case 'darwin': return 'open';
        case 'freebsd': return 'xdg-open';
        case 'linux': return 'xdg-open';
        case 'openbsd': return 'xdg-open';
        case 'sunos': return 'xdg-open';
        case 'win32': return 'start';
        default: return 'xdg-open';
    }
}
exports.open = function () {
    child_process_1.exec(getCommandLine() + " " + db_1.default.FILE_PATH);
};
