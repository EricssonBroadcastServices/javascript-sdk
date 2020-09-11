import { getCredentials } from "./credentials";
import { PasswordHashConfig } from "../models/system-config-model";

describe("Credentials", () => {
  it("should generate credentials with clear algorithm", async () => {
    const hashconfig: PasswordHashConfig = {
      sharedRandom: "123",
      algorithms: [
        {
          algorithmName: "clear"
        }
      ]
    };
    const credentials = await getCredentials("username", "password", hashconfig);
    expect(credentials).toEqual({
      passwordTuples: [
        {
          algorithm: {
            algorithmName: "clear"
          },
          value: "password"
        }
      ]
    });
  });
  it("should generate credentials with pdfk algorithm", async () => {
    const hashconfig: PasswordHashConfig = {
      sharedRandom: "123",
      algorithms: [
        {
          algorithmName: "PBKDF2",
          pbkdf2Iterations: 2
        }
      ]
    };
    const credentials = await getCredentials("username", "password", hashconfig);
    expect(credentials).toEqual({
      passwordTuples: [
        {
          algorithm: {
            algorithmName: "PBKDF2",
            pbkdf2Iterations: 2
          },
          value:
            "0f21718785f4b6718459e4ad6e8172cd3f869890e6cb2d53b126a075e0c35730fabebbc6005e036b89a94e6b95ddf4dca160591698003da97ff041148157b11c"
        }
      ]
    });
  });
});
