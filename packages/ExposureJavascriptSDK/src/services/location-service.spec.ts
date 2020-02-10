import { LocationService } from "./location-service";
import { ServiceOptions } from "./base-service";
import { UserLocation } from "../models/UserLocation";
import axios from "axios";

describe("Location service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "" })
  };
  const locationService = new LocationService(serviceOptions);
  it("should fetch location", async () => {
    const mockReturnValue = {
      data: {
        locationKnown: true,
        countryCode: "SE"
      }
    };
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
    const userLocationResponse = await locationService.getLocation();
    expect(userLocationResponse instanceof UserLocation).toBeTruthy();
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/location`,
      {}
    );
  });
});
