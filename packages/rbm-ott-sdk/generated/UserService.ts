/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

import {
  ActivationCodeResponse,
  ChangePasswordResponse,
  ConfirmAccountResponse,
  DeviceRegistration,
  LabelFilter,
  LoginResponse,
  PinCodeResponse,
  UserDetailsResponse,
  UserProfiles,
  UserSelfServiceCreateResponse
} from "./data-contracts";
import { ServiceContext, request } from "./http-client";

/**
 * @summary Add a user profile.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @response `200` `UserProfiles` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_OWNER. Only the owner may create profiles.
 */
export async function addProfile({
  headers,
  ..._data
}: {
  /** Name. */
  displayName: string;
  /** True if user is a child. */
  child?: boolean;
  /** Application defined value. Can be used e.g. to carry mapping to parental rating configuration. */
  profileType?: string;
  /** A key value object */
  metadata?: object;
  /** Preferred language. */
  language?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<UserProfiles>);
}

/**
 * @summary Change email address that is not used as username.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmail
 * @response `400` `void` EMAIL_ADDRESS_USED_AS_USERNAME. The user uses email as username, consider using the changeEmailAndUsername endpoint.
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. Entered password is not correct.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER NOT_ALLOWED_IN_ANONYMOUS_SESSION. EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_EMAIL_ADDRESS. The new email address is malformed.
 */
