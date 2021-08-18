export interface IPrice {
  amount: number;
  fractionDigits: number;
  currency: string;
}

export class PriceUtils {
  static getPriceString(price: IPrice) {
    const arr = price.amount.toString().split("");
    arr.splice(arr.length - price.fractionDigits, 0, ".");
    if (arr[0] === ".") {
      arr.unshift("0");
    }
    return arr.join("");
  }

  static getPriceStringWithCurrency = (price: IPrice) => {
    return PriceUtils.getPriceString(price) + " " + price.currency;
  };
}
