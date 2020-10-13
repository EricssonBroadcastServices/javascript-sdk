import { DeviceGroup } from "../interfaces/device-group";
import { WhiteLabelService } from "./white-label-service";

describe("White label service", () => {
  const service = new WhiteLabelService({
    customer: "BSCU",
    businessUnit: "BSBU",
    origin: "bsbu.enigmatv.io",
    authHeader: () => ({ Authorization: "" }),
    deviceGroup: DeviceGroup.WEB
  });
  beforeEach(() => {
    spyOn(service, "get").and.returnValue(Promise.resolve({}))
  })
  it("should send correct queryParams when fetching config with origin", () => {
    service.getConfig({ locale: "en" })
    expect(service.get)
      .toHaveBeenLastCalledWith("/api/internal/origin/config?deviceGroup=web&locale=en&origin=bsbu.enigmatv.io");
    service.getConfig({ locale: "en", countryCode: "SE" })
    expect(service.get)
      .toHaveBeenLastCalledWith("/api/internal/origin/config?countryCode=SE&deviceGroup=web&locale=en&origin=bsbu.enigmatv.io");
  });
  it("should send correct queryParams when fetching config based on cu bu", () => {
    service.getConfigByCustomerAndBusinessUnit({ locale: "en", customer: "BSCU", businessUnit: "BSBU" });
    expect(service.get)
      .toHaveBeenLastCalledWith("/api/internal/customer/BSCU/businessunit/BSBU/config?deviceGroup=web&locale=en");
    service.getConfigByCustomerAndBusinessUnit({ locale: "en", customer: "BSCU", businessUnit: "BSBU", countryCode: "SE" });
    expect(service.get)
      .toHaveBeenLastCalledWith("/api/internal/customer/BSCU/businessunit/BSBU/config?countryCode=SE&deviceGroup=web&locale=en");
  });
})