export async function changeEmail({
  headers,
  ..._data
}: {
  /** The new email address */
  newEmailAddress?: string;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmail`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @summary Change email address and username.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmailAndUsername
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. Entered password is not correct.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER NOT_ALLOWED_IN_ANONYMOUS_SESSION. EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_EMAIL_ADDRESS. The new email address is malformed.
 */
export async function changeEmailAndUsername({
  headers,
  ..._data
}: {
  /** Current Password. */
  password: string;
  /** The new email address and user name */
  newEmailAddressAndUsername?: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmailAndUsername`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @summary Change password.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changePassword
 * @response `200` `ChangePasswordResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER OLD_PASSWORD_IS_NOT_CORRECT, the old password is not correct. NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_PASSWORD. The new password is non-compliant to policy
 */
export async function changePassword({
  headers,
  ..._data
}: {
  /** New Password. */
  newPassword: string;
  /** Old Password. */
  oldPassword: string;
  device: DeviceRegistration;
  /**
   * true: All existing sessions will be cleared
   * false : other devices' sessions are still valid
   */
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
 * @description The code can then be consumed to yield a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Confirms an activation code.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/activation/confirm/{code}
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 * @response `404` `void` NOT_FOUND. The code is not found or has expired.
 */
export async function confirmActivationCode({
  code,
  headers
}: {
  /** Activation code to confirm, 6 characters drawn from set 123456789ABCDEF as received from create end-point. */
  code: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/activation/confirm/${code}`,
    headers: new Headers({ ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @description Used if account was created with password. If the body is present with a devivceID in the deviceRegistration, the user will be logged in.
 * @summary Confirms a created user.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/signup/confirm/{token}
 * @response `200` `ConfirmAccountResponse` success
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 * @response `404` `void` NOT_FOUND. If the token is not found or is expired.
 */
export async function confirmUserWithToken({
  token,
  headers,
  ..._data
}: {
  /** Token received out of band, e.g by mail */
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
 * @description The code must have been confirmed in a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Consumes an activation code and returns a valid session.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/consume
 * @response `default` `LoginResponse` success
 */
export async function consumeActivationCode({
  headers,
  ..._data
}: {
  /** 6 characters drawn from set 123456789ABCDEF as received from create end-point. */
  activationCode: string;
  device: DeviceRegistration;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/consume`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @description The code is to be confirmed in a valid session. After this it can be consumed. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Creates an activation code.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/activationCode
 * @response `default` `ActivationCodeResponse` success
 */
export async function createActivationCode({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/activationCode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<ActivationCodeResponse>);
}

/**
 * @description If unConfirmed == true, then the user will receive an email with a confirmation link. Else if unConfirmed == false the user is logged in and session details are in the response.
 * @summary Signup to the service.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup
 * @response `200` `UserSelfServiceCreateResponse` success
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved.
 * @response `422` `void` EMAIL_OR_MOBILE_REQUIRED. EmailAddress must be supplied. BAD_EMAIL_ADDRESS. The email address is malformed.
 */
export async function createNewAccount({
  headers,
  ..._data
}: {
  /** Name used e.g. as email display name */
  displayName: string;
  /** Password. */
  password: string;
  device: DeviceRegistration;
  /**
   * Used for e.g. password reset mails
   * Maybe required depending on customer settings
   * EmailAddress must be provided
   */
  emailAddress?: string;
  /**
   * Preferred language. If not set fall back to business unit's default language
   * Valid iso 639-1 language code
   */
  language?: string;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now.
   */
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
  }).then(response => response.json() as Promise<UserSelfServiceCreateResponse>);
}

/**
 * @description The id will be generated. If yoy want to specify the id, then instead create the code using the Update end point.
 * @summary Create a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function createPinCode({
  headers,
  ..._data
}: {
  /** PIN in clear text. */
  inClear: string;
  /** List of application specified grants returned if PIN is successfully validated. */
  grants: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @summary Delete a pin code.
 * @request DELETE:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function deletePinCode({
  pincodeId,
  headers
}: {
  /** the id of the pin to delete. */
  pincodeId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
    headers: new Headers({ ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @summary Delete personal data.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/delete
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. The provided password is faulty.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION STORED_PAYMENT_DETAILS, the account cannot be deleted as there are stored payment details for the account. OWNER_OF_ACCOUNT_WITH_NON_OWNER_USER, this user can not be deleted as there are other non-owners in the account. NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION. NOT_SUPPORTED_FOR_FEDERATED_USER
 */
export async function deleteUserDetails({
  headers,
  ..._data
}: {
  password: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/delete`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @description It's not allowed to delete the profile used in the current session.
 * @summary Delete a user profile.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION DELETE_CURRENT_PROFILE_NOT_ALLOWED NOT_OWNER. Only the owner may delete profiles.
 */
export async function deleteUserProfile({
  userId,
  headers
}: {
  /** user id of profile to delete */
  userId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "DELETE",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`,
    headers: new Headers({ ...Object.fromEntries(new Headers(headers)) }),
    ctx
  });
}

/**
 * @description This can be used in special applications to e.g. get appropriate product offerings.
 * @summary Get current accounts labelFilter.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/label/filter
 * @response `default` `LabelFilter` success
 */
export async function getAccountLabels({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/label/filter`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<LabelFilter>);
}

/**
 * @summary Get pin codes.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function getPinCodes({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @summary Get user profiles.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @response `200` `UserProfiles` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 */
export async function getProfiles({
  headers
}: {
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<UserProfiles>);
}

/**
 * @summary Get user details.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @response `200` `UserDetailsResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 * @response `404` `void` NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here
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
 * @description Attributes NOT in the provided list will be untouched.
 * @summary Update provided user attributes.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/attributes
 * @response `200` `UserDetailsResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` EMAIL_ADDRESS_NOT_APPROVED. An email address is not approved. NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_EMAIL_ADDRESS. An email address is malformed.
 */
export async function putUserAttributes({
  headers,
  ..._data
}: {
  list: {
    /** id of the attribute */
    attributeId: string;
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
 * @description .Will send a token out of band, which can be used to set a new password.
 * @summary Request reset user's password.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/password/reset/{username}
 * @response `default` `void` success
 */
export async function resetPassword({
  username,
  headers
}: {
  /** Username of user */
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
 * @description The current session token will be replaced.
 * @summary Select a user profile.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}/select
 * @response `200` `LoginResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 */
export async function selectUserProfile({
  userId,
  headers
}: {
  /** user id of profile to select */
  userId: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "GET",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}/select`,
    headers: new Headers({ accept: "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx
  }).then(response => response.json() as Promise<LoginResponse>);
}

/**
 * @description Sets the users password using a token received at signup (without password) or password reset
 * @summary Set password.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}
 * @response `404` `void` NOT_FOUND. If the token is not found or is expired.
 * @response `422` `void` BAD_PASSWORD. The password does not comply to the password policy.
 */
export async function setPasswordWithToken({
  token,
  headers,
  ..._data
}: {
  /** Token received out of band, e.g by mail */
  token: string;
  /** Password. */
  password: string;
  /**
   * If TRUE consent to information collection is given now
   * If FALSE or null no consent given now. Which is fine if consent is not required or already given
   */
  informationCollectionConsentGivenNow?: boolean;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup/password/${token}`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @summary Update (or Create) a pin code.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function setPinCode({
  pincodeId,
  headers,
  ..._data
}: {
  /** the id of the pin to update or if non-exiting to be created. */
  pincodeId: string;
  /** PIN in clear text. */
  inClear: string;
  /** List of application specified grants returned if PIN is successfully validated. */
  grants: string[];
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<PinCodeResponse[]>);
}

/**
 * @summary Update user details.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here
 * @response `422` `void` BAD_PASSWORD. The new password is non-compliant to policy
 */
export async function updateUserDetails({
  headers,
  ..._data
}: {
  /**
   * Name used e.g. as email display name, null if not changed.
   * If value is not provided any existing value is unchanged.
   */
  displayName?: string;
  /**
   * Preferred language.
   * If value is not provided any existing value is unchanged.
   */
  language?: string;
  /** True if user is a child. */
  child?: boolean;
  /**
   * Application defined value. Can be used e.g. to carry mapping to parental rating configuration.
   * If value is not provided any existing value is unchanged.
   */
  profileType?: string;
  /** A key value object */
  metadata?: object;
  /** Optional headers */
  headers?: HeadersInit;
} = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/details`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @summary Update user profile.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here NOT_OWNER. Only the owner may update profiles.
 */
export async function updateUserProfile({
  userId,
  headers,
  ..._data
}: {
  /** user id of profile to update */
  userId: string;
  /**
   * Name used e.g. as email display name, null if not changed.
   * If value is not provided any existing value is unchanged.
   */
  displayName?: string;
  /**
   * Preferred language.
   * If value is not provided any existing value is unchanged.
   */
  language?: string;
  /** True if user is a child. */
  child?: boolean;
  /**
   * Application defined value. Can be used e.g. to carry mapping to parental rating configuration.
   * If value is not provided any existing value is unchanged.
   */
  profileType?: string;
  /** A key value object */
  metadata?: object;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "PUT",
    url: `${ctx.baseUrl}/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`,
    headers: new Headers({ "content-type": "application/json", ...Object.fromEntries(new Headers(headers)) }),
    ctx,
    body: _data
  });
}

/**
 * @description Returns a list of application specified grants if successfully validated, else an empty list [].
 * @summary Validate a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}/validate
 * @response `200` `(string)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function validatePinCode({
  pincodeId,
  headers,
  ..._data
}: {
  /** the id of the pin to delete. */
  pincodeId: string;
  /** PIN in clear text to validate. */
  inClear: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}/validate`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string[]>);
}

/**
 * @description The provided code is matched with all defined pin codes. Returns a list of application specified grants of all successfully validated pin codes, if no one matches an empty list [] is returned.
 * @summary Validate all pin codes.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/validate
 * @response `200` `(string)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function validatePinCodes({
  headers,
  ..._data
}: {
  /** PIN in clear text to validate. */
  inClear: string;
  /** Optional headers */
  headers?: HeadersInit;
}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request({
    method: "POST",
    url: `${ctx.baseUrl}/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/validate`,
    headers: new Headers({
      accept: "application/json",
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(headers))
    }),
    ctx,
    body: _data
  }).then(response => response.json() as Promise<string[]>);
}

export class UserService {
  // @ts-ignore
  constructor(private context: ServiceContext) {}
  addProfile = addProfile;
  changeEmail = changeEmail;
  changeEmailAndUsername = changeEmailAndUsername;
  changePassword = changePassword;
  confirmActivationCode = confirmActivationCode;
  confirmUserWithToken = confirmUserWithToken;
  consumeActivationCode = consumeActivationCode;
  createActivationCode = createActivationCode;
  createNewAccount = createNewAccount;
  createPinCode = createPinCode;
  deletePinCode = deletePinCode;
  deleteUserDetails = deleteUserDetails;
  deleteUserProfile = deleteUserProfile;
  getAccountLabels = getAccountLabels;
  getPinCodes = getPinCodes;
  getProfiles = getProfiles;
  getUserDetails = getUserDetails;
  putUserAttributes = putUserAttributes;
  resetPassword = resetPassword;
  selectUserProfile = selectUserProfile;
  setPasswordWithToken = setPasswordWithToken;
  setPinCode = setPinCode;
  updateUserDetails = updateUserDetails;
  updateUserProfile = updateUserProfile;
  validatePinCode = validatePinCode;
  validatePinCodes = validatePinCodes;
}
