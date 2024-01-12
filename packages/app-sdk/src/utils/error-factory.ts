import { Translations } from "./wl-translations";

interface IErrorMetadata {
  code?: number;
  rawError?: string;
}

export class GenericError extends Error {
  category = "GENERIC";
  translations: Translations;
  metadata: IErrorMetadata;

  constructor(message: string, translations: Translations, { code, rawError }: IErrorMetadata) {
    super(message);
    this.translations = translations;
    this.metadata = {
      ...(Number.isFinite(code) && { code }),
      ...(rawError && { rawError })
    };
  }

  toString() {
    return `${this.category} Error: ${this.mapError()} {${this.message}} {${this.metadata.code}}`;
  }

  getError() {
    return [this.mapError(), this.message, this.metadata.code, this.metadata.rawError];
  }

  mapError() {
    return this.translations.getText("UNKNOWN_ERROR");
  }
}

export class LoginError extends GenericError {
  readonly category = "LOGIN";

  mapError() {
    switch (this.message) {
      case "INVALID_CREDENTIALS":
      case "BAD_PASSWORD":
        return this.translations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"]);
      case "MIGRATED_USER":
        return this.translations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]);
      case "USERNAME_ALREADY_IN_USE":
        return this.translations.getText("USERNAME_ALREADY_IN_USE");
      default:
        return this.translations.getText(["ERROR", "LOGIN", "UNKNOWN"]);
    }
  }
}

export class VoucherError extends GenericError {
  readonly category = "VOUCHER";

  mapError() {
    switch (this.metadata.code) {
      case 404:
        return this.translations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"]);
      case 422:
        switch (this.message) {
          case "CODE_ALREADY_REDEEMED":
            return this.translations.getText(["ERROR", "VOUCHER", "ALREADY_REDEEMED_VOUCHER_CODE"]);
          case "CODE_EXPIRED":
            return this.translations.getText(["ERROR", "VOUCHER", "VOUCHER_CODE_EXPIRED"]);
        }
      default:
        return this.translations.getText("UNKNOWN_ERROR");
    }
  }
}

export class PaymentError extends GenericError {
  readonly category = "PAYMENT";

  mapError() {
    switch (this.metadata.code) {
      case 404:
        return this.translations.getText("NOT_FOUND");
      case 403:
        switch (this.message) {
          case "STORED_PAYMENT_DETAILS":
            return this.translations.getText(["ERROR", "STORED_PAYMENT_DETAILS"]);
        }
    }

    switch (this.message) {
      case "BAD_PASSWORD":
      case "OLD_PASSWORD_IS_NOT_CORRECT":
        return this.translations.getText("INVALID_CREDENTIALS");
      case "PRODUCT_ALREADY_BOUGHT":
        return this.translations.getText("PRODUCT_ALREADY_BOUGHT");
      case "NOT_FOUND":
        return this.translations.getText("NOT_FOUND");
      default:
        return this.translations.getText("UNKNOWN_ERROR");
    }
  }
}
