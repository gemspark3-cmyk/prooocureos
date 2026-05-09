/**
 * 🌍 GLOBAL FORMATTERS (Intl API)
 * Automatically detects browser locale for dates and currencies
 */

export const formatDate = (date: string | Date, locale: string = 'en') => {
  if (!date) return '---';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '---';
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch (e) {
    return '---';
  }
};

export const formatCurrency = (amount: any, currency: string = 'USD', locale: string = 'en') => {
  const val = Number(amount);
  if (isNaN(val) || amount === null || amount === undefined) return '---';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
    }).format(val);
  } catch (e) {
    return `${currency.toUpperCase()} ${val.toLocaleString(locale)}`;
  }
};

export const formatNumber = (num: number, locale: string = 'en') => {
  return new Intl.NumberFormat(locale).format(num);
};
