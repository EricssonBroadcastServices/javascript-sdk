import { WLOfferingPrice, WLProductOffering } from "../src/models/wl-productoffering";
import { Price } from "../src";
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
mockProductOffering.localizedMetadata = [{
  locale: "en",
  name: "test",
  description: "123"
}];
mockProductOffering.productIds = [mockProduct.id];

export const mockProductOfferingWithoutPurchase = new WLProductOffering();
mockProductOfferingWithoutPurchase.id = "456";
mockProductOfferingWithoutPurchase.offeringPrice = mockOfferingPriceWithVAT;

mockProductOfferingWithoutPurchase.localizedMetadata = [{
  locale: "en",
  name: "test",
  description: "123"
}];
