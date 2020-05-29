import { mockProductOffering, mockPrice2 } from "../../test-utils/mock-wl-productoffering";


describe("CheckPasswordResponse", () => {
  it("should validate password", () => {
    expect(mockProductOffering.offeringPrice.price.getPrice()).toEqual("1.00");
    expect(mockPrice2.getPrice()).toEqual("1.000");
  });
});
