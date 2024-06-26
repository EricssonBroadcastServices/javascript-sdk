import { Asset, ChannelEPGResponse, ProgramResponse, getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { EpgComponentContent } from "../../interfaces/component-content";
import { IExpoureWLEpgComponent } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";
import { get } from "../../utils/http";

export async function getEpgContent(
  context: WhiteLabelServiceContext,
  epgComponent: IExpoureWLEpgComponent
): Promise<EpgComponentContent> {
  const contentUrl = new URL(epgComponent.contentUrl.url, context.baseUrl);
  const content = await get<ChannelEPGResponse[]>({ url: contentUrl });
  const channels: Promise<{
    channel: Asset;
    programs: ProgramResponse[];
  } | null>[] = content.map(async channelResponse => {
    try {
      const channel = await getAsset.call(context, { assetId: channelResponse.channelId });
      return {
        channel,
        programs: channelResponse.programs
      };
    } catch (err) {
      // potentially the getAsset call can fail if the channel is not published
      return null;
    }
  });
  return (await Promise.all(channels)).filter((c): c is { channel: Asset; programs: ProgramResponse[] } => c !== null);
}
