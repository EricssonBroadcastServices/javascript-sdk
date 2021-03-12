import { deserialize } from "../decorators/property-mapper";
import { ApiError } from "./api-error-model";

describe("ApiError", () => {
  it("is still compatible with deserialize", () => {
    const err = deserialize(ApiError, { message: "hello :)", httpCode: 123 });
    expect(err.httpCode).toBe(123);
    expect(err.message).toBe("hello :)");
  });
});
