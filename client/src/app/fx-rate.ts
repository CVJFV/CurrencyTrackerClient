import {CURRENCY} from './currency.enum';

export class FxRate {
  sourceCurrency: CURRENCY;
  targetCurrency: CURRENCY;
  exchangeRate: number;
  date: string;
}
