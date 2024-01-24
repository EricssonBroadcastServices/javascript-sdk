import React from "react";
import ReactDOM from "react-dom";
import { DeviceType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { RedBeeProvider, IStorage, useConfig } from "../src/index";
import { Routes, Route, HashRouter, useSearchParams } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AssetPage } from "./pages/AssetPage";
import "./index.css";
import { Login } from "./pages/Login";
import { Menu } from "./components/Menu";
import { Page } from "./pages/Page";
import { TagPage } from "./pages/TagPage";
import { DeviceGroup } from "@ericssonbroadcastservices/app-sdk";
import Footer from "./components/Footer/Footer";
import { AccountPage } from "./pages/AccountPage";
import { ParticipantPage } from "./pages/ParticipantPage";

const deviceRegistration = {
  deviceId: "123",
  name: "123 test",
  type: DeviceType.WEB
};

export function getOrganizationUnitConfig(useOriginConfig = false) {
  if (useOriginConfig)
    return {
      baseUrl: "",
      origin: {
        hostname: window.location.hostname,
        origin: window.location.origin,
        devBaseUrl: "https://exposure.api.redbee.dev",
        liveBaseUrl: "https://exposure.api.redbee.live"
      }
    };

  let { customer, businessUnit } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  if (!customer || !businessUnit) {
    customer = "BSCU";
    businessUnit = "BSBU";
  }
  return { customer, businessUnit, baseUrl: "https://exposure.api.redbee.dev" };
}

export default function App() {
  const [config] = useConfig();
  if (!config) return null;
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/tag">
          <Route path=":id" element={<TagPage />} />
        </Route>
        <Route path="/participant">
          <Route path=":id" element={<ParticipantPage />} />
        </Route>
        <Route path="/asset">
          <Route path=":id" element={<AssetPage />} />
        </Route>
        <Route path="/page">
          <Route path=":id" element={<Page />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

const storage: IStorage = {
  getItem: (...args) => Promise.resolve(localStorage.getItem(...args)),
  setItem: (...args) => Promise.resolve(localStorage.setItem(...args)),
  removeItem: (...args) => Promise.resolve(localStorage.removeItem(...args))
};

function AppProvider() {
  const ouParams = getOrganizationUnitConfig();
  const [searchParams] = useSearchParams();
  return (
    <RedBeeProvider
      {...ouParams}
      storage={storage}
      deviceRegistration={deviceRegistration}
      deviceGroup={DeviceGroup.WEB}
      onSessionValidationError={err => console.log(err, "sessionValidationError")}
      sessionToken={searchParams.get("sessionToken") || undefined}
    >
      <App />
    </RedBeeProvider>
  );
}

ReactDOM.render(
  <HashRouter>
    <AppProvider />
  </HashRouter>,
  document.getElementById("app")
);
