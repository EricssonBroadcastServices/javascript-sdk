export class ApiError {
  public message: string;
  public httpCode: number;
  constructor(err: any) {
    this.message = err?.message;
    this.httpCode = err?.httpCode;
  }
}
