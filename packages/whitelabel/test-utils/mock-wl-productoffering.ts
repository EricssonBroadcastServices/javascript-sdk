import { deserialize, Price } from "@ericssonbroadcastservices/exposure-sdk";
import { WLOfferingPrice, WLProductOffering } from "../src/models/wl-productoffering";
import { mockPurchaseResponse } from "./mock-purchase-response";
import { mockProduct } from "./mock-product";

export const mockPrice = new Price();
mockPrice.amount = 100;
mockPrice.currency = "SEK";
mockPrice.fractionDigits = 2;

export const mockPrice2 = new Price();
mockPrice2.amount = 1000;
mockPrice2.currency = "SEK";
mockPrice2.fractionDigits = 3;

export const mockOfferingPrice = new WLOfferingPrice();
mockOfferingPrice.price = mockPrice;
mockOfferingPrice.countryCode = "SE";
mockOfferingPrice.vat = {
  included: true,
  percentage: 0
};

const mockOfferingPriceWithVAT = new WLOfferingPrice();
mockOfferingPriceWithVAT.price = mockPrice2;
mockOfferingPriceWithVAT.countryCode = "SE";
mockOfferingPriceWithVAT.vat = {
  included: true,
  percentage: 25
};

export const mockProductOffering = new WLProductOffering();
mockProductOffering.id = "123";
mockProductOffering.offeringPrice = mockOfferingPrice;
mockProductOffering.rentalLength = "PT1M";

mockProductOffering.activePurchase = mockPurchaseResponse.purchases[0];
mockProductOffering.localizedMetadata = [
  {
    locale: "en",
    name: "test",
    description: "123"
  }
];
mockProductOffering.productIds = [mockProduct.id];

export const mockProductOfferingWithoutPurchase = new WLProductOffering();
mockProductOfferingWithoutPurchase.id = "456";
mockProductOfferingWithoutPurchase.offeringPrice = mockOfferingPriceWithVAT;

mockProductOfferingWithoutPurchase.localizedMetadata = [
  {
    locale: "en",
    name: "test",
    description: "123"
  }
];

export const mockEventTicket = deserialize(WLProductOffering, {
  rentalLength: "PT48H",
  localizedMetadata: [
    {
      locale: "en",
      name: "1 min pass",
      description: "This product gives you access for 1 min. Used for testing."
    }
  ],
  productIds: ["1min1_82162E"],
  offeringPrice: {
    price: {
      amount: 100,
      fractionDigits: 2,
      currency: "USD"
    },
    countryCode: "SE",
    vat: {
      percentage: 25,
      included: true
    }
  },
  id: "40e1ca16-e8cf-424e-b4d3-5ebefdf63c2b",
  productOfferingId: "40e1ca16-e8cf-424e-b4d3-5ebefdf63c2b",
  entitlementStart: "2019-04-08T11:21:52.182Z",
  salesStart: "2019-04-08T11:21:47.182Z",
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
});

export const mockRental = deserialize(WLProductOffering, {
  rentalLength: "PT1M",
  localizedMetadata: [
    {
      locale: "en",
      name: "1 min pass 2.1",
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
});