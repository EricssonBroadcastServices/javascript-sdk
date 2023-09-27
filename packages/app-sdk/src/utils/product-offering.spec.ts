import { StoreProductOffering } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ProductOfferingHelpers } from "./product-offering";
import { PriceHelpers } from "./price";

// purchase, rental, event, subscription

describe("ProductOffering", () => {
  const productOffering: StoreProductOffering = {
    productOfferingType: "rental",
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
    productRequiresSelectAsset: false,
    paymentMethodTypes: ["card"]
  };
  it("should deserialize the payment options", () => {
    expect(productOffering.paymentMethodTypes).toEqual(["card"]);
  });
  it("should get correct title", () => {
    expect(ProductOfferingHelpers.getTitle(productOffering, "en")).toEqual("name");
    expect(ProductOfferingHelpers.getTitle(productOffering, "sv")).toEqual("name"); // should fallback to index 0
    productOffering.localizedMetadata = [];
    expect(ProductOfferingHelpers.getTitle(productOffering, "en")).toEqual("");
  });
  it("should display price", () => {
    expect(PriceHelpers.getPriceStringWithCurrency(productOffering.offeringPrice.price)).toEqual("10.00 SEK");
  });
});
