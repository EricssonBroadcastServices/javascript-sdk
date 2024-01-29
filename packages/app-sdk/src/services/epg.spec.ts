import { describe, expect, it } from "@jest/globals";

import { expectAsset, expectProgram } from "../../test-utils/expectations";
import { DeviceGroup } from "../interfaces/device-group";
import { IExpoureWLEpgComponent } from "../interfaces/exposure-wl-component";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import { WhiteLabelService } from "./white-label-service";

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(undefined),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

describe("WhiteLabelServices", () => {
  it("gets an epg component", async () => {
    const epgComponent = await service.getComponentById<IExpoureWLEpgComponent>({
      componentId: "e02ac2a8-bef0-49a3-9c60-3ed3c1c7e5db",
      countryCode: "se"
    });
    const content = await service.getEpgContent(epgComponent);
    content.forEach(epg => {
      expect(epg.channel).toEqual(expectAsset());
      expect(epg.programs).toEqual(expect.arrayContaining([expectProgram()]));
    });
  });
  it("resolves epg content", async () => {
    const epgReference: IExposureWLReference = {
      name: "All channels",
      appType: "epg",
      referenceId: "e02ac2a8-bef0-49a3-9c60-3ed3c1c7e5db",
      referenceUrl:
        "/v2/whitelabel/customer/BSCU/businessunit/BSBU/config/sandwich/component/e02ac2a8-bef0-49a3-9c60-3ed3c1c7e5db",
      hasAuthorizedContent: false
    };
    const resolved = await service.getResolvedComponentByReference<"epg">({
      wlReference: epgReference,
      countryCode: "SE"
    });
    resolved.content?.forEach(epgEntry => {
      expect(epgEntry.channel).toEqual(expectAsset());
    });
  });
});
