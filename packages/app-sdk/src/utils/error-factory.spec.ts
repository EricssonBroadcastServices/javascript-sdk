import { englishTranslations } from "../../test-utils/mock-translations";
import { GenericError, PaymentError, LoginError, VoucherError } from "./error-factory";
import { Translations } from "./wl-translations";

const mockTranslations = new Translations(englishTranslations);

describe("error translator", () => {
  describe("Should return proper error message", () => {
    it("Generic error", () => {
      const error = new GenericError("UNKNOWN_ERROR", mockTranslations, { code: 500 });
      expect(error.getError()).toEqual([mockTranslations.getText("UNKNOWN_ERROR"), "UNKNOWN_ERROR", 500]);
      expect(error.toString()).toEqual(
        `GENERIC Error: ${mockTranslations.getText("UNKNOWN_ERROR")} {UNKNOWN_ERROR} {500}`
      );
    });
    it("Payment error", () => {
      const error = new PaymentError("PRODUCT_ALREADY_BOUGHT", mockTranslations, { code: 400 });
      expect(error.getError()).toEqual([
        mockTranslations.getText("PRODUCT_ALREADY_BOUGHT"),
        "PRODUCT_ALREADY_BOUGHT",
        400
      ]);
      expect(error.toString()).toEqual(
        `PAYMENT Error: ${mockTranslations.getText("PRODUCT_ALREADY_BOUGHT")} {PRODUCT_ALREADY_BOUGHT} {400}`
      );
      error.message = "NOT_FOUND";
      expect(error.getError()).toEqual([mockTranslations.getText("NOT_FOUND"), "NOT_FOUND", 400]);
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getError()).toEqual([mockTranslations.getText("UNKNOWN_ERROR"), "NOT_A_REAL_MESSAGE", 400]);
      error.message = "BAD_PASSWORD";
      expect(error.getError()).toEqual([mockTranslations.getText("INVALID_CREDENTIALS"), "BAD_PASSWORD", 400]);
      error.message = "NOT_FOUND";
      error.metadata.code = 404;
      expect(error.getError()).toEqual([mockTranslations.getText("NOT_FOUND"), "NOT_FOUND", 404]);
      error.message = "STORED_PAYMENT_DETAILS";
      error.metadata.code = 403;
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "STORED_PAYMENT_DETAILS"]),
        "STORED_PAYMENT_DETAILS",
        403
      ]);
    });
    it("Login error", () => {
      const error = new LoginError("INVALID_CREDENTIALS", mockTranslations, { code: 400 });
      expect(error.getError()).toEqual([mockTranslations.getText("INVALID_CREDENTIALS"), "INVALID_CREDENTIALS", 400]);
      expect(error.toString()).toEqual(
        `LOGIN Error: ${mockTranslations.getText("INVALID_CREDENTIALS")} {INVALID_CREDENTIALS} {400}`
      );
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "LOGIN", "UNKNOWN"]),
        "NOT_A_REAL_MESSAGE",
        400
      ]);
      error.message = "MIGRATED_USER";
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]),
        "MIGRATED_USER",
        400
      ]);
      error.message = "USERNAME_ALREADY_IN_USE";
      expect(error.getError()).toEqual([
        mockTranslations.getText("USERNAME_ALREADY_IN_USE"),
        "USERNAME_ALREADY_IN_USE",
        400
      ]);
    });
    it("Voucher Error", () => {
      const error = new VoucherError("INVALID_VOUCHER_CODE", mockTranslations, { code: 404 });
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"]),
        "INVALID_VOUCHER_CODE",
        404
      ]);
      expect(error.toString()).toEqual(
        `VOUCHER Error: ${mockTranslations.getText([
          "ERROR",
          "VOUCHER",
          "INVALID_VOUCHER_CODE"
        ])} {INVALID_VOUCHER_CODE} {404}`
      );
      error.message = "CODE_ALREADY_REDEEMED";
      error.metadata.code = 422;
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "VOUCHER", "ALREADY_REDEEMED_VOUCHER_CODE"]),
        "CODE_ALREADY_REDEEMED",
        422
      ]);
      error.message = "CODE_EXPIRED";
      error.metadata.code = 422;
      expect(error.getError()).toEqual([
        mockTranslations.getText(["ERROR", "VOUCHER", "VOUCHER_CODE_EXPIRED"]),
        "CODE_EXPIRED",
        422
      ]);
      error.message = "NOT_A_REAL_MESSAGE";
      expect(error.getError()).toEqual([mockTranslations.getText("UNKNOWN_ERROR"), "NOT_A_REAL_MESSAGE", 422]);
    });
  });
});
