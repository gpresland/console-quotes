import { forEach, get, round, set } from 'lodash';
import { props } from 'bluebird';

import Quotes, { Price } from 'market-quotes';

const ARROW_UP: string = '\u2191';
const ARROW_RIGHT: string = '\u2192';
const ARROW_DOWN: string = '\u2193';

export default abstract class Stock {

  /**
   * Gets an arrow indicating change.
   * @param originalNumber The original number.
   * @param newNumber The new number.
   * @returns Unicode arrow.
   */
  private static _getArrow(originalNumber: number, newNumber: number): string {
    if (originalNumber > newNumber) {
      return ARROW_DOWN;
    } else if (originalNumber < newNumber) {
      return ARROW_UP;
    } else {
      return ARROW_RIGHT;
    }
  }

  /**
   * Gets a percentage change.
   * @param originalNumber The original number.
   * @param newNumber The new number.
   * @returns The percentage change.
   */
  private static _getPercentChange(originalNumber: number, newNumber: number): number {
    if (originalNumber === newNumber) {
      return 0.0;
    } else {
      return (newNumber - originalNumber) / originalNumber;
    }
  }

  /**
   * Gets ticker data.
   * @param symbolOrSymbols to get data price for.
   * @returns Symbol price data.
   */
  public static async getPrice(symbolOrSymbols: string | string[]): Promise<Price> {
    const symbols: string[] = (typeof (symbolOrSymbols) == 'string') ? [symbolOrSymbols] : symbolOrSymbols;
    const promises: { [key: string]: any; } = {};
    forEach(symbols, symbol =>
      promises[symbol] = Quotes.getPrice(symbol)
        .then(result => this._transform(result))
        .catch(err => { return { symbol }; }));
    return props(promises);
  }

  /**
   * Transforms a response into a formatted object.
   * @param data The data to transform.
   * @returns The transformed data.
   */
  private static _transform(data: object): object {
    console.log('wtf');
    const last: number = get(data, 'regularMarketPreviousClose');
    const current: number = get(data, 'regularMarketPrice');
    const delta: number = round(current - last, 3);
    const deltaPercent: number = round(this._getPercentChange(last, current) * 100, 2);
    const arrow: string = this._getArrow(last, current);
    set(data, 'change', delta);
    set(data, 'changePercent', deltaPercent);
    set(data, 'arrow', arrow);
    return data;
  }
}
