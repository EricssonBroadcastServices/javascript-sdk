import { DeviceGroup } from "../interfaces/device-group";
import { IExpoureWLEpgComponent } from "../interfaces/exposure-wl-component";
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
      // TODO: use an isAsset util
      expect(epg.channel.assetId).toEqual(expect.any(String));
      // TODO: use an isProgramUtil
      expect(epg.programs.length).toBeTruthy();
    });
  });
});
