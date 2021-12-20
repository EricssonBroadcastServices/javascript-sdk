import { IPurchase, PurchaseStatus, purchaseUtils } from "..";

describe("purchaseUtils", () => {
  it("should return all tvods", () => {
    const purchases: IPurchase[] = [
      {
        id: "123",
        productOfferingId: "123",
        transactionId: "123",
        from: new Date().toISOString(),
        until: new Date(Date.now() + 10000).toISOString(),
        status: PurchaseStatus.FULFILLED,
        renewal: false,
      },
      {
        id: "456",
        productOfferingId: "123",
        transactionId: "123",
        from: new Date().toISOString(),
        until: new Date(Date.now() + 10000).toISOString(),
        status: PurchaseStatus.FULFILLED,
        renewal: false,
        assetId: "123",
      },
    ];
    const tvods = purchaseUtils.getTvods(purchases);
    expect(tvods.length).toBe(1);
    expect(tvods[0].id).toBe("456");
  });
});
