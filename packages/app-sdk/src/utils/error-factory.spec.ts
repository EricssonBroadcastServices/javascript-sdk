import { englishTranslations } from "../../test-utils/mock-translations";
import { AppError, PaymentError, LoginError, VoucherError } from "./error-factory";
import { Translations } from "./wl-translations";

const mockTranslations = new Translations(englishTranslations);

describe("Error translator factory", () => {
  describe("Should return proper user error message for", () => {
    it("Generic app error", () => {
      const error = new AppError("UNKNOWN_ERROR", { code: 500, rawError: "Internal Server Error" });
      expect(error.category).toEqual("APP");
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      expect(error.getError()).toEqual(["UNKNOWN_ERROR", 500, "Internal Server Error"]);
      expect(error.metadata).toEqual({ code: 500, rawError: "Internal Server Error" });
    });
    it("Payment error", () => {
      const error = new PaymentError("PRODUCT_ALREADY_BOUGHT", { code: 400, rawError: "Bad Request" });
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
      error.metadata.code = undefined;
      expect(error.getUserErrorMessage(mockTranslations, "OLD_PASSWORD_IS_NOT_CORRECT")).toEqual(
        mockTranslations.getText("INVALID_CREDENTIALS")
      );
    });
    it("Login error", () => {
      const error = new LoginError("INVALID_CREDENTIALS", { code: 400, rawError: "Bad Request" });
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
      expect(error.getUserErrorMessage(mockTranslations, "PASSWORD_UPDATED")).toEqual(
        mockTranslations.getText("PASSWORD_UPDATED")
      );
    });
    it("Login error is correctly translated when using fromFetchError", () => {
      const fromFetchError = AppError.fromFetchError;
      const error = new Response("Unauthorized", { status: 401, statusText: "oh no something went wrong" });
      const loginError = fromFetchError({ error, errorType: "LOGIN" });
      expect(mockTranslations.getText(loginError.message)).toEqual(
        mockTranslations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"])
      );
    });
    it("Voucher Error", () => {
      const error = new VoucherError("INVALID_VOUCHER_CODE", { code: 404, rawError: "Not Found" });
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
      expect(error.getUserErrorMessage(mockTranslations, "Test 123")).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
    });
  });
  describe("fromFetchError should return a string that can be translated for", () => {
    it("Generic app error with error status and statusText", () => {
      const fromFetchError = AppError.fromFetchError;

      let error = new Response("", { status: 400, statusText: "Bad Request" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 401, statusText: "Unauthorized" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 403, statusText: "Forbidden" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 404, statusText: "Not Found" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_FOUND")
      );
      error = new Response("", { status: 408, statusText: "Request Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 409, statusText: "Conflict" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 422, statusText: "Unprocessable Content" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("UNKNOWN"));
      error = new Response("", { status: 429, statusText: "Too Many Requests" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 500, statusText: "Internal Server Error" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { status: 502, statusText: "Bad Gateway" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { status: 503, statusText: "Service Unavailable" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 504, statusText: "Gateway Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 234, statusText: "test" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
    });
    it("Generic app error with error statusText and no status", () => {
      const fromFetchError = AppError.fromFetchError;

      let error = new Response("", { statusText: "Bad Request" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { statusText: "Unauthorized" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { statusText: "Forbidden" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { statusText: "Not Found" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_FOUND")
      );
      error = new Response("", { statusText: "Request Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { statusText: "Conflict" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { statusText: "Unprocessable Content" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("UNKNOWN"));
      error = new Response("", { statusText: "Too Many Requests" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { statusText: "Internal Server Error" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { statusText: "Bad Gateway" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { statusText: "Service Unavailable" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { statusText: "Gateway Timeout" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { statusText: "test" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
    });
    it("Generic app error with error status and no statusText", () => {
      const fromFetchError = AppError.fromFetchError;

      let error = new Response("", { status: 400, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 401, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 403, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_ALLOWED")
      );
      error = new Response("", { status: 404, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("NOT_FOUND")
      );
      error = new Response("", { status: 408, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 409, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 422, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("UNKNOWN"));
      error = new Response("", { status: 429, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 500, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { status: 502, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      error = new Response("", { status: 503, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
      error = new Response("", { status: 504, statusText: "" });
      expect(mockTranslations.getText(fromFetchError({ error }).message)).toEqual(mockTranslations.getText("RETRY"));
    });
    it("Payment error with correct error rawError and code", () => {
      const fromFetchError = PaymentError.fromFetchError;
      const error = new Response("Not Found", { status: 403, statusText: "oh no something went wrong" });
      const paymentError = fromFetchError({ error, errorType: "PAYMENT" });
      expect(mockTranslations.getText(paymentError.message)).toEqual(mockTranslations.getText("NOT_ALLOWED"));
      expect(paymentError.metadata).toEqual({ code: 403, rawError: "oh no something went wrong" });
    });
    it("Unknown error", () => {
      const fromUnknownError = AppError.fromUnknown;
      const error_1 = new Response("", { status: 400, statusText: "Bad Request" });
      expect(fromUnknownError(error_1).message).toEqual("Bad Request");
      expect(fromUnknownError(error_1)).toBeInstanceOf(AppError);
      const error_2 = new Response("", { status: 400, statusText: "Bad Request" });
      expect(fromUnknownError(error_2, "LOGIN")).toBeInstanceOf(LoginError);
      expect(fromUnknownError(error_2, "LOGIN").message).toEqual("Bad Request");

      const error_3 = new PaymentError("PRODUCT_ALREADY_BOUGHT", { code: 400, rawError: "Bad Request" });
      expect(mockTranslations.getText(fromUnknownError(error_3).message)).toEqual(
        mockTranslations.getText("PRODUCT_ALREADY_BOUGHT")
      );
      expect(fromUnknownError(error_3)).toBeInstanceOf(PaymentError);
      const error_4 = new Error("Bad Request");
      expect(fromUnknownError(error_4, "VOUCHER").category).toEqual("VOUCHER");
      expect(fromUnknownError(error_4, "VOUCHER").message).toEqual("Bad Request");
      expect(fromUnknownError(error_4, "PAYMENT").category).toEqual("PAYMENT");
      expect(fromUnknownError(error_4, "PAYMENT").message).toEqual("Bad Request");
    });
  });
});
