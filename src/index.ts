import commander from 'commander';

import { get, providers } from './options';

const pkg: any = require('../package.json');

commander
  .version(pkg.version)
  .description('Command Line Quotes')
  .option('-g, --get', 'get symbol(s)')
  .option('-p, --providers', 'lists providers')
  .parse(process.argv);

if (commander.get) {
  get(commander.args);
} else if (commander.providers) {
  providers();
} else {
  commander.outputHelp();
}
