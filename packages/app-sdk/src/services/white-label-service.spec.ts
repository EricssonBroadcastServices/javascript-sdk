import { DeviceGroup } from "../interfaces/device-group";
import { WhiteLabelService } from "./white-label-service";

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  locale: "en", // remove this prop in the class
  getAuthToken: () => Promise.resolve(undefined),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

describe("WhiteLabelServices", () => {
  it("returns something", async () => {
    const result = await service.getAllTheThings();
    expect(Object.keys(result).sort()).toStrictEqual(["config", "footer", "location", "menu", "systemConfig"]);
  });
});
