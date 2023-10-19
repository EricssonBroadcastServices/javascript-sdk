import {
  DeviceType as DeprecatedDeviceType,
  ExposureApi as DeprecatedExposureApi
} from "@ericssonbroadcastservices/exposure-sdk";
import {
  DeviceGroup as DeprecatedDeviceGroup,
  WhiteLabelService as DeprecatedWLService,
  WLConfig as DeprecatedWLConfig
} from "@ericssonbroadcastservices/whitelabel-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/app-sdk";
import { ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";

export { DeprecatedDeviceGroup, DeprecatedDeviceType, DeprecatedExposureApi, DeprecatedWLService, DeprecatedWLConfig };

export function createDeprecatedWLService(
  serviceContext: ServiceContext,
  deviceGroup: DeviceGroup,
  getAuthToken: () => string | undefined
) {
  // Note: The deprecated WL API takes a syncronous method here, so getAuthToken has to be also,
  // but the new api takes an async getAuthToken with the same signature
  function authHeader() {
    const sessionToken = getAuthToken();
    if (sessionToken) {
      return { Authorization: `Bearer ${sessionToken}` };
    }
    return undefined;
  }

  return new DeprecatedWLService({
    ...serviceContext,
    deviceGroup: DeprecatedDeviceGroup[deviceGroup.toUpperCase()],
    authHeader,
    exposureApi: new DeprecatedExposureApi({ ...serviceContext, authHeader })
  });
}