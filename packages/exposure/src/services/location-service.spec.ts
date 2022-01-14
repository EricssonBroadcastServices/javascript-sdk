import { LocationService } from "./location-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { mockHttpOptions } from "../../test-utils/mocks";

describe("Location service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "" }),
    http: mockHttpOptions
  };
  const locationService = new LocationService(serviceOptions);
  it("should fetch location", async () => {
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
});
