import { Session } from "../Session";
import { parseSessionToken, validateAndReconstructSessionFromSessionToken } from "./session-token";

// cannot spy on reexported functions in jest, hence the weird import
import * as rbmOttSdk from "@ericssonbroadcastservices/rbm-ott-sdk/dist/AuthenticationService";

const fakeSession = {
  userId: "userId",
  accountId: "accountId",
  overTheDeviceLimit: false,
  crmToken: "crmToken",
  userProfile: {
    active: true,
    attributes: [],
    capabilities: {
      canChangeEmail: false,

      canChangePassword: true,

      canChangeUserNameAndEmail: false,

      canManageAccount: true,

      canManageDevices: true,

      canManagePayments: true,

      canManagePurchases: true
    },
    child: false,
    created: "aDate",
    displayName: "displayName",
    emailAddress: "mail@address.com",
    emailAddressRequired: false,
    language: "en",
    owner: true,
    userId: "userId",
    username: "username"
  }
};

const aRealToken =
  "ses_081fe722-63d6-407f-9bd1-4529674da2a9p|acc_3ed14395-3b43-4253-8a56-75a98c2020e1_82162E|usr_d5ed95d8-0c75-4256-8a1e-0e61faa7a833_82162E|null|1705498903140|2005498903108|false|577321ec-cc78-432a-9bb5-4e281e200664_WEB|WEB||BSCUBSBU||QiQtjuMrzcL56uCSccdYHpzoGvR93KCY95Z/6ZSiSpc=";

describe("sessionToken utils", () => {
  it("parses an invalid session token", () => {
    expect(parseSessionToken("just a random string")).toBe(null);
  });
  it("parses a real sessionToken", () => {
    expect(
      parseSessionToken(
        "ses_081fe722-63d6-407f-9bd1-4529674da2a9p|acc_3ed14395-3b43-4253-8a56-75a98c2020e1_82162E|usr_d5ed95d8-0c75-4256-8a1e-0e61faa7a833_82162E|null|1705498903140|2005498903108|false|577321ec-cc78-432a-9bb5-4e281e200664_WEB|WEB||BSCUBSBU||QiQtjuMrzcL56uCSccdYHpzoGvR93KCY95Z/6ZSiSpc="
      )
    ).toEqual({
      deviceId: "577321ec-cc78-432a-9bb5-4e281e200664_WEB",
      expiration: "2005498903108",
      isAnonymous: false
    });
  });
  it("reconstructs a session", async () => {
    jest.spyOn(rbmOttSdk, "validateSessionToken").mockReturnValue(Promise.resolve(fakeSession));
    const result = await validateAndReconstructSessionFromSessionToken({
      context: { customer: "cu", businessUnit: "bu", baseUrl: "baseUrl" },
      sessionToken: aRealToken
    });
    expect(result).toBeInstanceOf(Session);
    expect(result?.accountId).toBe("accountId");
    expect(result?.userId).toBe("userId");
  });
  it("does not reconstruct a session", async () => {
    jest.spyOn(rbmOttSdk, "validateSessionToken").mockReturnValue(Promise.reject("Oh no!"));
    const result = await validateAndReconstructSessionFromSessionToken({
      context: { customer: "cu", businessUnit: "bu", baseUrl: "baseUrl" },
      sessionToken: aRealToken
    });
    expect(result).toBe(null);
  });
});
