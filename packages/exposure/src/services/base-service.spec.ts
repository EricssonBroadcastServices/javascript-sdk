import { BaseService, errorMapper } from "./base-service";
import { mocks } from "../../test-utils/mocks";
import { ApiError } from "../models/api-error-model";

describe("base service", () => {
  const baseService = new BaseService({
    baseUrl: "baseUrl",
    authHeader: () => ({ Authorization: "" })
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
  it("should map error", () => {
    expect(() => errorMapper(undefined)).toThrow(ApiError);
    expect(() => errorMapper(1)).toThrow(ApiError);
    expect(() => errorMapper("error")).toThrow(ApiError);
    expect(() =>
      errorMapper({
        message: "something went wrong"
      })
    ).toThrow(ApiError);
  });
});
