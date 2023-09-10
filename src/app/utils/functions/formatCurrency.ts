import { CurrencyPipe } from "@angular/common";

export function getFormattedCurrency_ptPT(value: number, _localLanguage: string = 'pt-PT', _currency: string = 'EUR'): any {
  return new Intl.NumberFormat(_localLanguage, { style: 'currency', currency: _currency }).format(value);
}

export function getFormattedCurrency_deDE(value: number, _localLanguage: string = 'de-DE', _currency: string = 'EUR'): any {
  return new Intl.NumberFormat(_localLanguage, { style: 'currency', currency: _currency }).format(value);
}

export function convertToEurCurrency(amount: string | any, currencyPipe: CurrencyPipe = new CurrencyPipe('symbol', 'EUR') ){

  return currencyPipe.transform(amount.toString().replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
}
//number.toLocaleString("de-DE", { style: "currency", currency: "EUR" }),
