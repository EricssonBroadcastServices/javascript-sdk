import { describe, expect, test as it } from "@jest/globals";

import { expectTagType } from "../../test-utils/expectations";
import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLCategoriesComponent } from "../interfaces/exposure-wl-component";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import { WhiteLabelService } from "./white-label-service";

const service = new WhiteLabelService({
  customer: "Players",
  businessUnit: "SDKTesting",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(undefined)
});

describe("WhiteLabelServices", () => {
  it("gets content for a categories component", async () => {
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
  it("resolves categories component from reference", async () => {
    const categoriesReference: IExposureWLReference = {
      name: "Categories component",
      appType: "tagtype",
      referenceId: "860d45cf-a6fe-43e5-9702-2f2a6bd48f58",
      referenceUrl:
        "/v2/whitelabel/customer/Players/businessunit/SDKTesting/config/sandwich/component/860d45cf-a6fe-43e5-9702-2f2a6bd48f58",
      images: [],
      hasAuthorizedContent: false
    };
    const resolved = await service.getResolvedComponentByReference<"tagtype">({
      wlReference: categoriesReference,
      countryCode: "SE"
    });
    resolved.content.items.forEach(item => {
      expect(item).toEqual(expectTagType());
    });
  });
});
