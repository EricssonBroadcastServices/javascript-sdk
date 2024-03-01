import { Asset, DeviceType, ExposureApi } from "../packages/exposure/src"

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

const listId = "favorites";
const assetId = "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E";

describe("preferences", () => {
  beforeAll(async () => {
    const session = await exposureApi.authentication.login({
      username: "redbeetester@mailinator.com",
      password: "RedBeeTest",
      device: {
        type: DeviceType.WEB,
        deviceId: "integrationTestDevice",
        name: "integrationTestDevice"
      }
    });
    sessionToken = session.sessionToken;
  });
  it("should add asset to list", async () => {
    const addRes = await exposureApi.preferences.addAssetToList({ listId , assetId })
    expect(addRes).toEqual({ message: 'ADDED_TO_LIST' });
    const list = await exposureApi.preferences.getListById({ listId });
    expect(list.some(i => i.asset.assetId === assetId)).toBe(true);
    list.forEach((item) => {
      // make sure we are casting it into the correct class
      expect(item.asset).toBeInstanceOf(Asset);
    })
  });
  it("should delete asset from list", async () => {
    const deleteRes = await exposureApi.preferences.deleteAssetFromList({ listId , assetId })
    expect(deleteRes).toEqual({ message: 'DELETED_FROM_LIST' });
    const list = await exposureApi.preferences.getListById({ listId });
    expect(list.some(i => i.asset.assetId === assetId)).toBe(false);
  })
});
