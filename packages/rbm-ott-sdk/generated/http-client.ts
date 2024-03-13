/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

export type UriComponent = string | number | boolean;
export type QueryParams = Record<string, UriComponent | UriComponent[] | undefined>;

export type ServiceContext = {
  baseUrl: string;
  customer: string;
  businessUnit: string;
  errorFactory?: (response: Response) => Error;
};

export type requestArgs = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string | URL;
  headers?: HeadersInit;
  query?: QueryParams;
  body?: Record<string, any>;
  ctx?: ServiceContext;
};

function createSanitizedSearchParams(query: QueryParams = {}): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === "undefined") return;
    if (Array.isArray(val)) {
      (val as string[]).forEach(arrayItem => params.append(key, arrayItem));
    } else {
      params.append(key, val as unknown as string);
    }
  });
  return params;
}

export class ResponseError extends Error {
  public readonly responseBody?: Record<string, any>;
  public readonly response: Response;
  constructor(response: Response, responseBody?: Record<string, any>) {
    super(`HTTP Error: ${response.statusText} (${response.status})`);
    this.responseBody = responseBody;
    this.response = response;
  }
}

async function defaultErrorFactory(response: Response) {
  try {
    const responseBody = await response.json();
    return new ResponseError(response, responseBody);
  } catch {
    return new ResponseError(response);
  }
}

export async function request({ method, url, headers, query = {}, body, ctx }: requestArgs): Promise<Response> {
  const fullUrl: RequestInfo = Object.keys(query).length
    ? `${url}?${createSanitizedSearchParams(query).toString()}`
    : String(url);
  const params = { method, headers };
  if (body) {
    Object.assign(params, { body: JSON.stringify(body) });
  }
  const response = await fetch(fullUrl, params);
  if (!response.ok) {
    throw await (ctx?.errorFactory || defaultErrorFactory)(response);
  }
  return response;
}
