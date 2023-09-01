
export function getFormatted(_localLanguage: string = 'pt-PT', _currency: string = 'EUR', value: number): any {
  return new Intl.NumberFormat(_localLanguage, { style: 'currency', currency: _currency }).format(value);
}

//number.toLocaleString("de-DE", { style: "currency", currency: "EUR" }),
