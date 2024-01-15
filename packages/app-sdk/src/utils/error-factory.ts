import { Translations } from "./wl-translations";

export type TCategory = "GENERIC" | "LOGIN" | "VOUCHER" | "PAYMENT";

export interface IErrorMetadata {
  code?: number;
  rawError?: string;
}

export interface IMessageMap {
  [key: string]: string | string[];
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

const genericMsgMap: IMessageMap = {
  "Bad Request": "NOT_ALLOWED",
  Unauthorized: "NOT_ALLOWED",
  Forbidden: "NOT_ALLOWED",
  "Not Found": "NOT_FOUND",
  "Request Timeout": ["LOGIN", "UNKNOWN"],
  Conflict: ["LOGIN", "UNKNOWN"],
  "Unprocessable Content": "UNKNOWN",
  "Too Many Requests": ["LOGIN", "UNKNOWN"],
  "Internal Server Error": "UNKNOWN_ERROR",
  "Bad Gateway": "UNKNOWN_ERROR",
  "Service Unavailable": ["LOGIN", "UNKNOWN"],
  "Gateway Timeout": ["LOGIN", "UNKNOWN"]
};

const voucherMsgMap: IMessageMap = {
  ...genericMsgMap,
  "Not Found": ["ERROR", "VOUCHER", "INVALID_VOUCHER_CODE"]
};

const paymentMsgMap: IMessageMap = {
  ...genericMsgMap,
  Forbidden: ["ERROR", "STORED_PAYMENT_DETAILS"]
};

const genericCodeMap: ICodeMap = {
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

export class GenericError extends Error {
  category: TCategory = "GENERIC";
  metadata: IErrorMetadata;
  messageMap = genericMsgMap;

  constructor(message: string, { code, rawError }: IErrorMetadata) {
    super(message);
    this.metadata = {
      ...(Number.isFinite(code) && { code }),
      ...(rawError && { rawError })
    };
  }

  static fromFetchError({
    error,
    codeMap = genericCodeMap,
    messageMap = genericMsgMap,
    errorType
  }: IFromFetchError): string | string[] {
    const errorCode = error.status;
    const errorMessage = error.statusText;
    if (errorType) {
      switch (errorType) {
        case "PAYMENT":
          messageMap = paymentMsgMap;
          break;
        case "VOUCHER":
          messageMap = voucherMsgMap;
      }
    }
    if (errorCode && codeMap[errorCode]) {
      return messageMap[codeMap[errorCode]];
    } else if (errorMessage && messageMap[errorMessage]) {
      return messageMap[errorMessage];
    } else {
      return "UNKNOWN_ERROR";
    }
  }

  getError(): (string | number | undefined)[] {
    return [this.message, this.metadata.code, this.metadata.rawError];
  }

  getUserErrorMessage(translations: Translations): string {
    return translations.getText("UNKNOWN_ERROR");
  }
}

export class LoginError extends GenericError {
  readonly category: TCategory = "LOGIN";

  getUserErrorMessage(translations: Translations): string {
    switch (this.message) {
      case "INVALID_CREDENTIALS":
      case "BAD_PASSWORD":
        return translations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"]);
      case "MIGRATED_USER":
        return translations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]);
      case "USERNAME_ALREADY_IN_USE":
        return translations.getText("USERNAME_ALREADY_IN_USE");
      default:
        return translations.getText(["ERROR", "LOGIN", "UNKNOWN"]);
    }
  }
}

export class VoucherError extends GenericError {
  readonly category: TCategory = "VOUCHER";

  getUserErrorMessage(translations: Translations): string {
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
  }
}

export class PaymentError extends GenericError {
  readonly category: TCategory = "PAYMENT";

  getUserErrorMessage(translations: Translations): string {
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
        return translations.getText("UNKNOWN_ERROR");
    }
  }
}
