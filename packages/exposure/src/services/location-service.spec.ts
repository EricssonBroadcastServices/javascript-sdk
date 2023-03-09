import { LocationService } from "./location-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";

describe("Location service", () => {
  it("should fetch location", async () => {
    const serviceOptions: ServiceOptions = {
      baseUrl: "https://testbaseurl.com",
      authHeader: () => ({ Authorization: "" })
    };
    const locationService = new LocationService(serviceOptions);
    const mockReturnValue = {
      data: {
        locationKnown: true,
        countryCode: "SE"
      }
    };
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(mockReturnValue));
    await locationService.getLocation();
    expect(axios.get).toHaveBeenCalledWith(`${serviceOptions.baseUrl}/v2/location`, {});
  });

  it("should fetch location based on customer and business unit", async () => {
    const serviceOptions: ServiceOptions = {
      baseUrl: "https://testbaseurl.com",
      authHeader: () => ({ Authorization: "" }),
      customer: "BSCU",
      businessUnit: "BSBU"
    };
    const locationService = new LocationService(serviceOptions);
    locationService.setOptions(serviceOptions);
    const mockReturnValue = {
      data: {
        locationKnown: true,
        countryCode: "SE"
      }
    };
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve(mockReturnValue));
    await locationService.getLocation();
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${serviceOptions.customer}/businessunit/${serviceOptions.businessUnit}/location`,
      {}
    );
  });
});
