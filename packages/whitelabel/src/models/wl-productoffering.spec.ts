import { mockTranslations } from "../../test-utils/mock-translations";
import { mockProductOffering, mockPrice2, mockEventTicket, mockRental } from "../../test-utils/mock-wl-productoffering";

describe("WL product offering", () => {
  it("should return price", () => {
    expect(mockProductOffering.offeringPrice.price.getPrice()).toEqual("1.00");
    expect(mockPrice2.getPrice()).toEqual("1.000");
  });
  describe("Rental length string", () => {
    it("should handle rental", () => {
      expect(mockRental.getRentalLengthString(mockTranslations)).toEqual("1 minute ");
    })
    it("should handle event ticket", () => {
      expect(mockEventTicket.getRentalLengthString(mockTranslations)).toEqual("Valid until April 10th, 2019")
    })
  });
});
