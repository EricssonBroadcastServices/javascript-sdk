import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { DeviceType } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/whitelabel-sdk";
import { RedBeeProvider, IStorage, IDevice, useExposureApi, RedBeeContext } from "../src/index";

export default function App() {
  const exposureApi = useExposureApi();
  const [redBeeContextState] = useContext(RedBeeContext);
  const { customer, businessUnit } = redBeeContextState;
  React.useEffect(() => {
    if (!(customer && businessUnit)) return;
      exposureApi.content.getAssets({ customer, businessUnit }).then(assets => {
        console.log(assets);
      }).catch(err => console.log(err))
  }, [redBeeContextState.customer, redBeeContextState.businessUnit])
  return <h1>Hello</h1>;
}

const storage: IStorage = {
  getItem: (...args) => Promise.resolve(localStorage.getItem(...args)),
  setItem: (...args) => Promise.resolve(localStorage.setItem(...args)),
  removeItem: (...args) => Promise.resolve(localStorage.removeItem(...args)),
}

const device: IDevice = {
  deviceId: "123",
  name: "123 test",
  type: DeviceType.SMART_TV
}

function AppProvider() {
  return <RedBeeProvider
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
}

ReactDOM.render(<AppProvider />, document.getElementById("app"));
