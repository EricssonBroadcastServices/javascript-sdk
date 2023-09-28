import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLCategoriesComponent } from "../interfaces/exposure-wl-component";
import { WhiteLabelService } from "./white-label-service";

const service = new WhiteLabelService({
  customer: "Players",
  businessUnit: "SDKTesting",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(undefined)
});

describe("WhiteLabelServices", () => {
  it("gets an epg component", async () => {
    const categoriesComponent = await service.getComponentById<IExposureWLCategoriesComponent>({
      componentId: "860d45cf-a6fe-43e5-9702-2f2a6bd48f58",
      countryCode: "SE"
    });
    const content = await service.getCategoriesContent(categoriesComponent);
    content.items.forEach(tag => {
      expect(tag.scheme).toBe("other");
      expect(tag.tagId).toEqual(expect.any(String));
    });
  });
});
