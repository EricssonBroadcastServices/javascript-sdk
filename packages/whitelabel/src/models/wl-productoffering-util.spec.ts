import { mockTranslations } from "../../test-utils/mock-translations";
import { mockEventTicket, mockRecurrence, mockRental, mockRentalWithRentalExpiryWindow } from "../../test-utils/mock-wl-productoffering";
import { wlProductOfferingUtils } from "./wl-productoffering-util"

describe("wlProductOfferingUtils", () => {
  describe("getRentalLengthDescription", () => {
    it("handles rental expiry window", () => {
      expect(wlProductOfferingUtils.getRentalLengthDescription(mockRentalWithRentalExpiryWindow, mockTranslations, "en"))
        .toBe("Valid for 1 minute once you start watching. You have 240 hours to start watching.");
    });
    it("handles rental", () => {
      expect(wlProductOfferingUtils.getRentalLengthDescription(mockRental, mockTranslations, "en"))
        .toBe("Valid for 1 minute.");
    });
    it("handles event ticket", () => {
      expect(wlProductOfferingUtils.getRentalLengthDescription(mockEventTicket, mockTranslations))
        .toBe("Valid until April 10th, 2019");
    });
    it("handles recurrence", () => {
      expect(wlProductOfferingUtils.getRentalLengthDescription(mockRecurrence, mockTranslations))
        .toBe("Valid for 1 Month at a time. This offering will be automatically renewed");
    })
  });
  describe("getPriceWithVATString", () => {
    it("returns proper price", () => {
      expect(wlProductOfferingUtils.getPriceWithVATString(mockRecurrence, mockTranslations)).toBe("1.00 SEK - 25% VAT included");
      expect(wlProductOfferingUtils.getPriceWithVATString(mockRental, mockTranslations)).toBe("10.00 SEK - 25% VAT not included");
    });
    it("returns proper VAT string", () => {
      expect(wlProductOfferingUtils.getPricelessVATString(mockRental, mockTranslations)).toBe("25% VAT not included");
      expect(wlProductOfferingUtils.getPricelessVATString(mockRecurrence, mockTranslations)).toBe("25% VAT included");
    })
  })
})