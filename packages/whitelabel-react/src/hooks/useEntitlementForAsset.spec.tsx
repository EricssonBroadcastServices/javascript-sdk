/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { DeviceType, EntitlementActionType, ExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { IDevice, RedBeeProvider, useEntitlementForAsset } from "..";
import {
  DeviceGroup,
  IEntitlementStatusResult,
  WhiteLabelService,
  WLAsset
} from "@ericssonbroadcastservices/whitelabel-sdk";
import * as offerings from "./useProductOfferings";
import * as api from "./useApi";
import * as userSession from "./useUserSession";
import * as location from "./useGeolocation";
import { defaultEntitlementStatus } from "./useEntitlementForAsset";

const storage = {
  // @ts-ignore
  getItem: (...args) => Promise.resolve(localStorage.getItem(...args)),
  // @ts-ignore
  setItem: (...args) => Promise.resolve(localStorage.setItem(...args)),
  // @ts-ignore
  removeItem: (...args) => Promise.resolve(localStorage.removeItem(...args))
};

// const mockAsset = deserialize(WLAsset, {});
const mockDevice: IDevice = { name: "123", deviceId: "123", type: DeviceType.WEB };
const mockWlService = new WhiteLabelService({
  authHeader: () => ({ Authorization: "123" }),
  deviceGroup: DeviceGroup.WEB,
  exposureApi: new ExposureApi({ authHeader: () => ({ Authorization: "123" }) })
});

// eslint-disable-next-line react/prop-types
function TestWrapper({ children }) {
  return (
    <RedBeeProvider
      deviceGroup={DeviceGroup.WEB}
      exposureBaseUrl="internal"
      internalApiUrl="exposure"
      device={mockDevice}
      customer={"CU"}
      businessUnit={"BU"}
      storage={storage}
    >
      {children}
    </RedBeeProvider>
  );
}

describe("useEntitlements", () => {
  beforeEach(() => {
    spyOn(offerings, "useProductOfferings").and.returnValue([[], false]);
    spyOn(api, "useWLApi").and.returnValue(mockWlService);
    spyOn(location, "useGeolocation").and.returnValue([{ countryCode: "SE" }]);
  });
  it("defaults when no session token", () => {
    spyOn(mockWlService, "getEntitlementForAsset").and.returnValue({ test: "lalal" });
    spyOn(userSession, "useUserSession").and.returnValue([{ sessionToken: undefined }]);
    const { result } = renderHook(() => useEntitlementForAsset({ assetId: "1234" } as WLAsset, {}), {
      wrapper: TestWrapper
    });
    expect(result.current[0]).toEqual(defaultEntitlementStatus);
    expect(mockWlService.getEntitlementForAsset).not.toHaveBeenCalled();
  });
  it("fake updates status when starttime is passed", async () => {
    const mockResult: IEntitlementStatusResult = {
      isEntitled: false,
      isInFuture: true,
      startTime: new Date(Date.now() + 1000),
      entitlementError: {
        message: "NOT_ENTITLED",
        httpCode: 403,
        actions: [{ type: EntitlementActionType.WAIT }]
      },
      accessLater: [],
      accessNow: [],
      shouldJustWait: true,
      isGeoBlocked: false,
      loginToWatchForFree: false
    };
    spyOn(userSession, "useUserSession").and.returnValue([{ sessionToken: "123" }]);
    spyOn(mockWlService, "getEntitlementForAsset").and.returnValue(Promise.resolve(mockResult));
    const { result, waitForNextUpdate } = renderHook(() => useEntitlementForAsset({ assetId: "123" } as WLAsset, {}), {
      wrapper: TestWrapper
    });
    await waitForNextUpdate();
    expect(mockWlService.getEntitlementForAsset).toHaveBeenCalled();
    expect(result.current[0]).toEqual(mockResult);
    // next update should be when timer is done
    await waitForNextUpdate();
    expect(result.current[0]).toEqual({ ...mockResult, isEntitled: true });
  });
});
