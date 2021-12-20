import { IPrice } from "..";

export function getPriceString(price: IPrice) {
  const arr = price.amount.toString().split("");
  arr.splice(arr.length - price.fractionDigits, 0, ".");
  if (arr[0] === ".") {
    arr.unshift("0");
  }
  return arr.join("");
}

export function getPriceStringWithCurrency(price: IPrice) {
  return getPriceString(price) + " " + price.currency;
}

export const priceUtils = {
  getPriceString,
  getPriceStringWithCurrency,
};
