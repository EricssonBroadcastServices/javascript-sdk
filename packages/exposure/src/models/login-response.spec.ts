import { deserialize } from "../decorators/property-mapper";
import { LoginResponse } from "./login-response-model";

function generateLoginResponse(isAnonymous = false, expirationDateTime: Date = new Date(Date.now() + 1000 * 60 * 60)) {
  return deserialize(LoginResponse, {
    isAnonymous,
    accountId: "03-047-61DD-3B0C_82162E",
    userId: "d4c5a7ba-41db-4419-8509-eda3e88e3e0f",
    accountStatus: "OK",
    expirationDateTime: expirationDateTime.toISOString(),
    sessionToken:
      "ses_f2f10183-96f3-44b9-9f66-dcefaad19be8p|03-047-61DD-3B0C_82162E|d4c5a7ba-41db-4419-8509-eda3e88e3e0f|null|1683633148929|1983633148870|false|cc1cf276-153a-4052-92f8-234f01341097_WEB|WEB||BSCUBSBU||4OvpLQzFJTmckgr0eY7mC4NgelIqJWH5XzMFZSIPBoU=",
    informationCollectionConsentGiven: "2021-02-16T12:18:48.759Z",
    language: "en",
    isOverDeviceLimit: false,
    child: false,
    userProfile: {
      username: "simon.wallin1@mailinator.com",
      displayName: "Simon1",
      created: "2021-02-16T12:18:48.759Z",
      emailAddress: "simon.wallin1@mailinator.com",
      userId: "d4c5a7ba-41db-4419-8509-eda3e88e3e0f",
      child: false,
      active: true,
      owner: true,
      emailAddressRequired: true,
      language: "en",
      capabilities: {
        canChangePassword: true,
        canChangeUserNameAndEmail: true,
        canChangeEmail: false,
        canManageAccount: true,
        canManageDevices: true,
        canManagePayments: true,
        canManagePurchases: true
      },
      attributes: [
        {
          attributeId: "123456789",
          type: "string",
          requiredAtSignup: false,
          value: "oohv5",
          valueSet: false
        },
        {
          attributeId: "check-the-box",
          type: "enum",
          requiredAtSignup: false,
          value: "check",
          valueSet: false
        },
        {
          attributeId: "email-marketing-opt-in",
          type: "boolean",
          requiredAtSignup: false,
          value: false,
          valueSet: false
        },
        {
          attributeId: "favorite-programming-language",
          type: "enum",
          requiredAtSignup: false,
          value: "rust",
          valueSet: false
        },
        {
          attributeId: "i-am-a-teapot",
          type: "boolean",
          requiredAtSignup: false,
          value: true,
          valueSet: false
        },
        {
          attributeId: "Isegasdemo",
          type: "string",
          requiredAtSignup: false,
          value: "44",
          valueSet: false
        },
        {
          attributeId: "my-body-temperature",
          type: "real",
          requiredAtSignup: false,
          value: 123.0,
          valueSet: false
        },
        {
          attributeId: "my-year-of-birth",
          type: "integer",
          requiredAtSignup: false,
          value: 1990,
          valueSet: false
        },
        {
          attributeId: "new-boolean",
          type: "boolean",
          requiredAtSignup: false,
          value: true,
          valueSet: false
        },
        {
          attributeId: "rock-paper-scissors",
          type: "enum",
          requiredAtSignup: false,
          valueSet: false
        },
        {
          attributeId: "salutation",
          type: "string",
          requiredAtSignup: false,
          value: "El magnifico",
          valueSet: false
        },
        {
          attributeId: "sell-your-soul",
          type: "enum",
          requiredAtSignup: false,
          value: "yes",
          valueSet: false
        }
      ]
    },
    crmToken: "ses_f2f10183-96f3-44b9-9f66-dcefaad19be8p"
  });
}

describe("login response", () => {
  it("is logged in", () => {
    const loginResponse = generateLoginResponse(false);
    expect(loginResponse.isLoggedIn()).toBe(true);
    expect(loginResponse.hasSession()).toBe(true);
    expect(loginResponse.isAnonymous).toBe(false);
    expect(loginResponse.isFirebase()).toBe(false);
  });
  it("has a session and is anonymous", () => {
    const loginResponse = generateLoginResponse(true);
    expect(loginResponse.isLoggedIn()).toBe(false);
    expect(loginResponse.hasSession()).toBe(true);
    expect(loginResponse.isAnonymous).toBe(true);
    expect(loginResponse.isFirebase()).toBe(false);
  });
  it("isFirebase", () => {
    const loginResponse = generateLoginResponse(true);
    loginResponse.accountId = "firebase..somethingSomething";
    expect(loginResponse.isFirebase()).toBe(true);
  });
});
