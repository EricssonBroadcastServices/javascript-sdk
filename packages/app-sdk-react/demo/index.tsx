import React from "react";
import ReactDOM from "react-dom";
import { DeviceType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup as DeprecatedDeviceGroup } from "@ericssonbroadcastservices/whitelabel-sdk";
import { RedBeeProvider, IStorage, useConfig } from "../src/index";
import { LanguageSelector } from "./components/LanguageSelector";
import SearchInput from "./components/SearchInput";
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Asset } from "./pages/Asset";
import "./index.css";
import { Login } from "./components/Login";
import { Menu } from "./components/Menu";
import { Page } from "./pages/Page";

const deviceRegistration = {
  deviceId: "123",
  name: "123 test",
  type: DeviceType.SMART_TV
};

export default function App() {
  const [config] = useConfig();
  return (
    <div>
      <HashRouter>
        <Menu />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to={`/page/${config?.homePage.id}`}>
            <button style={{ marginRight: "10px" }}>Home</button>
          </Link>
          <LanguageSelector />
          <SearchInput />
          <Login />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asset">
            <Route path=":id" element={<Asset />} />
          </Route>
          <Route path="/page">
            <Route path=":id" element={<Page />} />
          </Route>
        </Routes>
      </HashRouter>
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
      baseUrl={"https://exposure.api.redbee.dev"}
      customer={"BSCU"}
      businessUnit={"BSBU"}
      storage={storage}
      deviceRegistration={deviceRegistration}
      deviceGroup={DeprecatedDeviceGroup.TV}
      autoFetchConfig
      onSessionValidationError={err => console.log(err, "sessionValidationError")}
    >
      <App />
    </RedBeeProvider>
  );
}

ReactDOM.render(<AppProvider />, document.getElementById("app"));
