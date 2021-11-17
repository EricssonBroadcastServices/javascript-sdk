import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DeviceType } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/whitelabel-sdk";
import {
  RedBeeProvider,
  IStorage,
  IDevice,
  useRedBeeStateDispatch,
  ActionType,
  useTranslations,
  useConfig,
  useExposureApi,
  useRedBeeState,
  useActivationCode,
  useGeolocation,
  useUserDetails
} from "../src/index";
import { LanguageSelector } from "./components/LanguageSelector";
import SearchInput from "./components/SearchInput";

const device: IDevice = {
  deviceId: "123",
  name: "123 test",
  type: DeviceType.SMART_TV
};

const JsonBox = ({ json, children, title }: { json: any; children?: any; title: string }) => {
  return (
    <details style={{ flex: 1 }}>
      {children}
      <summary>{title}</summary>
      <p style={{ whiteSpace: "pre-wrap" }}>{json}</p>
    </details>
  );
};

export default function App() {
  const [config] = useConfig();
  const state = useRedBeeState();
  const exposureApi = useExposureApi();
  const [traslations] = useTranslations();
  const dispatch = useRedBeeStateDispatch();
  const [activationCodeData] = useActivationCode({});
  const [geolocation] = useGeolocation();
  const [userDetails] = useUserDetails();
  React.useEffect(() => {
    if (!config) return;
    const { customer, businessUnit } = config;
    exposureApi.authentication
      .login({ customer, businessUnit, username: "simon.wallin1@mailinator.com", password: "SimonTest", device })
      .then(session => {
        dispatch({ type: ActionType.SET_SESSION, session });
      });
  }, [config]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <LanguageSelector />
        <SearchInput />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* <JsonBox title={"Activation Code"} json={JSON.stringify(activationCodeData, null, 2)}>
          <button onClick={activationCodeData.refresh}>Refresh</button>
        </JsonBox> */}
        <JsonBox title={"Translations"} json={JSON.stringify(traslations, null, 2)}></JsonBox>
        <JsonBox title={"Config"} json={JSON.stringify(config, null, 2)}></JsonBox>
        <JsonBox title={"Loading state"} json={JSON.stringify(state.loading, null, 2)}></JsonBox>
        <JsonBox title={"Geolocation"} json={JSON.stringify(geolocation, null, 2)}></JsonBox>
        <JsonBox title={"User details"} json={JSON.stringify(userDetails, null, 2)}></JsonBox>
      </div>
    </div>
  );
}

const storage: IStorage = {
  getItem: (...args) => Promise.resolve(localStorage.getItem(...args)),
  setItem: (...args) => Promise.resolve(localStorage.setItem(...args)),
  removeItem: (...args) => Promise.resolve(localStorage.removeItem(...args))
};

function AppProvider() {
  return (
    <RedBeeProvider
      internalApiUrl={"https://bsbu.enigmatv.io"}
      exposureBaseUrl={"https://exposure.api.redbee.dev"}
      origin={"bsbu.enigmatv.io"}
      storage={storage}
      device={device}
      deviceGroup={DeviceGroup.TV}
      autoFetchConfig
    >
      <App />
    </RedBeeProvider>
  );
}

ReactDOM.render(<AppProvider />, document.getElementById("app"));
