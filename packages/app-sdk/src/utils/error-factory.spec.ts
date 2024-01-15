import { englishTranslations } from "../../test-utils/mock-translations";
import { GenericError, PaymentError, LoginError, VoucherError } from "./error-factory";
import { Translations } from "./wl-translations";

const mockTranslations = new Translations(englishTranslations);

describe("error translator", () => {
  describe("Should return proper user error message for", () => {
    it("Generic error", () => {
      const error = new GenericError("UNKNOWN_ERROR", { code: 500 });
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
    });
    it("Payment error", () => {
      const error = new PaymentError("PRODUCT_ALREADY_BOUGHT", { code: 400 });
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("PRODUCT_ALREADY_BOUGHT"));
      error.message = "NOT_FOUND";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("NOT_FOUND"));
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      error.message = "BAD_PASSWORD";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));
      error.message = "NOT_FOUND";
      error.metadata.code = 404;
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("NOT_FOUND"));
      error.message = "STORED_PAYMENT_DETAILS";
      error.metadata.code = 403;
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "STORED_PAYMENT_DETAILS"])
      );
    });
    it("Login error", () => {
      const error = new LoginError("INVALID_CREDENTIALS", { code: 400 });
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "LOGIN", "UNKNOWN"])
      );
      error.message = "MIGRATED_USER";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "LOGIN", "MIGRATED_USER"])
      );
      error.message = "USERNAME_ALREADY_IN_USE";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("USERNAME_ALREADY_IN_USE"));
    });
    it("Voucher Error", () => {
      const error = new VoucherError("INVALID_VOUCHER_CODE", { code: 404 });
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"])
      );
      error.message = "CODE_ALREADY_REDEEMED";
      error.metadata.code = 422;
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "VOUCHER", "ALREADY_REDEEMED_VOUCHER_CODE"])
      );
      error.message = "CODE_EXPIRED";
      error.metadata.code = 422;
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText(["ERROR", "VOUCHER", "VOUCHER_CODE_EXPIRED"])
      );
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
    });
  });
  describe("fromFetchError should return a string that can be translated for", () => {
    it("Generic error with error status and statusText", () => {
      const fromFetchError = GenericError.fromFetchError;

      let error = new Response("", { status: 400, statusText: "Bad Request" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 401, statusText: "Unauthorized" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 403, statusText: "Forbidden" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 404, statusText: "Not Found" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_FOUND"));
      error = new Response("", { status: 408, statusText: "Request Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 409, statusText: "Conflict" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 422, statusText: "Unprocessable Content" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN"));
      error = new Response("", { status: 429, statusText: "Too Many Requests" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 500, statusText: "Internal Server Error" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      error = new Response("", { status: 502, statusText: "Bad Gateway" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      error = new Response("", { status: 503, statusText: "Service Unavailable" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 504, statusText: "Gateway Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 234, statusText: "test" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
    });
    it("Generic error with error status and no statusText", () => {
      const fromFetchError = GenericError.fromFetchError;

      let error = new Response("", { status: 400, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 401, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 403, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      error = new Response("", { status: 404, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("NOT_FOUND"));
      error = new Response("", { status: 408, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 409, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 422, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN"));
      error = new Response("", { status: 429, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 500, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      error = new Response("", { status: 502, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      error = new Response("", { status: 503, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
      error = new Response("", { status: 504, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }))).toEqual(
        mockTranslations.getText(["LOGIN", "UNKNOWN"])
      );
    });
    it("Payment error with error status", () => {
      const fromFetchError = GenericError.fromFetchError;
      const error = new Response("", { status: 403, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error, errorType: "PAYMENT" }))).toEqual(
        mockTranslations.getText(["ERROR", "STORED_PAYMENT_DETAILS"])
      );
    });
    it("Voucher error with error status", () => {
      const fromFetchError = GenericError.fromFetchError;
      const error = new Response("", { status: 404, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error, errorType: "VOUCHER" }))).toEqual(
        mockTranslations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"])
      );
    });
  });
});
