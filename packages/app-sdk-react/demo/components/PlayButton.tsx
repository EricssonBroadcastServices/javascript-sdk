import React from "react";
import { IEntitlementStatusResult as DeprecatedIEntitlementStatusResult } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useTranslations, useUserSession } from "../../src";

export const PlayButton = ({
  entitlementResult: { isEntitled, loginToWatchForFree, isGeoBlocked, shouldJustWait, accessLater, accessNow }
}: {
  entitlementResult: DeprecatedIEntitlementStatusResult;
}) => {
  const [translations] = useTranslations();
  const [session] = useUserSession();
  if (!translations) return null;
  if (isEntitled) {
    return <button>{translations.getText("PLAY")}</button>;
  }
  if (loginToWatchForFree) {
    return <button>{translations.getText("LOGIN_TO_WATCH_FOR_FREE")}</button>;
  }
  if (isGeoBlocked) {
    return <button disabled>{translations.getText(["GEO_BLOCKED"])}</button>;
  }
  if (shouldJustWait) {
    return <button disabled>{translations.getText("PLAY")}</button>;
  }
  if (!session?.isLoggedIn()) {
    return <button>{translations.getText("LOG_IN")}</button>;
  }
  if (accessNow.length) {
    return <button>I should try to sell something if supported by config and platform. Access now</button>;
  }
  if (accessLater.length) {
    return <button>I should try to sell something if supported by config and platform. Access later</button>;
  }
  return <button>Ooops. It is not possible to access this content at all.</button>;
};
