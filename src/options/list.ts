import { forOwn } from 'lodash';

import db from '../db';

export function list() {
  const portfolios = db.portfolios();
  forOwn(portfolios, (value, key) => {
    console.log(key, value);
  });
}
