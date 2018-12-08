import { clone, forEach, get, omit, set } from 'lodash';
import { homedir } from 'os';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export interface Portfolio {
  [key: string]: string[];
}

interface Portfolios {
  portfolios: Portfolio;
}

export default abstract class db {

  /**
   * File name.
   */
  public static FILE_NAME: string = '.portfolios';

  /**
   * File path.
   */
  public static FILE_PATH: string = `${homedir}/${db.FILE_NAME}`;

  /**
   * Add symbol(s) to the portfolio.
   * @param portfolioName The portfolio to add the symbol(s) to.
   * @param symbols The symbol(s) to add to the portfolio.
   */
  public static add(portfolioName: string, symbols: string[]): void {
    portfolioName = portfolioName.toUpperCase();
    if (existsSync(db.FILE_PATH)) {
      const portfolios: Portfolios = this._read();
      const existingSymbols: string[] = get(portfolios, `portfolios.${portfolioName}`, []);
      const combinedSymbols = new Set<string>();
      forEach(symbols, symbol => combinedSymbols.add(symbol));
      forEach(existingSymbols, symbol => combinedSymbols.add(symbol));
      const newSymbols: string[] = Array
        .from(combinedSymbols)
        .map(symbol => symbol.toUpperCase())
        .sort();
      set(portfolios, `portfolios.${portfolioName}`, newSymbols);
      this._save(portfolios);
    } else {
      const newSymbols = symbols
        .map(symbol => symbol.toUpperCase())
        .sort();
      const data: string = JSON.stringify({ portfolios: { [portfolioName]: newSymbols } });
      writeFileSync(db.FILE_PATH, data);
    }
  }

  /**
   * Deletes a portfolio.
   * @param portfolioName The portfolio to delete.
   */
  public static del(portfolioName: string): void {
    portfolioName = portfolioName.toUpperCase();
    if (!existsSync(db.FILE_PATH)) {
      return;
    }
    const portfolios: Portfolios = this._read();
    const newPortfolio: Portfolios | object = omit(portfolios, `portfolios.${portfolioName.toUpperCase()}`);
    this._save(newPortfolio);
  }

  /**
   * Get symbol(s) in portfolio.
   * @param portfolioName The portfolio to get.
   * @returns Symbol(s).
   */
  public static get(portfolioName: string): string[] {
    portfolioName = portfolioName.toUpperCase();
    if (!existsSync(db.FILE_PATH)) {
      return [];
    }
    const portfolios: Portfolios = this._read();
    return get(portfolios, `portfolios.${portfolioName}`, []);
  }

  /**
   * Gets portfolios.
   * @returns { [portfolioName]: [symbols]}
   */
  public static portfolios(): object {
    if (!existsSync(db.FILE_PATH)) {
      return {};
    }
    const portfolios: Portfolios = this._read();
    return get(portfolios, 'portfolios', {});
  }

  /**
   * Removes symbol(s) from portfolio.
   * @param portfolioName The portfolio to remove from.
   * @param symbols The symbols to remove.
   */
  public static remove(portfolioName: string, symbols: string[]): void {
    portfolioName = portfolioName.toUpperCase();
    if (!existsSync(db.FILE_PATH)) {
      return;
    }
    const portfolios: Portfolios = this._read();
    const oldSymbols: string[] = get(portfolioName, `portfolios.${portfolioName}`, []);
    const newSymbols: string[] = oldSymbols.filter(symbol => symbols.indexOf(symbol) === -1);
    set(portfolios, `portfolios.${portfolioName}`, newSymbols);
    this._write(portfolios);
  }

  /**
   * Create db file.
   */
  private static _create(): void {
    this._save({
      portfolios: {}
    });
  }

  /**
   * Creates db file if necessary.
   */
  private static _createIfNeeded(): void {
    if (!existsSync(db.FILE_PATH)) {
      this._create();
    }
  }

  /**
   * Reads portfolios file.
   * @returns Portfolios.
   */
  private static _read(): Portfolios {
    return JSON.parse(readFileSync(db.FILE_PATH).toString());
  }

  /**
   * Saves data.
   * @param portfolios The data to save.
   */
  private static _save(portfolios: Portfolios | object): void {
    const data: string = JSON.stringify(portfolios);
    writeFileSync(db.FILE_PATH, data);
  }

  /**
   * Write to disk.
   * @param data The portfolio.
   */
  private static _write(data: Portfolios): void {
    writeFileSync(db.FILE_PATH, data);
  }
}
