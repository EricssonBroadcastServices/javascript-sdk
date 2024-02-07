import { StoreProductOffering } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ProductOfferingHelpers } from "./product-offering";
import { PriceHelpers } from "./price";
import {
  mockEventTicket,
  mockRecurrence,
  mockRental,
  mockRentalWithRentalExpiryWindow
} from "../../test-utils/mock-wl-productoffering";
import { Translations } from "./wl-translations";
import { englishTranslations } from "../../test-utils/mock-translations";

const mockTranslations = new Translations(englishTranslations);

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
  describe("getRentalLengthDescription", () => {
    it("handles rental expiry window", () => {
      expect(
        ProductOfferingHelpers.getRentalLengthDescription(mockRentalWithRentalExpiryWindow, mockTranslations, "en")
      ).toBe("Valid for 1 minute once you start watching. You have 240 hours to start watching.");
    });
    it("handles rental", () => {
      expect(ProductOfferingHelpers.getRentalLengthDescription(mockRental, mockTranslations, "en")).toBe(
        "Valid for 1 minute."
      );
    });
    it("handles event ticket", () => {
      expect(ProductOfferingHelpers.getRentalLengthDescription(mockEventTicket, mockTranslations)).toBe(
        "Valid until 4/10/2019"
      );
    });
    it("handles recurrence", () => {
      expect(ProductOfferingHelpers.getRentalLengthDescription(mockRecurrence, mockTranslations)).toBe(
        "Valid for 1 Month at a time. This offering will be automatically renewed"
      );
    });
  });
  describe("getPriceWithVATString", () => {
    it("returns proper price", () => {
      expect(ProductOfferingHelpers.getPriceWithVATString(mockRecurrence.offeringPrice, mockTranslations)).toBe(
        "1.00 SEK - 25% VAT included"
      );
      expect(ProductOfferingHelpers.getPriceWithVATString(mockRental.offeringPrice, mockTranslations)).toBe(
        "10.00 SEK - 25% VAT not included"
      );
    });
    it("returns proper VAT string", () => {
      expect(ProductOfferingHelpers.getPricelessVATString(mockRental.offeringPrice, mockTranslations)).toBe(
        "25% VAT not included"
      );
      expect(ProductOfferingHelpers.getPricelessVATString(mockRecurrence.offeringPrice, mockTranslations)).toBe(
        "25% VAT included"
      );
    });
  });
});
