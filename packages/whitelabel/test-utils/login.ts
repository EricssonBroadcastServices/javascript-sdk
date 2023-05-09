import { LoginResponse } from "@ericssonbroadcastservices/exposure-sdk";

export function generateLoginResponse(
  isAnonymous = false,
  expirationDateTime: Date = new Date(Date.now() + 1000 * 60 * 60)
) {
  return new LoginResponse({
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
        }
      ]
    },
    crmToken: "ses_f2f10183-96f3-44b9-9f66-dcefaad19be8p"
  } as any);
}
