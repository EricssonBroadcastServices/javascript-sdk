import { AuthenticationService } from "./authentication-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { LoginResponse } from "../models/login-response-model";
import { mocks } from "../../test-utils/mocks";
import { SessionResponse } from "../models/session-model";

describe("Auth service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "sessionToken" })
  };
  const authService = new AuthenticationService(serviceOptions);
  beforeEach(() => {
    const mockReturnValue = {
      data: {}
    };
    spyOn(axios, "post").and.returnValue(Promise.resolve(mockReturnValue));
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
    spyOn(axios, "delete").and.returnValue(Promise.resolve(mockReturnValue));
  });
  it("should login", async () => {
    const body = {
      username: "user",
      credentials: {
        passwordTuples: []
      },
      device: mocks.device,
      deviceId: "123"
    };
    const loginResponse = await authService.login({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      body: body
    });
    expect(loginResponse).toBeInstanceOf(LoginResponse);
    expect(loginResponse.isAnonymous).toBeFalsy();
    expect(axios.post).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/auth/login`,
      expect.objectContaining(body),
      expect.any(Object)
    );
  });
  it("should login anon", async () => {
    const body = {
      device: mocks.device,
      deviceId: "123"
    };
    const loginResponse = await authService.loginAnonymous({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      body: body
    });
    expect(loginResponse).toBeInstanceOf(LoginResponse);
    expect(loginResponse.isAnonymous).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/auth/anonymous`,
      expect.objectContaining(body),
      expect.any(Object)
    );
  });
  it("should validate session", async () => {
    const sessionResponse = await authService.validateSession({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit
    });
    expect(sessionResponse).toBeInstanceOf(SessionResponse);
    expect(
      axios.get
    ).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/auth/session`,
      { headers: serviceOptions.authHeader() }
    );
  });
  it("should logout", async () => {
    await authService.logout({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit
    });
    expect(axios.delete).toHaveBeenCalledWith(
      "testBaseUrl/v2/customer/CU/businessunit/BU/auth/login?fromAllDevice=false",
      {
        headers: serviceOptions.authHeader()
      }
    );
  });
});
