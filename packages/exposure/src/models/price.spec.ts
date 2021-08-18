import { IPrice, PriceUtils } from "./price";

describe("price", () => {
  it("returns proper price", () => {
    const p: IPrice = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2
    };
    expect(PriceUtils.getPriceString(p)).toEqual("10.00");
    p.fractionDigits = 3;
    expect(PriceUtils.getPriceString(p)).toEqual("1.000");
    p.amount = 4593;
    expect(PriceUtils.getPriceString(p)).toEqual("4.593");
  });
  it("returns proper price with currency", () => {
    const p: IPrice = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2
    };
    expect(PriceUtils.getPriceStringWithCurrency(p)).toEqual("10.00 SEK");
  });
});
