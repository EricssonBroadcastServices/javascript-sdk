/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  ChangePasswordResponse,
  ConfirmAccountResponse,
  DeviceRegistration,
  UserDetailsResponse,
  UserSignupResponse
} from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @description Change email address that is not used as username.
 * @summary Change email address.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmail
 * @response `200` `void` OK
 */
export async function changeEmail({
  headers,
  ..._data
}: {
  /** The user's new email address. */
  newEmailAddress?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmail`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

/**
 * @description Change email address that is also used as username.
 * @summary Change email address and username.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmailAndUsername
 * @response `200` `void` OK
 */
export async function changeEmail_({
  headers,
  ..._data
}: {
  /** The user's password. It is used to protecty from accidential or malicious account hi-jacking. */
  password: string;
  /** The user's new email address. It lill also replace the old username. */
  newEmailAddressAndUsername: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmailAndUsername`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

/**
 * @summary Change password.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changePassword
 * @response `200` `ChangePasswordResponse` OK
 */
export async function changePassword({
  headers,
  ..._data
}: {
  /** The user's new password. Must follow the system's configured policy. */
  newPassword: string;
  /** The user's old password. */
  oldPassword: string;
  device: DeviceRegistration;
  /** If true the user, including any of the account's profiles, will be logged out from all devices. */
  logoutOnAllDevices?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changePassword`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<ChangePasswordResponse>);
}

/**
 * @description If the body is present with a deviceRegistration, the user will be logged in.
 * @summary Confirms a created user.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/signup/confirm/{token}
 * @response `200` `ConfirmAccountResponse` OK
 */
export async function confirmUserWithToken({
  token,
  headers,
  ..._data
}: {
  token: string;
  deviceRegistration?: DeviceRegistration;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup/confirm/${token}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<ConfirmAccountResponse>);
}

/**
 * @description The account will be anonymonized and not be possible to use.
 * @summary Delete personal data.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/delete
 * @response `200` `void` OK
 */
export async function deleteDetails({
  headers,
  ..._data
}: {
  /**
   * Value is ignored.
   *  * @deprecated
   */
  password?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/delete`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

/**
 * @summary Get user details.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @response `200` `UserDetailsResponse` OK
 */
export async function getUserDetails({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/details`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<UserDetailsResponse>);
}

/**
 * @description Will send a reset link in a email to the user's email address. Will always succeed even if the username is not found
 * @summary Request a reset of the user's password.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/password/reset/{username}
 * @response `200` `void` OK
 */
export async function resetPassword({
  username,
  headers
}: {
  username: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/password/reset/${username}`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @description Attributes NOT in the provided list will be untouched
 * @summary Set user attributes.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/attributes
 * @response `200` `UserDetailsResponse` OK
 */
export async function setAttributes({
  headers,
  ..._data
}: {
  list: {
    /** attributeId */
    attributeId: string;
    /** New value, null -> use default. */
    value?: object;
  }[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/attributes`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data.list
  }).then(response => response.json() as Promise<UserDetailsResponse>);
}

/**
 * @description Sets the users password using a token received at invitation signup (without password) or password reset
 * @summary Set password.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}
 * @response `200` `void` OK
 */
export async function setPassword({
  token,
  headers,
  ..._data
}: {
  token: string;
  /** The user's new, or first password. Must follow the system's configured policy. */
  password: string;
  /** If true consent to information collection is given now. If false or null no consent given now. */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup/password/${token}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  });
}

/**
 * @description If unConfirmed == true, then the user will receive an email with a confirmation link. Else if unConfirmed == false the user is logged in and session details are in the responseSets the users password using a token received at invitation signup (without password) or password reset
 * @summary Signup.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup
 * @response `200` `UserSignupResponse` OK
 */
export async function signup({
  headers,
  ..._data
}: {
  /** The user's real name. */
  displayName: string;
  /** The user's email address. Will also be used as username. */
  emailAddress: string;
  /** The user's password. Must follow the system's configured policy. */
  password: string;
  device: DeviceRegistration;
  /** Preferred language. If not set fall back to business unit's default language. iso 639-1 language code. */
  language?: string;
  /** If true consent to information collection is given now. If false or null no consent given now. */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<UserSignupResponse>);
}

/**
 * @summary Update user details.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @response `200` `UserDetailsResponse` OK
 */
export async function updateUserDetails({
  headers,
  ..._data
}: {
  /** Name used e.g. as email display name, null if not changed */
  displayName?: string;
  /** Preferred language, null if not changed. */
  language?: string;
  /** True if user is a child. */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration, null if not changed */
  profileType?: string;
  /** Application defined map String->String. Can be used for arbitrary application specific data, null if not changed */
  metadata?: Record<string, string>;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/details`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<UserDetailsResponse>);
}

export class UserService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  changeEmail = changeEmail;
  changeEmail_ = changeEmail_;
  changePassword = changePassword;
  confirmUserWithToken = confirmUserWithToken;
  deleteDetails = deleteDetails;
  getUserDetails = getUserDetails;
  resetPassword = resetPassword;
  setAttributes = setAttributes;
  setPassword = setPassword;
  signup = signup;
  updateUserDetails = updateUserDetails;
}
