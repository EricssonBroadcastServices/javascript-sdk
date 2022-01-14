import React from "react";
import ReactDOM from "react-dom";
import { DeviceType, IDeviceInfo, TErrorMapper } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/whitelabel-sdk";
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
import axios from "axios";
import redaxios from "redaxios";

export const axiosErrorMapper: TErrorMapper = err => {
  console.log(err);
  if (!err) throw { message: "Unknown error", httpCode: 500 };
  if (typeof err === "string") throw { message: err, httpCode: 500 };
  throw {
    httpCode: (err as any).response ? (err as any).response.status : 500,
    message: (err as any).response?.data?.message ? (err as any).response?.data?.message : (err as any).message,
    data: (err as any).response?.data
  };
};

export const redaxiosErrorMapper: TErrorMapper = err => {
  if (!err) throw { message: "Unknown error", httpCode: 500 };
  if (typeof err === "string") throw { message: err, httpCode: 500 };
  throw {
    httpCode: (err as any).status || 500,
    message: (err as any).data?.message,
    data: (err as any).data
  };
};

const axiosClient = { client: axios, errorMapper: axiosErrorMapper };
const redaxiosClient = { client: redaxios, errorMapper: redaxiosErrorMapper }

const device: IDeviceInfo = {
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
      internalApiUrl={"https://bsbu.enigmatv.io"}
      exposureBaseUrl={"https://exposure.api.redbee.dev"}
      customer={"BSCU"}
      businessUnit={"BSBU"}
      storage={storage}
      device={device}
      deviceGroup={DeviceGroup.TV}
      autoFetchConfig
      http={redaxiosClient}
    >
      <App />
    </RedBeeProvider>
  );
}

ReactDOM.render(<AppProvider />, document.getElementById("app"));
