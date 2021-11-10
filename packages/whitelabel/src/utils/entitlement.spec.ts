import { EntitlementActionType, IEntitlementActions } from "@ericssonbroadcastservices/exposure-sdk";
import { shouldJustWait } from "./entitlement";

describe("should just wait", () => {
  it("no actions", () => {
    expect(shouldJustWait([])).toBe(false);
  });
  it("should return true if only wait", () => {
    const actions: IEntitlementActions[] = [
      {
        type: EntitlementActionType.WAIT,
        publication: { availableAt: new Date(Date.now() + 1000).toISOString(), publicationId: "123" }
      }
    ];
    expect(shouldJustWait(actions)).toBe(true);
  });
  it("should return false when user can buy", () => {
    const actions: IEntitlementActions[] = [
      {
        type: EntitlementActionType.WAIT,
        publication: { availableAt: new Date(Date.now() + 1000).toISOString(), publicationId: "123" }
      },
      {
        type: EntitlementActionType.BUY_WATCH_NOW
      }
    ];
    expect(shouldJustWait(actions)).toBe(false);
  });
  it("should return true when wait date is before offering date", () => {
    const actions: IEntitlementActions[] = [
      {
        type: EntitlementActionType.WAIT,
        publication: { availableAt: new Date(Date.now() + 1000).toISOString(), publicationId: "123" }
      },
      {
        type: EntitlementActionType.BUY_WATCH_LATER,
        offerings: [
          {
            offeringId: "123",
            publications: [{ availableAt: new Date(Date.now() + 2000).toISOString(), publicationId: "456" }]
          },
          {
            offeringId: "1235323",
            publications: [{ availableAt: new Date(Date.now() + 5000).toISOString(), publicationId: "678" }]
          }
        ]
      }
    ];
    expect(shouldJustWait(actions)).toBe(true);
  });
  it("should return false if buy watch now gives access prior to wait", () => {
    const actions: IEntitlementActions[] = [
      {
        type: EntitlementActionType.WAIT,
        publication: { availableAt: new Date(Date.now() + 15000).toISOString(), publicationId: "123" }
      },
      {
        type: EntitlementActionType.BUY_WATCH_LATER,
        offerings: [
          {
            offeringId: "123",
            publications: [{ availableAt: new Date(Date.now() + 2000).toISOString(), publicationId: "456" }]
          },
          {
            offeringId: "1235323",
            publications: [{ availableAt: new Date(Date.now() + 5000).toISOString(), publicationId: "678" }]
          }
        ]
      }
    ];
    expect(shouldJustWait(actions)).toBe(false);
  });
});
