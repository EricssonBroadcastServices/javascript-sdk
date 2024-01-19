import { Translations } from "./wl-translations";

export type TCategory = "APP" | "LOGIN" | "VOUCHER" | "PAYMENT" | string;

export interface IErrorMetadata {
  code?: number;
  rawError?: string;
}

export interface IMessageMap {
  [key: string]: string;
}

export interface ICodeMap {
  [key: number]: string;
}

export interface IFromFetchError {
  error: Response;
  codeMap?: ICodeMap;
  messageMap?: IMessageMap;
  errorType?: TCategory;
}

const appMsgMap: IMessageMap = {
  "Bad Request": "NOT_ALLOWED",
  Unauthorized: "NOT_ALLOWED",
  Forbidden: "NOT_ALLOWED",
  "Not Found": "NOT_FOUND",
  "Request Timeout": "RETRY",
  Conflict: "RETRY",
  "Unprocessable Content": "UNKNOWN",
  "Too Many Requests": "RETRY",
  "Internal Server Error": "UNKNOWN_ERROR",
  "Bad Gateway": "UNKNOWN_ERROR",
  "Service Unavailable": "RETRY",
  "Gateway Timeout": "RETRY"
};

const loginMsgMap: IMessageMap = {
  ...appMsgMap,
  Unauthorized: "INVALID_CREDENTIALS",
  Forbidden: "INVALID_CREDENTIALS"
};

const appCodeMap: ICodeMap = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  408: "Request Timeout",
  409: "Conflict",
  422: "Unprocessable Content",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
};

export class AppError extends Error {
  category: TCategory = "APP";
  metadata: IErrorMetadata;

  constructor(message: string, { code, rawError }: IErrorMetadata) {
    super(message);
    this.metadata = {
      ...(Number.isFinite(code) && { code }),
      ...(rawError && { rawError })
    };
  }

  static fromUnknown(err: unknown): AppError {
    if (err instanceof AppError) return err;
    return new AppError("UNKNOWN_ERROR", {
      rawError: err instanceof Error ? err.message : String(err)
    });
  }

  static fromFetchError({
    error,
    codeMap = appCodeMap,
    messageMap = appMsgMap,
    errorType
  }: IFromFetchError): AppError | LoginError | VoucherError | PaymentError {
    const errorCode = error.status;
    const errorMessage = error.statusText;
    let appError = AppError;
    if (errorType) {
      switch (errorType) {
        case "PAYMENT":
          appError = PaymentError;
          break;
        case "VOUCHER":
          appError = VoucherError;
        case "LOGIN":
          appError = LoginError;
          messageMap = loginMsgMap;
          break;
      }
    }
    if (errorCode && codeMap[errorCode]) {
      return new appError(messageMap[codeMap[errorCode]], {
        code: errorCode,
        rawError: errorMessage
      });
    } else if (errorMessage && messageMap[errorMessage]) {
      return new appError(messageMap[errorMessage], {
        code: errorCode,
        rawError: errorMessage
      });
    } else {
      return new appError("UNKNOWN_ERROR", {
        code: errorCode,
        rawError: errorMessage
      });
    }
  }

  getError(): (string | number | undefined)[] {
    return [this.message, this.metadata.code, this.metadata.rawError];
  }

  getUserErrorMessage(translations: Translations, errorMessage?: string): string {
    const message = errorMessage || this.message;
    return translations.getText(message) || translations.getText("UNKNOWN_ERROR");
  }
}

export class LoginError extends AppError {
  readonly category: TCategory = "LOGIN";

  getUserErrorMessage(translations: Translations, errorMessage?: string): string {
    const message = errorMessage || this.message;
    switch (message) {
      case "INVALID_CREDENTIALS":
      case "BAD_PASSWORD":
        return translations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"]);
      case "MIGRATED_USER":
        return translations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]);
      case "USERNAME_ALREADY_IN_USE":
        return translations.getText("USERNAME_ALREADY_IN_USE");
      default:
        return translations.getText(message) || translations.getText(["ERROR", "LOGIN", "UNKNOWN"]);
    }
  }
}

export class VoucherError extends AppError {
  readonly category: TCategory = "VOUCHER";

  getUserErrorMessage(translations: Translations, errorMessage?: string): string {
    const message = errorMessage || this.message;
    switch (this.metadata.code) {
      case 404:
        return translations.getText(["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"]);
      case 422:
        switch (message) {
          case "CODE_ALREADY_REDEEMED":
            return translations.getText(["ERROR", "VOUCHER", "ALREADY_REDEEMED_VOUCHER_CODE"]);
          case "CODE_EXPIRED":
            return translations.getText(["ERROR", "VOUCHER", "VOUCHER_CODE_EXPIRED"]);
        }
      default:
        return translations.getText(message) || translations.getText("UNKNOWN_ERROR");
    }
  }
}

export class PaymentError extends AppError {
  readonly category: TCategory = "PAYMENT";

  getUserErrorMessage(translations: Translations, errorMessage?: string): string {
    switch (this.metadata.code) {
      case 404:
        return translations.getText("NOT_FOUND");
      case 403:
        switch (this.message) {
          case "STORED_PAYMENT_DETAILS":
            return translations.getText(["ERROR", "STORED_PAYMENT_DETAILS"]);
        }
    }
    const message = errorMessage || this.message;
    switch (message) {
      case "BAD_PASSWORD":
      case "OLD_PASSWORD_IS_NOT_CORRECT":
        return translations.getText("INVALID_CREDENTIALS");
      case "PRODUCT_ALREADY_BOUGHT":
        return translations.getText("PRODUCT_ALREADY_BOUGHT");
      case "NOT_FOUND":
        return translations.getText("NOT_FOUND");
      default:
        return translations.getText(message) || translations.getText("UNKNOWN_ERROR");
    }
  }
}
