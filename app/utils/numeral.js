/**
 *
 * @param {number or string} number
 * @param {currency code for country} currency // INR FOR INDIA
 * @param {local} lang // default is english
 * @returns currency format of the country passed
 * It is using javascript's Internal INTL Object.
 * Can be referred this URL for more and as required options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export const toCurrency = (number, currency, lang = undefined) =>
  Intl.NumberFormat(lang, { style: 'currency', currency }).format(number);
