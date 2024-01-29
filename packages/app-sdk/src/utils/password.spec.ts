import { PasswordPolicy } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { isPasswordValid } from "./password.js";

describe("CheckPasswordResponse", () => {
  it("should validate password", () => {
    const policy: PasswordPolicy = {
      minimumGroups: 2,
      minimumLength: 8
    };
    expect(isPasswordValid("a", policy).groupsOk).toBe(false);
    expect(isPasswordValid("aA", policy).groupsOk).toBe(true);
    expect(isPasswordValid("a", policy).lengthOk).toBe(false);
    expect(isPasswordValid("aaaaaaaaaaaa", policy).lengthOk).toBe(true);
    expect(isPasswordValid("aaaaaaaaaaaa", policy).groupsOk).toBe(false);
    expect(isPasswordValid("aaa!aaaaaaaaa", policy).lengthOk).toBe(true);
    expect(isPasswordValid("aaa!aaaaaaaaa", policy).groupsOk).toBe(true);
  });
});
