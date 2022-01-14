export interface IHeaders {
  [key: string]: string;
}

export interface IResponse<T> {
  data: T;
  status: number;
  headers: IHeaders;
}

export interface IRequestConfig {
  headers?: IHeaders;
}

export interface IRequestError {
  message: string;
  httpCode: number;
  data?: any;
}

export type TErrorMapper = (err: unknown) => IRequestError;

export interface IHttpClient {
  get<T = any, R = IResponse<T>>(url: string, config: IRequestConfig): Promise<R>;
  delete<T = any, R = IResponse<T>>(url: string, config: IRequestConfig): Promise<R>;
  put<T = any, R = IResponse<T>>(url: string, data: any, config: IRequestConfig): Promise<R>;
  post<T = any, R = IResponse<T>>(url: string, data: any, config: IRequestConfig): Promise<R>;
}
