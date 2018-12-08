import { forOwn, isNil } from 'lodash';
import chalk from 'chalk';
import numeral from 'numeral';

import db, { Portfolio } from '../db';
import Table, { TableOptions } from '../table';
import Stock from '../stock-data';

const DOWN_ARROW: string = '\u2193';
const DOWN_TRIANGLE: string = '\u25BC';
const UP_ARROW: string = '\u2191';
const UP_TRIANGLE: string = '\u25B2';

/**
 * Prints a portfolio to console.
 * @param name The portfolio name.
 */
async function printPortfolio(name: string) {
  //
}

/**
 * Outputs portfolio.
 * @param portfolioName [OPTIONAL] Portfolio to output. Otherwise, all portfolios.
 */
export const portfolio: Function = async function (portfolioName: string) {
  if (isNil(portfolioName)) {
    const portfolios = db.portfolios();
    forOwn(portfolios, (value, key) => {
      console.log(`${key}:`);
      portfolio(key);
    });
    return;
  }
  const symbols: string[] = db.get(portfolioName);
  const data = await Stock.getPrice(symbols);
  const options: TableOptions = {
    columns: {
      symbol: { alias: 'Symbol', transform: (v: any) => v },
      regularMarketPrice: { alias: 'Last', transform: (v: any) => numeral(v).format('0.00') },
      change: { alias: 'Chg', transform: (v: any) => v >= 0 ? chalk.green(v) : chalk.red(v) },
      changePercent: { alias: '% Chg', transform: (v: any) => v >= 0 ? chalk.green(`${v}%`) : chalk.red(`${v}%`) },
      regularMarketOpen: { alias: 'Open', transform: (v: any) => numeral(v).format('0.00') },
      regularMarketDayHigh: { alias: 'High', transform: (v: any) => numeral(v).format('0.00') },
      regularMarketDayLow: { alias: 'Low', transform: (v: any) => numeral(v).format('0.00') },
      regularMarketVolume: { alias: 'Volume', transform: (v: any) => numeral(v).format('0,0') }
    },
    isPadded: true,
  };
  const table = new Table(data, options);
  table.print();
};
