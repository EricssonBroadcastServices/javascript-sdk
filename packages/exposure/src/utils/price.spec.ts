import { priceUtils } from "..";
import { IPrice } from "../../dist";

describe("price", () => {
  it("returns proper price", () => {
    const p: IPrice = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2,
    };
    expect(priceUtils.getPriceString(p)).toEqual("10.00");
    p.fractionDigits = 3;
    expect(priceUtils.getPriceString(p)).toEqual("1.000");
    p.amount = 4593;
    expect(priceUtils.getPriceString(p)).toEqual("4.593");
  });
  it("returns proper price with currency", () => {
    const p: IPrice = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2,
    };
    expect(priceUtils.getPriceStringWithCurrency(p)).toEqual("10.00 SEK");
  });
});
