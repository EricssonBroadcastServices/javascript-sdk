import { mockProductOffering, mockPrice2 } from "../../test-utils/mock-wl-productoffering";

describe("WL product offering", () => {
  it("should return price", () => {
    expect(mockProductOffering.offeringPrice.price.getPrice()).toEqual("1.00");
    expect(mockPrice2.getPrice()).toEqual("1.000");
  });
});
