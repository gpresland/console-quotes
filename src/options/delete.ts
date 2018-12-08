import db from '../db';

/**
 * Deletes a portfolio.
 * @param portfolio The portfolio to delete.
 */
export function del(portfolio: string) {
  db.del(portfolio);
}
