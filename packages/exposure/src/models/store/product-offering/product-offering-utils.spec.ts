import { ProductOfferingUtils } from "./product-offering-utils";

const productOfferingJson = {
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

describe("ProductOffering", () => {
  it("should get correct title", () => {
    const offering = ProductOfferingUtils.build(productOfferingJson);
    expect(ProductOfferingUtils.getTitle(offering, "en")).toEqual("name");
    expect(ProductOfferingUtils.getTitle(offering, "sv")).toEqual("name"); // should fallback to index 0
    offering.localizedMetadata = [];
    expect(ProductOfferingUtils.getTitle(offering, "sv")).toEqual("");
  });
  it("should display price", () => {
    const offering = ProductOfferingUtils.build(productOfferingJson);
    expect(ProductOfferingUtils.getPriceWithCurrency(offering.offeringPrice.price)).toEqual("10.00 SEK");
  });
});
