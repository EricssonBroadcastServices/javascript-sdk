import React from "react";
import {
  queryClient,
  useBookmarks,
  useConfig,
  useCountryCode,
  useRedBeeState,
  useSystemConfigV2,
  useTranslations,
  useUserDetails,
  useUserSession,
  useValidateSession
} from "../../src";
import { JsonBox } from "../components/JsonBox";

export const HomePage = () => {
  const [traslations] = useTranslations();
  const [config] = useConfig();
  const state = useRedBeeState();
  const countryCode = useCountryCode();
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  const [bookmarks] = useBookmarks();
  const validateSession = useValidateSession();
  const [systemConfig] = useSystemConfigV2();

  if (state.unavailable) {
    return <h1>App unavailable 😭</h1>;
  }
  if (!config) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={() => queryClient.invalidateQueries()}>Invalidate everything react-query</button>
      <button onClick={() => validateSession().catch(err => console.log("Oh no!", err))}>Validate session</button>
      <JsonBox title={"Translations"} json={JSON.stringify(traslations, null, 2)}></JsonBox>
      <JsonBox title={"Config"} json={JSON.stringify(config, null, 2)}></JsonBox>
      <JsonBox title={"Loading state"} json={JSON.stringify(state.loading, null, 2)}></JsonBox>
      <JsonBox title={"Geolocation"} json={JSON.stringify(countryCode, null, 2)}></JsonBox>
      <JsonBox title={"User details"} json={JSON.stringify(userDetails, null, 2)}></JsonBox>
      <JsonBox title={"User session"} json={JSON.stringify(session, null, 2)}></JsonBox>
      <JsonBox title={"Bookmarks"} json={JSON.stringify(bookmarks, null, 2)}></JsonBox>
      <JsonBox title={"System"} json={JSON.stringify(systemConfig, null, 2)}></JsonBox>
    </div>
  );
};
