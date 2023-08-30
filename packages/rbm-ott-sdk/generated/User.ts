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
  ActivationRequestV2,
  ChangeEmailAndUserNameV3,
  ChangeEmailRequestV3,
  ChangePasswordResponse,
  ChangePwdV3,
  ConfirmAccountData,
  ConfirmAccountResponse,
  CredentialsV3,
  LabelFilter,
  LoginResponse,
  PinCodeResponse,
  PinCodeSetRequest,
  PinCodeValidationRequest,
  SetPwdWithTokenV3,
  UserAttributeRequest,
  UserDetailsResponse,
  UserDetailsUpdateRequest,
  UserProfileCreateRequest,
  UserProfiles,
  UserSelfServiceCreateResponse,
  UserSelfServiceCreateWithVoucherRequestV2,
  UserSignupRequestV3
} from "./data-contracts";
import { RequestParams, ServiceContext, request } from "./http-client";

/**
 * @summary Add a user profile.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @secure
 * @response `200` `UserProfiles` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_OWNER. Only the owner may create profiles.
 */
export async function addProfile(data: UserProfileCreateRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserProfiles>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @summary Change email address that is not used as username.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmail
 * @secure
 * @response `400` `void` EMAIL_ADDRESS_USED_AS_USERNAME. The user uses email as username, consider using the changeEmailAndUsername endpoint.
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. Entered password is not correct.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER NOT_ALLOWED_IN_ANONYMOUS_SESSION. EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_EMAIL_ADDRESS. The new email address is malformed.
 */
export async function changeEmail(data: ChangeEmailRequestV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmail`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @summary Change email address and username.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changeEmailAndUsername
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. Entered password is not correct.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER NOT_ALLOWED_IN_ANONYMOUS_SESSION. EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_EMAIL_ADDRESS. The new email address is malformed.
 */
export async function changeEmailAndUsername(data: ChangeEmailAndUserNameV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changeEmailAndUsername`,
      ctx.baseUrl
    ),
    headers,
    body: data
  });
}
/**
 * @summary Change password.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/changePassword
 * @secure
 * @response `200` `ChangePasswordResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER OLD_PASSWORD_IS_NOT_CORRECT, the old password is not correct. NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 * @response `422` `void` BAD_PASSWORD. The new password is non-compliant to policy
 */
