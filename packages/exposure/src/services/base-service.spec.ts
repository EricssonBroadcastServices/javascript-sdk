import { BaseService } from "./base-service";
import { mocks } from "../../test-utils/mocks";
import axios from "axios";

describe("base service", () => {
  const baseService = new BaseService({
    baseUrl: "https://baseUrl.com",
    authHeader: () => ({ Authorization: "" }),
    http: {
      client: axios,
      errorMapper: () => ({ httpCode: 1, message: "oh oh" })
    }
  });
  it("should throw error with missing customer or businessUnit", () => {
    expect(() =>
      baseService.cuBuUrl({
        customer: undefined,
        businessUnit: mocks.businessUnit,
        apiVersion: "v1"
      })
    ).toThrow();
    expect(() =>
      baseService.cuBuUrl({
        customer: mocks.customer,
        businessUnit: undefined,
        apiVersion: "v1"
      })
    ).toThrow();
  });
  it("should generate url with cu bu explicitly set", () => {
    expect(
      baseService.cuBuUrl({
        customer: mocks.customer,
        businessUnit: mocks.businessUnit,
        apiVersion: "v1"
      })
    ).toBe(`/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}`);
  });
  it("should use global cu bu if available", () => {
    baseService.setOptions({
      ...baseService.options,
      customer: mocks.customer,
      businessUnit: mocks.businessUnit
    });
    expect(
      baseService.cuBuUrl({
        apiVersion: "v1"
      })
    ).toBe(`/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}`);
  });
  it("should successfully build request urls, regardless of trailing/leading slashes", () => {
    jest.spyOn(axios, "get").mockResolvedValue("");
    baseService.get("/v1/test");
    expect(axios.get).toHaveBeenCalledWith("https://baseurl.com/v1/test", expect.any(Object));

    baseService.get("v1/test/");
    expect(axios.get).toHaveBeenCalledWith("https://baseurl.com/v1/test", expect.any(Object));

    baseService.setOptions({
      baseUrl: "https://baseUrl.com/",
      authHeader: () => ({ Authorization: "" }),
      http: {
        client: axios,
        errorMapper: () => ({ httpCode: 1, message: "oh oh" })
      }
    });
    baseService.get("v1/test/");
    expect(axios.get).toHaveBeenCalledWith("https://baseurl.com/v1/test", expect.any(Object));
  });
});
