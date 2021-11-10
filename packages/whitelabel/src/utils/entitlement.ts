import {
  EntitlementActionType,
  IEntitlementActions,
  IEntitlementError,
  IProductOffering
} from "@ericssonbroadcastservices/exposure-sdk";
import { IEntitlementStatusResult, IListOffering, WLAsset } from "..";

function offeringToListOffering(
  productOffering: IProductOffering,
  entitlementError: IEntitlementError,
  actionType: EntitlementActionType
): IListOffering {
  const action = entitlementError.actions?.find(a => a.type === actionType);
  const availableAtDate = action?.offerings?.find(o => o.offeringId === productOffering.id)?.publications[0]
    ?.availableAt;
  return {
    productOffering,
    availableAtDate:
      availableAtDate && new Date(availableAtDate).getTime() > Date.now() ? new Date(availableAtDate) : undefined
  };
}

export function shouldJustWait(actions?: IEntitlementActions[]): boolean {
  if (!actions || actions.length === 0) return false;
  if (actions.every(a => a.type === EntitlementActionType.WAIT)) return true;
  if (actions.some(a => [EntitlementActionType.BUY_WATCH_NOW, EntitlementActionType.LOGIN].includes(a.type)))
    return false;
  const waitAction = actions.find(a => a.type === EntitlementActionType.WAIT);
  const buyWatchLaterAction = actions.find(a => a.type === EntitlementActionType.BUY_WATCH_LATER);
  if (!waitAction) return false;
  // should be only wait actions or buyWatchLaterActions at this point, hence return true here.
  if (!buyWatchLaterAction) return true;
  const earlisetOfferingDate = buyWatchLaterAction?.offerings
    ?.flatMap(o => o.publications)
    .sort((a, b) => new Date(a.availableAt).getTime() - new Date(b.availableAt).getTime())[0];
  return (
    new Date(waitAction?.publication?.availableAt as string).getTime() <
    new Date(earlisetOfferingDate?.availableAt as string).getTime()
  );
}

export function errorToEntitlementResult(
  entitlementError: IEntitlementError,
  asset: WLAsset,
  availableProductOfferings
): IEntitlementStatusResult {
  return {
    isEntitled: false,
    accessLater: availableProductOfferings
      .map(po => {
        return offeringToListOffering(po, entitlementError, EntitlementActionType.BUY_WATCH_LATER);
      })
      .filter(po => {
        const action = entitlementError.actions?.find(a => a.type === EntitlementActionType.BUY_WATCH_LATER);
        return action?.offerings?.some(o => o.offeringId === po.productOffering.id);
      }),
    accessNow: availableProductOfferings
      .map(po => {
        return offeringToListOffering(po, entitlementError, EntitlementActionType.BUY_WATCH_NOW);
      })
      .filter(po => {
        const action = entitlementError.actions?.find(a => a.type === EntitlementActionType.BUY_WATCH_NOW);
        return action?.offerings?.some(o => o.offeringId === po.productOffering.id);
      }),
    isInFuture: !!entitlementError.actions?.every(a => {
      return [EntitlementActionType.BUY_WATCH_LATER, EntitlementActionType.WAIT].includes(a.type);
    }),
    startTime: asset.getStartTime() || null, // not sure i we should use err.availableAt instead.
    isGeoBlocked: entitlementError?.message === "GEO_BLOCKED",
    entitlementError,
    loginToWatchForFree: !!entitlementError.actions?.some(a => a.type === EntitlementActionType.LOGIN),
    shouldJustWait: shouldJustWait(entitlementError.actions)
  };
}
