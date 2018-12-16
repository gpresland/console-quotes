import fs from 'fs';

const data = [
  ['United States of America', 'Chicago Board of Trade (CBOT)', '.CBT', '10 min', 'ICE Data Services'],
  ['United States of America', 'Chicago Mercantile Exchange (CME)', '.CME', '10 min', 'ICE Data Services'],
  ['United States of America', 'Dow Jones Indexes', 'N/A', 'Real-time', 'ICE Data Services'],
  ['United States of America', 'Nasdaq Stock Exchange', 'N/A', 'Real-time', 'ICE Data Services'],
  ['United States of America', 'ICE Futures US', '.NYB', '30 min', 'ICE Data Services'],
  ['United States of America', 'New York Commodities Exchange (COMEX)', '.CMX', '30 min', 'ICE Data Services'],
  ['United States of America', 'New York Mercantile Exchange (NYMEX)', '.NYM', '30 min', 'ICE Data Services'],
  ['United States of America', 'Options Price Reporting Authority (OPRA)', 'N/A', '15 min', 'ICE Data Services'],
  ['United States of America', 'OTC Bulletin Board Market', 'N/A', 'Real-time', 'ICE Data Services'],
  ['United States of America', 'OTC Markets Group', 'N/A', '15 min', 'ICE Data Services'],
  ['United States of America', 'S & P Indices', 'N/A', 'Real-time', 'ICE Data Services'],
  ['Argentina', 'Buenos Aires Stock Exchange (BYMA)', '.BA', '30 min', 'ICE Data Services'],
  ['Austria', 'Vienna Stock Exchange', '.VI', '15 min', 'ICE Data Services'],
  ['Australia', 'Australian Stock Exchange (ASX)', '.AX', '20 min', 'ICE Data Services'],
  ['Belgium', 'Euronext Brussels', '.BR', '15 min', 'ICE Data Services'],
  ['Brazil', 'Sao Paolo Stock Exchange (BOVESPA)', '.SA', '15 min', 'ICE Data Services'],
  ['Canada', 'Toronto Stock Exchange (TSX)', '.TO', '15 min', 'ICE Data Services'],
  ['Canada', 'TSX Venture Exchange (TSXV)', '.V', '15 min', 'ICE Data Services'],
  ['Chile', 'Santiago Stock Exchange', '.SN', '15 min', 'ICE Data Services'],
  ['China', 'Shanghai Stock Exchange', '.SS', '30 min', 'ICE Data Services'],
  ['China', 'Shenzhen Stock Exchange', '.SZ', '30 min', 'ICE Data Services'],
  ['Czech Republic', 'Prague Stock Exchange Index', '.PR', '20 min', 'ICE Data Services'],
  ['Denmark', 'Nasdaq OMX Copenhagen', '.CO', 'Real-time', 'ICE Data Services'],
  ['Egypt', 'Egyptian Exchange Index (EGID)', '.CA', '20 min', 'ICE Data Services'],
  ['Estonia', 'Nasdaq OMX Tallinn', '.TL', 'Real-time', 'ICE Data Services'],
  ['Finland', 'Nasdaq OMX Helsinki', '.HE', 'Real-time', 'ICE Data Services'],
  ['France', 'Euronext', '.NX', '15 min', 'ICE Data Services'],
  ['France', 'Euronext Paris', '.PA', '15 min', 'ICE Data Services'],
  ['Germany', 'Berlin Stock Exchange', '.BE', '15 min', 'ICE Data Services'],
  ['Germany', 'Bremen Stock Exchange', '.BM', '15 min', 'ICE Data Services'],
  ['Germany', 'Dusseldorf Stock Exchange', '.DU', '15 min', 'ICE Data Services'],
  ['Germany', 'Frankfurt Stock Exchange', '.F', 'Real-time', 'ICE Data Services'],
  ['Germany', 'Hamburg Stock Exchange', '.HM', '15 min', 'ICE Data Services'],
  ['Germany', 'Hanover Stock Exchange', '.HA', '15 min', 'ICE Data Services'],
  ['Germany', 'Munich Stock Exchange', '.MU', '15 min', 'ICE Data Services'],
  ['Germany', 'Stuttgart Stock Exchange', '.SG', '15 min', 'ICE Data Services'],
  ['Germany', 'Deutsche Boerse XETRA', '.DE', '15 min', 'ICE Data Services'],
  ['Global', 'Currency Rates', '#NAME?', 'Real-time', 'ICE Data Services'],
  ['Greece', 'Athens Stock Exchange (ATHEX)', '.AT', '15 min', 'ICE Data Services'],
  ['Hong Kong', 'Hong Kong Stock Exchange (HKEX)', '.HK', '15 min', 'ICE Data Services'],
  ['Iceland', 'Nasdaq OMX Iceland', '.IC', 'Real-time', 'ICE Data Services'],
  ['India', 'Bombay Stock Exchange', '.BO', 'Real-time', 'ICE Data Services'],
  ['India', 'National Stock Exchange of India', '.NS', 'Real-time**', 'ICE Data Services'],
  ['Indonesia', 'Indonesia Stock Exchange (IDX)', '.JK', '10 min', 'ICE Data Services'],
  ['Ireland', 'Irish Stock Exchange', '.IR', '15 min', 'ICE Data Services'],
  ['Israel', 'Tel Aviv Stock Exchange', '.TA', '20 min', 'ICE Data Services'],
  ['Italy', 'EuroTLX', '.TI', '20 min', 'ICE Data Services'],
  ['Italy', 'Italian Stock Exchange', '.MI', '20 min', 'ICE Data Services'],
  ['Japan', 'Nikkei Indices', 'N/A', '30 min', 'ICE Data Services'],
  ['Japan', 'Tokyo Stock Exchange', '.T', '20 min', 'ICE Data Services'],
  ['Latvia', 'Nasdaq OMX Riga', '.RG', 'Real-time', 'ICE Data Services'],
  ['Lithuania', 'Nasdaq OMX Vilnius', '.VS', 'Real-time', 'ICE Data Services'],
  ['Malaysia', 'Malaysian Stock Exchange', '.KL', '15 min', 'ICE Data Services'],
  ['Mexico', 'Mexico Stock Exchange (BMV)', '.MX', '20 min', 'ICE Data Services'],
  ['Netherlands', 'Euronext Amsterdam', '.AS', '15 min', 'ICE Data Services'],
  ['New Zealand', 'New Zealand Stock Exchange (NZX)', '.NZ', '20 min', 'ICE Data Services'],
  ['Norway', 'Oslo Stock Exchange', '.OL', '15 min', 'ICE Data Services'],
  ['Portugal', 'Euronext Lisbon', '.LS', '15 min', 'ICE Data Services'],
  ['Qatar', 'Qatar Stock Exchange', '.QA', '15 min', 'ICE Data Services'],
  ['Russia', 'Moscow Exchange (MOEX)', '.ME', 'Real-time', 'ICE Data Services'],
  ['Singapore', 'Singapore Stock Exchange (SGX)', '.SI', '20 min', 'ICE Data Services'],
  ['South Africa', 'Johannesburg Stock Exchange', '.JO', '15 min', 'ICE Data Services'],
  ['South Korea', 'Korea Stock Exchange', '.KS', '20 min', 'ICE Data Services'],
  ['South Korea', 'KOSDAQ', '.KQ', '20 min', 'ICE Data Services'],
  ['Spain', 'Barcelona Stock Exchange', '.BC', '15 min', 'ICE Data Services'],
  ['Spain', 'Bilbao Stock Exchange', '.BI', '15 min', 'ICE Data Services'],
  ['Spain', 'Madrid Fixed Income Market', '.MF', '15 min', 'ICE Data Services'],
  ['Spain', 'Madrid SE C.A.T.S.', '.MC', '15 min', 'ICE Data Services'],
  ['Spain', 'Madrid Stock Exchange', '.MA', '15 min', 'ICE Data Services'],
  ['Spain', 'Valencia Stock Exchange', '.VA', '15 min', 'ICE Data Services'],
  ['Saudi Arabia', 'Saudi Stock Exchange (Tadawul)', '.SAU', '15 min', 'ICE Data Services'],
  ['Sweden', 'Nasdaq OMX Stockholm', '.ST', 'Real-time', 'ICE Data Services'],
  ['Switzerland', 'Swiss Exchange (SIX)', '.SW', '30 min', 'ICE Data Services'],
  ['Taiwan', 'Taiwan OTC Exchange', '.TWO', '20 min', 'ICE Data Services'],
  ['Taiwan', 'Taiwan Stock Exchange (TWSE)', '.TW', '20 min', 'ICE Data Services'],
  ['Thailand', 'Stock Exchange of Thailand (SET)', '.BK', '15 min', 'ICE Data Services'],
  ['Turkey', 'Borsa Istanbul', '.IS', '15 min', 'ICE Data Services'],
  ['United Kingdom', 'FTSE Indices', 'N/A', '15 min', 'ICE Data Services'],
  ['United Kingdom', 'London Stock Exchange', '.L', '20 min', 'ICE Data Services'],
  ['United Kingdom', 'London Stock Exchange', '.IL', '20 min', 'ICE Data Services'],
  ['Venezuela', 'Caracas Stock Exchange', '.CR', '15 min', 'ICE Data Services']];

import { Table, TableOptions } from '../table';

export function providers() {
  const csv = data
    .map(item => {
      return {
        country: item[0],
        index: item[1],
        suffix: item[2],
        delay: item[3],
        provider: item[4]
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
