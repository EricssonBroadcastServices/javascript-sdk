import { StorePriceTag } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { PriceHelpers } from "./price.js";

describe("price", () => {
  it("returns proper price", () => {
    const p: StorePriceTag = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2
    };
    expect(PriceHelpers.getPriceString(p)).toEqual("10.00");
    p.fractionDigits = 3;
    expect(PriceHelpers.getPriceString(p)).toEqual("1.000");
    p.amount = 4593;
    expect(PriceHelpers.getPriceString(p)).toEqual("4.593");
  });
  it("returns proper price with currency", () => {
    const p: StorePriceTag = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2
    };
    expect(PriceHelpers.getPriceStringWithCurrency(p)).toEqual("10.00 SEK");
  });
  it("return price as number, without fraction", () => {
    const p: StorePriceTag = {
      amount: 1000,
      currency: "SEK",
      fractionDigits: 2
    };
    expect(PriceHelpers.removePriceFraction(p.amount, p.fractionDigits)).toEqual(10);
  });
});
