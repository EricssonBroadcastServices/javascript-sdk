import {
  DeviceType as DeprecatedDeviceType,
  ExposureApi as DeprecatedExposureApi,
  EntitlementActionType as DeprecatedEntitlementActionType
} from "@ericssonbroadcastservices/exposure-sdk";
import {
  DeviceGroup as DeprecatedDeviceGroup,
  IEntitlementStatusResult as DeprecatedIEntitlementStatusResult,
  WhiteLabelService as DeprecatedWLService,
  WLAsset as DeprecatedWLAsset,
  WLConfig as DeprecatedWLConfig
} from "@ericssonbroadcastservices/whitelabel-sdk";
import { DeviceGroup } from "@ericssonbroadcastservices/app-sdk";
import { ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";

export {
  DeprecatedEntitlementActionType,
  DeprecatedExposureApi,
  DeprecatedDeviceGroup,
  DeprecatedDeviceType,
  DeprecatedIEntitlementStatusResult,
  DeprecatedWLAsset,
  DeprecatedWLService,
  DeprecatedWLConfig
};

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
