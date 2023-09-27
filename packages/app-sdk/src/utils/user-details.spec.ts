/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserDetailsResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { userDetailsUtils } from "./user-details";

const mockDetails: UserDetailsResponse = {
  displayName: "",
  username: "",
  email: "",
  language: "en",
  defaultLanguage: "en",
  child: false,
  attributes: [
    {
      attributeId: "123",
      // @ts-expect-error
      value: null,
      valueSet: false,
      localized: [
        {
          locale: "en",
          title: "titleEN",
          description: "descEN"
        }
      ],
      type: "email",
      requiredAtSignup: true,
      // @ts-expect-error
      defaultValue: null
    },
    {
      attributeId: "345",
      // @ts-expect-error
      value: null,
      valueSet: false,
      localized: [],
      type: "email",
      requiredAtSignup: true,
      // @ts-expect-error
      defaultValue: null
    }
  ],
  capabilities: {
    canChangeEmail: true,
    canChangePassword: true,
    canChangeUserNameAndEmail: true,
    canManageAccount: true,
    canManageDevices: true,
    canManagePayments: true,
    canManagePurchases: true
  }
};

describe("userDetailsUtils", () => {
  it("should return a title", () => {
    expect(userDetailsUtils.getAttributeTitle(mockDetails.attributes[0], "en")).toBe("titleEN");
    expect(userDetailsUtils.getAttributeTitle(mockDetails.attributes[0], "sv")).toBe("titleEN");
    expect(userDetailsUtils.getAttributeTitle(mockDetails.attributes[1], "en")).toBe(null);
  });
  it("should return a description", () => {
    expect(userDetailsUtils.getAttributeDescription(mockDetails.attributes[0], "en")).toBe("descEN");
    expect(userDetailsUtils.getAttributeDescription(mockDetails.attributes[0], "sv")).toBe("descEN");
    expect(userDetailsUtils.getAttributeDescription(mockDetails.attributes[1], "en")).toBe(null);
  });
});
