import chalk from 'chalk';
import numeral from 'numeral';

import Stock from '../stock-data';
import { Table, TableOptions } from '../table';

/**
 * Gets symbol(s) values.
 * @param args Command line arguments.
 */
export async function get(args: string[]): Promise<void> {
  if (args.length < 1) {
    throw new Error('Invalid syntax. Use <portfolio> <symbol> <symbol>..');
  }
  const data = await Stock.getPrice(args);
  console.log(data);
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
}
