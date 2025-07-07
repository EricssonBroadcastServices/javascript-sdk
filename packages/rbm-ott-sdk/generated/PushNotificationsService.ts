/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import { ServiceContext, request } from "./http-client";

/**
 * @summary Get the topics a device is subscribed to.
 * @request GET:/v1/customer/{customer}/businessunit/{businessUnit}/notifications/subscriptions/token/{token}
 * @response `200` `(string)[]` OK
 */
export async function getTopicSubscriptions({
  token,
  headers
}: {
  token: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/notifications/subscriptions/token/${token}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<string[]>);
}

/**
 * @summary Register device token as still active
 * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/notifications/subscriptions/token/{token}
 * @response `200` `void` OK
 */
export async function registerToken({
  token,
  headers
}: {
  token: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/notifications/subscriptions/token/${token}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Subscribe a device to a topic
 * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/notifications/subscriptions/token/{token}/topic/{topic}
 * @response `200` `void` OK
 */
export async function subscribeToTopic({
  token,
  topic,
  headers
}: {
  token: string;
  topic: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/notifications/subscriptions/token/${token}/topic/${topic}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Unsubscribe a device from a topic
 * @request DELETE:/v1/customer/{customer}/businessunit/{businessUnit}/notifications/subscriptions/token/{token}/topic/{topic}
 * @response `200` `void` OK
 */
export async function unsubscribeFromTopic({
  token,
  topic,
  headers
}: {
  token: string;
  topic: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/notifications/subscriptions/token/${token}/topic/${topic}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

export class PushNotificationsService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  getTopicSubscriptions = getTopicSubscriptions;
  registerToken = registerToken;
  subscribeToTopic = subscribeToTopic;
  unsubscribeFromTopic = unsubscribeFromTopic;
}
