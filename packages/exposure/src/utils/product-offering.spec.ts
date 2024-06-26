import { IProductOffering, priceUtils, productOfferingUtils } from "..";
import { ProductOfferingType } from "../interfaces/payment/product-offering";

describe("ProductOffering", () => {
  const productOffering: IProductOffering = {
    productOfferingType: ProductOfferingType.RENTAL,
    rentalLength: "PT1M",
    localizedMetadata: [
      {
        locale: "en",
        name: "name",
        description: ""
      }
    ],
    productIds: ["a44acabb-768f-46b4-b74f-cd89a1509335_82162E"],
    offeringPrice: {
      price: {
        amount: 1000,
        fractionDigits: 2,
        currency: "SEK"
      },
      countryCode: "SE",
      vat: {
        percentage: 25,
        included: true
      }
    },
    id: "3a2f0ec0-852f-4c2a-bdca-b613fec088db_82162E",
    productOfferingId: "3a2f0ec0-852f-4c2a-bdca-b613fec088db_82162E",
    salesStart: "2019-10-28T13:49:25.555Z",
    productRequiresSelectAsset: false,
    paymentMethodTypes: ["card"]
  };
  it("should deserialize the payment options", () => {
    expect(productOffering.paymentMethodTypes).toEqual(["card"]);
  });
  it("should get correct title", () => {
    expect(productOfferingUtils.getTitle(productOffering, "en")).toEqual("name");
    expect(productOfferingUtils.getTitle(productOffering, "sv")).toEqual("name"); // should fallback to index 0
    productOffering.localizedMetadata = [];
    expect(productOfferingUtils.getTitle(productOffering, "en")).toEqual("");
  });
  it("should display price", () => {
    expect(priceUtils.getPriceStringWithCurrency(productOffering.offeringPrice.price)).toEqual("10.00 SEK");
  });
});
