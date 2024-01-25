// import { ResponseError } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResponseError } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { englishTranslations } from "../../test-utils/mock-translations";
import { AppError } from "./error-factory";
import { Translations } from "./wl-translations";

const mockTranslations = new Translations(englishTranslations);

describe("Error translator factory", () => {
  describe("Should return proper user error message for", () => {
    it("should return reasonable error messages", () => {
      expect(new AppError("PRODUCT_ALREADY_BOUGHT", { code: 123 }).getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText("PRODUCT_ALREADY_BOUGHT")
      );
      expect(new AppError("NOT_A_REAL_MESSAGE", { code: 123 }).getUserErrorMessage(mockTranslations)).toEqual(
        mockTranslations.getText("UNKNOWN_ERROR")
      );
      expect(
        new AppError("INCORRECT_CREDENTIALS", { code: 123, errorType: "LOGIN" }).getUserErrorMessage(mockTranslations)
      ).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));
      expect(
        new AppError("BAD_PASSWORD", { code: 123, errorType: "LOGIN" }).getUserErrorMessage(mockTranslations)
      ).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));

      expect(
        new AppError("NOT_A_REAL_MESSAGE", { code: 123, errorType: "LOGIN" }).getUserErrorMessage(mockTranslations)
      ).toEqual(mockTranslations.getText(["ERROR", "LOGIN", "UNKNOWN"]));
    });

    it("Generic app error", () => {
      const error = new AppError("UNKNOWN_ERROR", { code: 500, rawError: "Internal Server Error" });
      expect(error.errorType).toEqual("APP");
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("UNKNOWN_ERROR"));
      expect(error.getError()).toEqual(["UNKNOWN_ERROR", 500, "Internal Server Error"]);
      expect(error.metadata).toEqual({ code: 500, rawError: "Internal Server Error" });
    });

    it("fromResponseError", () => {
      const error = AppError.fromResponseError({
        error: new ResponseError(new Response("", { status: 401 }), {
          message: "INCORRECT_CREDENTIALS",
          httpCode: 401
        }),
        errorType: "LOGIN"
      });
      expect(error.getUserErrorMessage(mockTranslations)).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));
    });

    it("fromUnknown", () => {
      expect(
        AppError.fromUnknown(
          new ResponseError(new Response("", { status: 401 }), {
            message: "INCORRECT_CREDENTIALS",
            httpCode: 401
          }),
          "LOGIN"
        ).getUserErrorMessage(mockTranslations)
      ).toEqual(mockTranslations.getText("INVALID_CREDENTIALS"));
    });
  });
});
