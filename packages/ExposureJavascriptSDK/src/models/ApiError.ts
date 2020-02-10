import { jsonProperty } from "../decorators/json-property";

export enum ErrorContext {
  LOGIN = "LOGIN",
  PAYMENT = "PAYMENT"
}

export interface AppError {
  message: string;
  context?: ErrorContext;
  getFriendlyMessage: () => string;
}

export class ApiError implements AppError {
  @jsonProperty()
  public message: string;
  @jsonProperty()
  public httpCode: number;
  @jsonProperty()
  public context: ErrorContext;
  public getFriendlyMessage = () => this.message;
}
