import { AuthenticationService, DeviceType } from "./authentication-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { LoginResponse } from "../models/login-response-model";
import { mocks } from "../../test-utils/mocks";
import { SessionResponse } from "../models/session-model";

describe("Auth service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
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
    const loginOptions = {
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      username: "tester",
      password: "tester123",
      device: {
        deviceId: "123",
        type: DeviceType.WEB,
        name: ""
      },
      informationCollectionConsentGivenNow: false
    };
    const loginResponse = await authService.login(loginOptions);
    expect(loginResponse).toBeInstanceOf(LoginResponse);
    expect(loginResponse.isAnonymous).toBeFalsy();
    expect(axios.post).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v3/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/auth/login`,
      expect.objectContaining({
        username: loginOptions.username,
        password: loginOptions.password,
        device: loginOptions.device,
        informationCollectionConsentGivenNow: false
      }),
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
      device: mocks.device
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
      "https://testbaseurl.com/v2/customer/CU/businessunit/BU/auth/login?fromAllDevice=false",
      {
        headers: serviceOptions.authHeader()
      }
    );
  });
});
