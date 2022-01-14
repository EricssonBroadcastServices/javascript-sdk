/**
 * @deprecated should be avoided. Errors preferrably be plain error. Any mappings should be done in app.
 */
export class ApiError {
  public message: string;
  public httpCode: number;
  constructor(err: any) {
    this.message = err?.message;
    this.httpCode = err?.httpCode;
  }
}
