"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var stringLength = require('string-length');
var NOOP = function (v) { return v; };
var ColumnOptions = /** @class */ (function () {
    function ColumnOptions() {
    }
    return ColumnOptions;
}());
exports.ColumnOptions = ColumnOptions;
var TableOptions = /** @class */ (function () {
    function TableOptions() {
        this.isPadded = true;
    }
    return TableOptions;
}());
exports.TableOptions = TableOptions;
var Table = /** @class */ (function () {
    function Table(rows, options) {
        /**
         * Columns { key : alias }.
         */
        this._columns = {};
        this._formattedRows = [];
        this._widths = {};
        this._options = options;
        this._originalRows = rows;
        this._formatRows();
        this._calculateColumns();
        this._calculateWidths();
    }
    /**
     * Prints data in table format.
     * @param {string[]} columns [OPTIONAL] Columns to print, otherwise, all columns are printed.
     */
    Table.prototype.print = function () {
        this._printHeader();
        this._printRows();
    };
    /**
     * Calculates columns.
     */
    Table.prototype._calculateColumns = function () {
        var _this = this;
        if (lodash_1.isNil(this._options)) {
            var columns_1 = new Set();
            lodash_1.forEach(this._originalRows, function (row) {
                lodash_1.forOwn(row, function (value, key) {
                    columns_1.add(key);
                });
            });
            var keys = columns_1.keys();
            lodash_1.forEach(keys, function (key) {
                lodash_1.set(_this._columns, String(key), String(key));
            });
        }
        else {
            lodash_1.forOwn(this._options.columns, function (option, key) {
                var alias = lodash_1.get(option, 'alias', key);
                lodash_1.set(_this._columns, key, alias);
            });
        }
    };
    /**
     * Calculate column widths.
     */
    Table.prototype._calculateWidths = function () {
        var _this = this;
        // Columns.
        lodash_1.forOwn(this._columns, function (alias, key) {
            lodash_1.set(_this._widths, key, stringLength(alias));
        });
        // Rows.
        lodash_1.forEach(this._formattedRows, function (row) {
            lodash_1.forOwn(_this._columns, function (alias, key) {
                var value = lodash_1.get(row, key);
                var width = lodash_1.isNil(value) ? 0 : stringLength(value);
                var maxWidth = lodash_1.get(_this._widths, key, -1);
                if (width > maxWidth) {
                    lodash_1.set(_this._widths, key, width);
                }
            });
        });
    };
    /**
     * Formats data rows.
     */
    Table.prototype._formatRows = function () {
        var _this = this;
        lodash_1.forEach(this._originalRows, function (row) {
            var formattedRow = {};
            lodash_1.forOwn(row, function (value, key) {
                var transform = lodash_1.get(_this._options, "columns." + key + ".transform", NOOP);
                var transformedValue = String(transform(value));
                lodash_1.set(formattedRow, key, transformedValue);
            });
            _this._formattedRows.push(formattedRow);
        });
    };
    /**
     * Prints table headers.
     */
    Table.prototype._printHeader = function () {
        var _this = this;
        var isPadded = lodash_1.get(this._options, 'isPadded', false) || false;
        var headers = [];
        lodash_1.forOwn(this._columns, function (alias, key) {
            var targetWidth = lodash_1.get(_this._widths, key, 0);
            var deltaWidth = targetWidth - stringLength(alias);
            var adjustedTargetWidth = alias.length + deltaWidth;
            var output = lodash_1.padEnd(alias, adjustedTargetWidth);
            headers.push(isPadded ? " " + output + " " : output);
        });
        var output = "|" + headers.join('|') + "|";
        console.log(output);
        console.log('-'.repeat(output.length));
    };
    /**
     * Print rows.
     */
    Table.prototype._printRows = function () {
        var _this = this;
        var isPadded = lodash_1.get(this._options, 'isPadded', false) || false;
        lodash_1.forEach(this._formattedRows, function (row) {
            var rowOutput = [];
            lodash_1.forOwn(_this._columns, function (alias, key) {
                var value = lodash_1.get(row, key, '');
                var targetWidth = lodash_1.get(_this._widths, key, 0);
                var deltaWidth = targetWidth - stringLength(value);
                var adjustedTargetWidth = value.length + deltaWidth;
                var output = lodash_1.padStart(value, adjustedTargetWidth);
                rowOutput.push(isPadded ? " " + output + " " : output);
            });
            var output = "|" + rowOutput.join('|') + "|";
            console.log(output);
        });
    };
    return Table;
}());
exports.default = Table;
