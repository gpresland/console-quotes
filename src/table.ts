import { forEach, forOwn, get, has, includes, invoke, isNil, padEnd, padStart, set } from 'lodash';
const stringLength = require('string-length');

const NOOP: Function = (v: any) => v;

export class ColumnOptions {
  alias?: string;
  transform?: Function;
}

export class TableOptions {
  columns?: { [key: string]: ColumnOptions };
  isPadded?: boolean = true;
}

export default class Table {

  /**
   * Columns { key : alias }.
   */
  private _columns: { [key: string]: string } = {};
  private _formattedRows: any[] = [];
  private _options: TableOptions | undefined;
  private _originalRows: object[];
  private _widths: { [key: string]: number } = {};

  public constructor(rows: object[], options?: TableOptions) {
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
  public print(): void {
    this._printHeader();
    this._printRows();
  }

  /**
   * Calculates columns.
   */
  private _calculateColumns(): void {
    if (isNil(this._options)) {
      const columns: Set<string> = new Set();
      forEach(this._originalRows, row => {
        forOwn(row, (value, key) => {
          columns.add(key);
        });
      });
      const keys = columns.keys();
      forEach(keys, key => {
        set(this._columns, String(key), String(key));
      });
    } else {
      forOwn(this._options.columns, (option, key) => {
        const alias: string = get(option, 'alias', key);
        set(this._columns, key, alias);
      });
    }
  }

  /**
   * Calculate column widths.
   */
  private _calculateWidths(): void {
    // Columns.
    forOwn(this._columns, (alias, key) => {
      set(this._widths, key, stringLength(alias));
    });
    // Rows.
    forEach(this._formattedRows, row => {
      forOwn(this._columns, (alias, key) => {
        const value: string = get(row, key);
        const width: number = isNil(value) ? 0 : stringLength(value);
        const maxWidth: number = get(this._widths, key, -1);
        if (width > maxWidth) {
          set(this._widths, key, width);
        }
      });
    });
  }

  /**
   * Formats data rows.
   */
  private _formatRows(): void {
    forEach(this._originalRows, (row) => {
      const formattedRow: object = {};
      forOwn(row, (value, key) => {
        const transform: Function = get(this._options, `columns.${key}.transform`, NOOP);
        const transformedValue = String(transform(value));
        set(formattedRow, key, transformedValue);
      });
      this._formattedRows.push(formattedRow);
    });
  }

  /**
   * Prints table headers.
   */
  private _printHeader(): void {
    const isPadded: boolean = get(this._options, 'isPadded', false) || false;
    const headers: string[] = [];
    forOwn(this._columns, (alias, key) => {
      const targetWidth: number = get(this._widths, key, 0);
      const deltaWidth: number = targetWidth - stringLength(alias);
      const adjustedTargetWidth: number = alias.length + deltaWidth;
      const output: string = padEnd(alias, adjustedTargetWidth);
      headers.push(isPadded ? ` ${output} ` : output);
    });
    const output: string = `|${headers.join('|')}|`;
    console.log(output);
    console.log('-'.repeat(output.length));
  }

  /**
   * Print rows.
   */
  private _printRows(): void {
    const isPadded: boolean = get(this._options, 'isPadded', false) || false;
    forEach(this._formattedRows, row => {
      const rowOutput: string[] = [];
      forOwn(this._columns, (alias, key) => {
        const value: string = get(row, key, '');
        const targetWidth: number = get(this._widths, key, 0);
        const deltaWidth: number = targetWidth - stringLength(value);
        const adjustedTargetWidth: number = value.length + deltaWidth;
        const output: string = padStart(value, adjustedTargetWidth);
        rowOutput.push(isPadded ? ` ${output} ` : output);
      });
      const output: string = `|${rowOutput.join('|')}|`;
      console.log(output);
    });
  }
}
