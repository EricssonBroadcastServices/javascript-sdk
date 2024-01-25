import { ResponseError } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { Translations } from "./wl-translations";

export type TErrorType = "APP" | "LOGIN" | "VOUCHER" | "PAYMENT";

export interface IErrorMetadata {
  code?: number;
  rawError?: string;
  errorType?: TErrorType;
}

export interface IFromResponseError {
  error: ResponseError;
  errorType?: TErrorType;
}

export class AppError extends Error {
  errorType: TErrorType = "APP";
  metadata: IErrorMetadata;

  constructor(message: string, { code, rawError, errorType }: IErrorMetadata) {
    super(message);
    if (errorType) {
      this.errorType = errorType;
    }

    this.metadata = {
      ...(Number.isFinite(code) && { code }),
      ...(rawError && { rawError })
    };
  }

  static fromUnknown(error: unknown, errorType?: TErrorType): AppError {
    if (error instanceof AppError) return error;
    let message = "UNKNOWN_ERROR";
    if (error instanceof ResponseError) {
      if (error.response && error.responseBody) {
        return AppError.fromResponseError({ error: error, errorType });
      }
      message = error.message;
    }
    const rawError = error instanceof Error ? error.stack || error.message : String(error);
    switch (errorType) {
      default:
        return new AppError(message, { rawError });
    }
  }

  static fromResponseError({ error, errorType }: IFromResponseError): AppError {
    const errorCode = error.responseBody?.httpCode || error.response.status;
    const errorMessage = error.responseBody?.message || error.response.statusText;
    return new AppError(errorMessage, {
      code: errorCode,
      rawError: error.toString(),
      errorType
    });
  }

  getError(): (string | number | undefined)[] {
    return [this.message, this.metadata.code, this.metadata.rawError];
  }

  getUserErrorMessage(translations: Translations): string {
    switch (this.errorType) {
      case "VOUCHER":
        switch (this.metadata.code) {
          case 404:
            return translations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"]);
          case 422:
            switch (this.message) {
              case "CODE_ALREADY_REDEEMED":
                return translations.getText(["ERROR", "VOUCHER", "ALREADY_REDEEMED_VOUCHER_CODE"]);
              case "CODE_EXPIRED":
                return translations.getText(["ERROR", "VOUCHER", "VOUCHER_CODE_EXPIRED"]);
            }
          default:
            return translations.getText("UNKNOWN_ERROR");
        }
      case "LOGIN":
        switch (this.message) {
          case "INCORRECT_CREDENTIALS":
          case "BAD_PASSWORD":
            return translations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"]);
          case "MIGRATED_USER":
            return translations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]);
          case "USERNAME_ALREADY_IN_USE":
            return translations.getText("USERNAME_ALREADY_IN_USE");
          default:
            return translations.getText(["ERROR", "LOGIN", "UNKNOWN"]);
        }
      default:
        switch (this.metadata.code) {
          case 404:
            return translations.getText("NOT_FOUND");
          case 403:
            switch (this.message) {
              case "STORED_PAYMENT_DETAILS":
                return translations.getText(["ERROR", "STORED_PAYMENT_DETAILS"]);
            }
        }
        switch (this.message) {
          case "BAD_PASSWORD":
          case "OLD_PASSWORD_IS_NOT_CORRECT":
            return translations.getText("INVALID_CREDENTIALS");
          case "PRODUCT_ALREADY_BOUGHT":
            return translations.getText("PRODUCT_ALREADY_BOUGHT");
          case "NOT_FOUND":
            return translations.getText("NOT_FOUND");
          default:
            return translations.getText(this.message) !== ""
              ? translations.getText(this.message)
              : translations.getText("UNKNOWN_ERROR");
        }
    }
  }
}
