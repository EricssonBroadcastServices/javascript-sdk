import { EntitlementService } from "./entitlement-service";

const customer = "CU";
const businessUnit = "BU";

describe("Entitlement service", () => {
  it("adds material profile to play call", async () => {
    const entitlementService = new EntitlementService({
      customer,
      businessUnit,
      authHeader: () => undefined
    });
    jest.spyOn(entitlementService, "get").mockResolvedValue({});
    await entitlementService.playAsset({ assetId: "123", materialProfile: "test" });
    expect(entitlementService.get).toHaveBeenCalledWith(
      "/v2/customer/CU/businessunit/BU/entitlement/123/play?materialProfile=test",
      {}
    );
  });
});
