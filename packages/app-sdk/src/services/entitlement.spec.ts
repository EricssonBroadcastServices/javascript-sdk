import { getOfferings } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group.js";
import { WhiteLabelService } from "./white-label-service.js";

const sessionToken =
  "ses_7de87970-6322-4b16-a665-169865838197p|acc_28fc6fc0-2789-4ab8-a15d-9ead7f4da7a6_E5D874b|usr_f291a6dc-e4fa-44cc-8cec-1e48f18eb76f_E5D874b|null|1695809944516|1995809944134|false|4adbac2a-048e-40d8-8a79-a08be97bc281_WEB|WEB||PlayersSDKTesting||jghsYQKN/lFsKC0xqWdhclKSK8AQqtfnOpnsE9ZRSho=";

const service = new WhiteLabelService({
  customer: "Players",
  businessUnit: "SDKTesting",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(sessionToken)
});

const needsPurchaseId = "2a7fc5e2-18b5-40e8-b02b-cebfdb173931_35FC49";
const isEntitledId = "external_tears_of_steel_E5D874b";
const availableInFutureId = "647b725c-a3af-4795-b1a4-dc78cf14955f_35FC49";

describe.skip("get entitlement for asset", () => {
  it("get successful entitlements", async () => {
    const availableProductOfferings = await getOfferings.call(service, { countryCode: "SE" });
    const asset = await service.getAssetById(isEntitledId);
    const entitlementResult = await service.getEntitlementForAsset({ asset, availableProductOfferings });
    expect(entitlementResult).toEqual({
      status: "ENTITLED",
      isEntitled: true,
      accessLater: [],
      accessNow: [],
      isInFuture: false,
      startTime: null,
      isGeoBlocked: false,
      isStreamLimitReached: false,
      entitlementError: null,
      loginToWatchForFree: false,
      shouldJustWait: false
    });
  });
  it("get BUY_WATCH_NOW entitlements", async () => {
    const availableProductOfferings = await getOfferings.call(service, { countryCode: "SE" });
    const asset = await service.getAssetById(needsPurchaseId);
    const entitlementResult = await service.getEntitlementForAsset({ asset, availableProductOfferings });
    expect(entitlementResult).toEqual({
      status: "BUY_WATCH_NOW",
      isEntitled: false,
      isInFuture: false,
      isGeoBlocked: false,
      isStreamLimitReached: false,
      loginToWatchForFree: false,
      shouldJustWait: false,
      entitlementError: {
        httpCode: 403,
        message: "NOT_ENTITLED",
        actions: [
          {
            type: "BUY_WATCH_NOW",
            offerings: [
              {
                offeringId: "6428685f-1ca8-4dc5-95ad-d1e03f8a63bd_E5D874b",
                publications: [
                  {
                    availableAt: expect.any(String),
                    publicationId: "d1b409d9-70cb-4187-8bec-8631e184d09a_E5D874b"
                  }
                ]
              }
            ]
          }
        ]
      },
      accessLater: [],
      accessNow: [
        expect.objectContaining({
          productOffering: {
            productOfferingId: "6428685f-1ca8-4dc5-95ad-d1e03f8a63bd_E5D874b",
            rentalLength: "PT24H",
            localizedMetadata: [
              {
                locale: "en",
                name: "Test rental offering"
              }
            ],
            productIds: ["rental-product_E5D874b"],
            offeringPrice: {
              price: {
                amount: 1000,
                fractionDigits: 2,
                currency: "SEK"
              },
              vat: {
                percentage: 0,
                included: false
              }
            },
            productRequiresSelectAsset: true,
            productOfferingType: "rental",
            paymentMethodTypes: ["card"],
            id: "6428685f-1ca8-4dc5-95ad-d1e03f8a63bd_E5D874b"
          }
        })
      ],
      startTime: expect.any(Date)
    });
  });
  it("will be available in the future", async () => {
    const availableProductOfferings = await getOfferings.call(service, { countryCode: "SE" });
    const asset = await service.getAssetById(availableInFutureId);
    const entitlementResult = await service.getEntitlementForAsset({ asset, availableProductOfferings });
    expect(entitlementResult).toEqual({
      status: "WAIT",
      isEntitled: false,
      isInFuture: true,
      isGeoBlocked: false,
      isStreamLimitReached: false,
      loginToWatchForFree: false,
      shouldJustWait: true,
      entitlementError: {
        httpCode: 403,
        message: "NOT_PUBLISHED",
        actions: [
          {
            type: "WAIT",
            publication: {
              availableAt: expect.any(String),
              publicationId: "536611cf-28c6-455e-9c25-ced8db263b82_E5D874b"
            }
          }
        ]
      },
      accessLater: [],
      accessNow: [],
      startTime: expect.any(Date)
    });
  });
});
