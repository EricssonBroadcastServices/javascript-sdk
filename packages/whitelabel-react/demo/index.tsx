import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { DeviceType } from "@ericssonbroadcastservices/exposure-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/whitelabel-sdk";
import { RedBeeProvider, IStorage, IDevice, useExposureApi, RedBeeContext, useUserGeoLocation } from "../src/index";

export default function App() {
  const exposureApi = useExposureApi();
  const [redBeeContext] = useContext(RedBeeContext);
  const userGeoLocation = useUserGeoLocation();
  console.log(redBeeContext, userGeoLocation);
  React.useEffect(() => {
    exposureApi.content.getAssets({}).then(assets => {
      console.log(assets);
    })
  }, [])
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
    baseUrl={"https://bsbu.enigmatv.io"}
    customer={"BSCU"}
    businessUnit={"BSBU"}
    storage={storage}
    device={device}
    deviceGroup={DeviceGroup.TV}
  >
    <App />
  </RedBeeProvider>
}

ReactDOM.render(<AppProvider />, document.getElementById("app"));
