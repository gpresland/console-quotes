import { first, isNil, tail } from 'lodash';

import db from '../db';

/**
 * Add symbols to portfolio.
 * @param args Command line arguments.
 */
export function add(args: string[]): void {
  if (args.length < 2) {
    throw new Error('Invalid syntax. Use <portfolio> <symbol> <symbol>..');
  }
  const portfolioName = first(args) || '';
  if (isNil(portfolioName)) {
    return;
  }
  const symbols = tail(args);
  db.add(portfolioName, symbols);
}
