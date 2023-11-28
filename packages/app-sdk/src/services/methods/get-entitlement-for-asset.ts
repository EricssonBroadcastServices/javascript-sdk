import { Asset, PaymentProvider, StoreProductOffering, entitle } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { EntitlementStatus, EntitlementStatusResult } from "../../interfaces/entitlement-result";
import { WhiteLabelService } from "../white-label-service";
import { errorToEntitlementResult } from "../../utils/entitlement";

export interface GetEntitlementForAssetOptions {
  asset: Asset;
  availableProductOfferings: StoreProductOffering[];
  paymentProvider?: PaymentProvider;
}

export async function getEntitlementForAsset(
  service: WhiteLabelService,
  { asset, paymentProvider, availableProductOfferings }: GetEntitlementForAssetOptions
): Promise<EntitlementStatusResult> {
  return await entitle
    .call(service.context, {
      assetId: asset.assetId,
      paymentProvider,
      headers: { Authorization: `Bearer ${await service.context.getAuthToken()}` }
    })
    .then(res => {
      return {
        status: EntitlementStatus.ENTITLED,
        isEntitled: true,
        accessLater: [],
        accessNow: [],
        isInFuture: false,
        startTime: null,
        isGeoBlocked: false,
        isStreamLimitReached: false,
        entitlementError: null,
        loginToWatchForFree: false,
        shouldJustWait: false,
        streamInfo: res.streamInfo
      };
    })
    .catch(async err => {
      return errorToEntitlementResult(await (err.response as Response).json(), asset, availableProductOfferings);
    });
}
