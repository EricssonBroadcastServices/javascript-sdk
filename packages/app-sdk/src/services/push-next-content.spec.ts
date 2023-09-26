import { ChannelEPGResponse, getEpgForChannel } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { DeviceGroup } from "../interfaces/device-group";
import { WhiteLabelService } from "./white-label-service";

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.MOBILE,
  getAuthToken: () => Promise.resolve(undefined),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

describe("WhiteLabelServices - push next content", () => {
  it("gets some pnc data for a regular vod", async () => {
    const cosmosLaudromatId = "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E";
    const pushNextContentData = await service.getPushNextContentData(cosmosLaudromatId);
    expect(pushNextContentData.recommendations.length).toBe(3);
    expect(pushNextContentData.upNext).toBeUndefined();
  });
  it("gets some pnc data for an episode", async () => {
    const sportFiskarnaPike = "380c6993-bc66-49f3-a28d-646669357bdb_82162E";
    const pushNextContentData = await service.getPushNextContentData(sportFiskarnaPike);
    expect(pushNextContentData.recommendations.length).toBe(3);
    expect(pushNextContentData.upNext).toEqual(expect.objectContaining({ assetId: expect.any(String) }));
  });
  it("gets some pnc data a program", async () => {
    const channelId = "89bff8fb_82162E";
    const epg: ChannelEPGResponse = await getEpgForChannel.call(service, {
      channelId,
      date: new Date(),
      daysForward: 0,
      daysBackward: 0
    });
    const programAssetId = epg.programs[0].assetId as string;
    const pushNextContentData = await service.getPushNextContentData(programAssetId);
    expect(pushNextContentData.recommendations.length).toBe(3);
    expect(pushNextContentData.upNext).toEqual(expect.objectContaining({ assetId: expect.any(String) }));
    expect(pushNextContentData.recommendations[0]).toEqual(pushNextContentData.upNext);
  });
});
