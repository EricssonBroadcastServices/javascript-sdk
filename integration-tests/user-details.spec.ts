import { DeviceType, ExposureApi } from "../packages/exposure/src"

let sessionToken: string | undefined = undefined;

function authHeader() {
  if (!sessionToken) return;
  return {
    Authorization: `Bearer ${sessionToken}`
  }
}

const exposureApi = new ExposureApi({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  authHeader
})

describe("userdetails", () => {
  beforeAll(async () => {
    const session = await exposureApi.authentication.login({
      username: "simon.wallin1@mailinator.com",
      password: "SimonTest",
      device: {
        type: DeviceType.WEB,
        deviceId: "integrationTestDevice",
        name: "integrationTestDevice"
      }
    });
    sessionToken = session.sessionToken;
  });
  it("should persist user details", async () => {
    const names = ["Simon1", "Simon2"];
    const userDetails = await exposureApi.user.getUserDetails({});
    const newName = names.find(n => n !== userDetails.displayName);
    await exposureApi.user.updateUserDetails({ body: { displayName: newName } });
    const updatedUserDetails = await exposureApi.user.getUserDetails({});
    expect(updatedUserDetails.displayName).toBe(newName);
  });
  it("should persist user attributes", async () => {
    const userDetails = await exposureApi.user.getUserDetails({});
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const attributeToSet = userDetails.attributes.find(a => a.type === "string");
    if (!attributeToSet) {
      console.warn("Found no string attribute to modify");
      return;
    }
    await exposureApi.user.setAttributes({
      attributes: [{ attributeId: attributeToSet?.attributeId, value: randomString }]
    })
    const updatedUserDetails = await exposureApi.user.getUserDetails({});
    expect(
      updatedUserDetails.attributes.find(a => a.attributeId === attributeToSet.attributeId)?.value
    ).toBe(randomString);
  })
});