export async function changePassword(data: ChangePwdV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ChangePasswordResponse>({
    method: "PUT",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/changePassword`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description The code can then be consumed to yield a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Confirms an activation code.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/activation/confirm/{code}
 * @secure
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 * @response `404` `void` NOT_FOUND. The code is not found or has expired.
 */
export async function confirmActivationCode(
  /** Activation code to confirm, 6 characters drawn from set 123456789ABCDEF as received from create end-point. */
  code: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/activation/confirm/${code}`,
      ctx.baseUrl
    ),
    headers
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
export async function confirmUserWithToken(
  /** Token received out of band, e.g by mail */
  token: string,
  data: ConfirmAccountData,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ConfirmAccountResponse>({
    method: "PUT",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup/confirm/${token}`,
      ctx.baseUrl
    ),
    headers,
    body: data
  });
}
/**
 * @description The code must have been confirmed in a valid session. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Consumes an activation code and returns a valid session.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/consume
 * @response `default` `LoginResponse` success
 */
export async function consumeActivationCode(data: ActivationRequestV2, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/consume`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description The code is to be confirmed in a valid session. After this it can be consumed. This is intended for devices like AppleTV and SmartTVs in which entering credentials is cumbersome. This end point requires the "EH" subscriber management feature.
 * @summary Creates an activation code.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/userActivation/activationCode
 * @response `default` `ActivationCodeResponse` success
 */
export async function createActivationCode(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<ActivationCodeResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/userActivation/activationCode`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @description Else if unConfirmed == false the user is logged in and session details are in the response.
 * @summary If unConfirmed == true, then the user will receive an email with a confirmation link.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup
 * @response `200` `UserSelfServiceCreateResponse` success
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved.
 * @response `422` `void` EMAIL_OR_MOBILE_REQUIRED. EmailAddress must be supplied. BAD_EMAIL_ADDRESS. The email address is malformed.
 */
export async function createNewAccount(data: UserSignupRequestV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserSelfServiceCreateResponse>({
    method: "POST",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description The id will be generated. If yoy want to specify the id, then instead create the code using the Update end point.
 * @summary Create a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @secure
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function createPinCode(data: PinCodeSetRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<PinCodeResponse[]>({
    method: "POST",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @summary Delete a pin code.
 * @request DELETE:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function deletePinCode(
  /** the id of the pin to delete. */
  pincodeId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "DELETE",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary Delete personal data.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/delete
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired. BAD_PASSWORD. The provided password is faulty.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION STORED_PAYMENT_DETAILS, the account cannot be deleted as there are stored payment details for the account. OWNER_OF_ACCOUNT_WITH_NON_OWNER_USER, this user can not be deleted as there are other non-owners in the account. NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION. NOT_SUPPORTED_FOR_FEDERATED_USER
 */
export async function deleteUserDetails(data: CredentialsV3, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "POST",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/delete`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description It's not allowed to delete the profile used in the current session.
 * @summary Delete a user profile.
 * @request DELETE:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION DELETE_CURRENT_PROFILE_NOT_ALLOWED NOT_OWNER. Only the owner may delete profiles.
 */
export async function deleteUserProfile(
  /** user id of profile to delete */
  userId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "DELETE",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`, ctx.baseUrl),
    headers
  });
}
/**
 * @description This can be used in special applications to e.g. get appropriate product offerings.
 * @summary Get current accounts labelFilter.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/label/filter
 * @secure
 * @response `default` `LabelFilter` success
 */
export async function getAccountLabels(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<LabelFilter>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/label/filter`, ctx.baseUrl),
    headers
  });
}
/**
 * @summary Get pin codes.
 * @request GET:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode
 * @secure
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function getPinCodes(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<PinCodeResponse[]>({
    method: "GET",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode`, ctx.baseUrl),
    headers
  });
}
/**
 * @summary Get user profiles.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile
 * @secure
 * @response `200` `UserProfiles` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 */
export async function getProfiles(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserProfiles>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile`, ctx.baseUrl),
    headers
  });
}
/**
 * @summary Get user details.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @secure
 * @response `200` `UserDetailsResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 * @response `404` `void` NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here
 */
export async function getUserDetails(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserDetailsResponse>({
    method: "GET",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/details`, ctx.baseUrl),
    headers
  });
}
/**
 * @description The user has given consent to collection of personal information.
 * @summary EXPERIMENTAL.
 * @request PUT:/v1/customer/{customer}/businessunit/{businessUnit}/user/consent
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 */
export async function giveConsent(headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(`/v1/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/consent`, ctx.baseUrl),
    headers
  });
}
/**
 * @description Attributes NOT in the provided list will be untouched.
 * @summary Update provided user attributes.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/attributes
 * @secure
 * @response `200` `UserDetailsResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function putUserAttributes(data: UserAttributeRequest[], headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserDetailsResponse>({
    method: "PUT",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/attributes`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description .Will send a token out of band, which can be used to set a new password.
 * @summary Request reset user's password.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/password/reset/{username}
 * @response `default` `void` success
 */
export async function resetPassword(
  /** Username of user */
  username: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<void>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/password/reset/${username}`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @description The current session token will be replaced.
 * @summary Select a user profile.
 * @request GET:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}/select
 * @secure
 * @response `200` `LoginResponse` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION
 */
export async function selectUserProfile(
  /** user id of profile to select */
  userId: string,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<LoginResponse>({
    method: "GET",
    url: new URL(
      `/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}/select`,
      ctx.baseUrl
    ),
    headers
  });
}
/**
 * @summary Sets the users password using a token received at signup (without password) or password reset
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}
 * @response `404` `void` NOT_FOUND. If the token is not found or is expired.
 * @response `422` `void` BAD_PASSWORD. The password does not comply to the password policy.
 */
export async function setPasswordWithToken(
  /** Token received out of band, e.g by mail */
  token: string,
  data: SetPwdWithTokenV3,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/signup/password/${token}`,
      ctx.baseUrl
    ),
    headers,
    body: data
  });
}
/**
 * @summary Update (or Create) a pin code.
 * @request PUT:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}
 * @secure
 * @response `200` `(PinCodeResponse)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function setPinCode(
  /** the id of the pin to update or if non-exiting to be created. */
  pincodeId: string,
  data: PinCodeSetRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<PinCodeResponse[]>({
    method: "PUT",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}`,
      ctx.baseUrl
    ),
    headers,
    body: data
  });
}
/**
 * @summary Update user details.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/details
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here
 * @response `422` `void` BAD_PASSWORD. The new password is non-compliant to policy
 */
export async function userDetailsUpdate(data: UserDetailsUpdateRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/details`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @summary Update user profile.
 * @request PUT:/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}
 * @secure
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_SUPPORTED_FOR_FEDERATED_USER, The user details area not stored here NOT_OWNER. Only the owner may update profiles.
 */
export async function userProfileUpdate(
  /** user id of profile to update */
  userId: string,
  data: UserDetailsUpdateRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<any>({
    method: "PUT",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/profile/${userId}`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description Returns a list of application specified grants if successfully validated, else an empty list [].
 * @summary Validate a pin code.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/pin/{pincodeId}/validate
 * @secure
 * @response `200` `(string)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function validatePinCode(
  /** the id of the pin to delete. */
  pincodeId: string,
  data: PinCodeValidationRequest,
  headers: RequestParams = {}
) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string[]>({
    method: "POST",
    url: new URL(
      `/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/pin/${pincodeId}/validate`,
      ctx.baseUrl
    ),
    headers,
    body: data
  });
}
/**
 * @description The provided code is matched with all defined pin codes. Returns a list of application specified grants of all successfully validated pin codes, if no one matches an empty list [] is returned.
 * @summary Validate all pin codes.
 * @request POST:/v3/customer/{customer}/businessunit/{businessUnit}/user/pincode/validate
 * @secure
 * @response `200` `(string)[]` success
 * @response `401` `void` NO_SESSION_TOKEN. If the session is not found. INVALID_SESSION_TOKEN. If the session is expired.
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION NOT_ALLOWED_IN_ANONYMOUS_SESSION. NOT_ALLOWED_IN_SESSION_USER_SESSION.
 */
export async function validatePinCodes(data: PinCodeValidationRequest, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<string[]>({
    method: "POST",
    url: new URL(`/v3/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/pincode/validate`, ctx.baseUrl),
    headers,
    body: data
  });
}
/**
 * @description Requirements: accountverification.confirmationRequired = false autoproviion of offering
 * @summary EXPERIMENTAL.
 * @request POST:/v2/customer/{customer}/businessunit/{businessUnit}/user/vouchersignup
 * @response `200` `UserSelfServiceCreateResponse` success
 * @response `403` `void` BUSINESS_UNITS_CRM_DOES_NOT_SUPPORT_OPERATION EMAIL_ADDRESS_NOT_APPROVED. The email address is not approved.
 * @response `422` `void` EMAIL_OR_MOBILE_REQUIRED. EmailAddress must be supplied. BAD_EMAIL_ADDRESS. The email address is malformed.
 */
export async function voucherSignup(data: UserSelfServiceCreateWithVoucherRequestV2, headers: RequestParams = {}) {
  // @ts-ignore
  const ctx = (this.context || this) as ServiceContext;
  return request<UserSelfServiceCreateResponse>({
    method: "POST",
    url: new URL(`/v2/customer/${ctx.customer}/businessunit/${ctx.businessUnit}/user/vouchersignup`, ctx.baseUrl),
    headers,
    body: data
  });
}

export class UserService {
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
  giveConsent = giveConsent;
  putUserAttributes = putUserAttributes;
  resetPassword = resetPassword;
  selectUserProfile = selectUserProfile;
  setPasswordWithToken = setPasswordWithToken;
  setPinCode = setPinCode;
  userDetailsUpdate = userDetailsUpdate;
  userProfileUpdate = userProfileUpdate;
  validatePinCode = validatePinCode;
  validatePinCodes = validatePinCodes;
  voucherSignup = voucherSignup;
}