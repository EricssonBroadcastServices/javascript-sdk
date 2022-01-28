import React from "react";
import {
  useBookmarks,
  useConfig,
  useGeolocation,
  useRedBeeState,
  useTranslations,
  useUserDetails,
  useUserSession,
  useValidateSession
} from "../../src";
import { JsonBox } from "../components/JsonBox";

export const Home = () => {
  const [traslations] = useTranslations();
  const [config] = useConfig();
  const state = useRedBeeState();
  const [geolocation] = useGeolocation();
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  const [bookmarks] = useBookmarks();
  const validateSession = useValidateSession();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={() => validateSession().catch(err => console.log("Oh no!", err))}>Validate session</button>
      <JsonBox title={"Translations"} json={JSON.stringify(traslations, null, 2)}></JsonBox>
      <JsonBox title={"Config"} json={JSON.stringify(config, null, 2)}></JsonBox>
      <JsonBox title={"Loading state"} json={JSON.stringify(state.loading, null, 2)}></JsonBox>
      <JsonBox title={"Geolocation"} json={JSON.stringify(geolocation, null, 2)}></JsonBox>
      <JsonBox title={"User details"} json={JSON.stringify(userDetails, null, 2)}></JsonBox>
      <JsonBox title={"User session"} json={JSON.stringify(session, null, 2)}></JsonBox>
      <JsonBox title={"Bookmarks"} json={JSON.stringify(bookmarks, null, 2)}></JsonBox>
    </div>
  );
};
