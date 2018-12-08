import { isNil } from 'lodash';

const pkg: any = require('../package.json');

import { first } from 'lodash';
import commander from 'commander';

import { add, del, list, open, portfolio, remove } from './options';

commander
  .version(pkg.version)
  .description('Command Line Quotes')
  .option('-a, --add', 'adds a symbol')
  .option('-d, --delete', 'deletes a portfolio')
  .option('-l, --list', 'lists portfolios and their symbols')
  .option('-o, --open', 'opens the portfolio for manual editing')
  .option('-p, --portfolio', 'shows your portfolio')
  .option('-r, --remove', 'removes a symbol from a portfolio')
  .parse(process.argv);

if (commander.add) {
  add(commander.args);
} else if (commander.delete) {
  const portfolio = first(commander.args) || '';
  if (isNil(portfolio)) {
    process.exit();
  }
  del(portfolio);
} else if (commander.list) {
  list();
} else if (commander.open) {
  open();
} else if (commander.portfolio) {
  const portfolioName = first(commander.args) || '';
  portfolio(portfolioName);
} else if (commander.remove) {
  const portfolioName = first(commander.args) || '';
} else {
  portfolio();
}
