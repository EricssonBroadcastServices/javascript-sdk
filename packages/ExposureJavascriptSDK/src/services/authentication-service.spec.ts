import { AuthenticationService } from "./authentication-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { LoginResponse } from "../models/login-response-model";
import { mocks } from "../../test-utils/mocks";

describe("Auth service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "" })
  };
  const authService = new AuthenticationService(serviceOptions);
  it("should login", async () => {
    const mockReturnValue = {
      data: {}
    };
    spyOn(axios, "post").and.returnValue(Promise.resolve(mockReturnValue));
    const body = {
      username: "user",
      credentials: {
        passwordTuples: []
      },
      device: {
        height: 0,
        width: 0,
        type: "WEB" as "WEB",
        name: "name",
        deviceId: "123"
      },
      deviceId: "123"
    };
    const userLocationResponse = await authService.login({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      body: body
    });
    expect(userLocationResponse instanceof LoginResponse).toBeTruthy();
    expect(axios.post).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/auth/login`,
      expect.objectContaining(body),
      expect.any(Object)
    );
  });
});
