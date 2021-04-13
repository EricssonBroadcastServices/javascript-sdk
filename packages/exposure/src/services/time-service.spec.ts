import { TimeService } from "./time-service";
import { ServiceOptions } from "./base-service";
import { Time } from "../models/time-model";
import axios from "axios";

describe("Time service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "" })
  };
  const timeService = new TimeService(serviceOptions);
  it("should fetch time", async () => {
    const mockReturnValue = {
      data: {
        epochMillis: 1617882625337,
        iso8601: "2021-04-08T11:50:25.337Z"
      }
    };
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
    const timeResponse = await timeService.getTime();
    expect(timeResponse).toBeInstanceOf(Time);
    expect(axios.get).toHaveBeenCalledWith(`${serviceOptions.baseUrl}/v2/time`, {});
  });
});
