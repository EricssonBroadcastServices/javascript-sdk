import React from "react";
import { EntitlementStatusResult } from "@ericssonbroadcastservices/app-sdk";
import { useTranslations, useUserSession } from "../../src";

export const PlayButton = ({ entitlementResult }: { entitlementResult: EntitlementStatusResult | null }) => {
  const [translations] = useTranslations();
  const [session] = useUserSession();
  if (!translations || !entitlementResult) return null;
  const { isEntitled, loginToWatchForFree, isGeoBlocked, shouldJustWait, accessLater, accessNow } = entitlementResult;
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
