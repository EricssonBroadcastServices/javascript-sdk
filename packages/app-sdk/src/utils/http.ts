import { request } from "@ericssonbroadcastservices/rbm-ott-sdk";

type WhiteLabelServiceGetMethodParams = Omit<Parameters<typeof request>[0], "method">;

export async function get<T>({ url, query, headers }: WhiteLabelServiceGetMethodParams): Promise<T> {
  return request({ method: "GET", url, query, headers }).then(response => response.json());
}
