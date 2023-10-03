import { DeviceGroup } from "../interfaces/device-group";
import { WhiteLabelService } from "./white-label-service";

function expectIsAssetList(assets: any[]) {
  assets.forEach(({ asset }) => {
    expect(asset).toEqual(
      expect.objectContaining({
        assetId: expect.any(String),
        type: expect.any(String)
      })
    );
    expect(Array.isArray(asset.localized)).toBe(true);
    expect(Array.isArray(asset.participants)).toBe(true);
  });
}

const sessionToken =
  "ses_a74c72db-302e-4e0a-bda9-b0777fbbb4ebp|03-047-61DD-3B0C_82162E|d4c5a7ba-41db-4419-8509-eda3e88e3e0f|null|1695023032272|1995023032212|false|cc1cf276-153a-4052-92f8-234f01341097_WEB|WEB||BSCUBSBU||WkKHk6cNYwC0flf6rGuwSotDRruDUk28GDqXfUXOpbs=";

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(sessionToken),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

// @todo: add test for header footer, menu title

describe("get carousel assets", () => {
  it("finds and gets a continue watching carousel", async () => {
    const continueId = "5e3bc28b-54e1-4ef1-818b-61e661e1107e";
    const component = await service.getComponentById({ componentId: continueId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a recommended carousel", async () => {
    const recommededId = "2e1a8659-9dc3-4d4f-8e1a-e86ab135d8a6";
    const component = await service.getComponentById({ componentId: recommededId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets an epg carousel", async () => {
    const epgId = "1de25d1f-e64f-4d2c-bd40-5a7dff28c53e";
    const component = await service.getComponentById({ componentId: epgId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a favourites carousel", async () => {
    const favId = "4e3ef64c-c802-4d9e-b3ac-f54f0a656f5d";
    const component = await service.getComponentById({ componentId: favId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a tvod carousel", async () => {
    const tvodId = "23c7fb5e-993c-4652-8ea1-47a949d5c271";
    const component = await service.getComponentById({ componentId: tvodId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("should get an event carousel", async () => {
    // TODO: figure out how to test event carousel
  });
  it("should get a tag feed carousel", async () => {
    const tagFeedId = "618d6243-abf0-43a2-bb33-098e22e9c624";
    const component = await service.getComponentById({ componentId: tagFeedId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
});
