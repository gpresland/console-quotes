import fs from 'fs';

import { Table, TableOptions } from '../table';

export function providers() {
  const csv = fs.readFileSync('providers.csv')
    .toString()
    .trim()
    .split(/\n/)
    .map(line => {
      const split = line.split(',');
      return {
        country: split[0].trim(),
        index: split[1].trim(),
        suffix: split[2].trim(),
        delay: split[3].trim(),
        provider: split[4].trim()
      };
    });
  const options: TableOptions = {
    columns: {
      country: { alias: 'Country' },
      index: { alias: 'Market, or Index' },
      suffix: { alias: 'Suffix' },
      delay: { alias: 'Delay' },
      provider: { alias: 'Data Provider' }
    },
    isPadded: true
  };
  const table = new Table(csv, options);
  table.print();
}
