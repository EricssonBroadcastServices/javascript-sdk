/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

export type UriComponent = string | number | boolean;
export type QueryParams = Record<string, UriComponent | UriComponent[]>;

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

// Remove undefined values and join array values to comma separated strings
function sanitizeParams(query: QueryParams = {}): Record<string, string> {
  const sanitized = Object.entries(query)
    .filter(([, val]) => typeof val !== "undefined")
    .map(([key, val]) => [key, Array.isArray(val) ? val.join(",") : val]);

  return Object.fromEntries(sanitized);
}

function defaultErrorFactory(response: Response) {
  return new Error(`HTTP Error: ${response.statusText} (${response.status})`);
}

export async function request({ method, url, headers, query = {}, body, ctx }: requestArgs): Promise<Response> {
  const fullUrl = Object.keys(query).length ? `${url}/?${new URLSearchParams(sanitizeParams(query))}` : url;
  const headersObject = new Headers(headers);
  if (!headersObject.has("content-type")) {
    headersObject.set("content-type", "application/json");
  }
  const params = { method, headers };
  if (body) {
    Object.assign(params, { body: JSON.stringify(body) });
  }
  const response = await fetch(fullUrl, params);
  if (!response.ok) {
    throw (ctx?.errorFactory || defaultErrorFactory)(response);
  }
  return response;
}
