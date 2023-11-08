import {
  Asset,
  AssetList,
  AssetListItemResponse,
  ChannelEPGResponse,
  EventList
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { CarouselItem } from "../../interfaces/component-content";
import { IExposureWLCarousel, WLCarouselAssetQueryTypes } from "../../interfaces/exposure-wl-component";
import { WhiteLabelServiceContext } from "../white-label-service";
import { getTagList } from "./get-tag-list";
import { get } from "../../utils/http";

export async function getCarouselAssets(
  context: WhiteLabelServiceContext,
  carousel: IExposureWLCarousel
): Promise<CarouselItem[]> {
  const sessionToken = await context.getAuthToken();
  if (carousel.appSubType === "TagFeedQuery") {
    if (!carousel.contentPreferencesUrl?.url) return [];

    const userTagList = await getTagList(context, "tagfeed");

    const url = new URL(carousel.contentPreferencesUrl.url, context.baseUrl);

    // fieldSet=ALL is missing, at least on BSBU. TODO: check with meta.
    url.searchParams.set("fieldSet", "ALL");

    carousel.contentPreferencesUrl?.fields.forEach(urlVariable => {
      url.searchParams.set(urlVariable, userTagList[`${urlVariable}`]);
    });
    return (await get<AssetList>({ url: url.toString() })).items.map(asset => ({
      asset
    }));
  }
  if (!carousel.contentUrl?.url) return [];
  const contentUrl = new URL(carousel.contentUrl.url, context.baseUrl);
  try {
    switch (carousel.contentUrl?.type) {
      case WLCarouselAssetQueryTypes.CONTINUE_WATCHING:
      case WLCarouselAssetQueryTypes.RECOMMENDED:
      case WLCarouselAssetQueryTypes.RECENTLY_WATCHED:
        if (!sessionToken) return [];
        return (
          await get<AssetList>({
            url: contentUrl,
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          })
        ).items.map(asset => ({ asset }));
      case WLCarouselAssetQueryTypes.EPG:
        return (
          (await get<ChannelEPGResponse>({ url: contentUrl })).programs?.map(({ asset, startTime, endTime }) => ({
            asset,
            startTime,
            endTime
          })) || []
        );
      case WLCarouselAssetQueryTypes.FAVORITES:
        if (!sessionToken) return [];
        return (
          await get<AssetListItemResponse[]>({
            url: contentUrl,
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          })
        ).map(({ asset }) => ({ asset }));
      case WLCarouselAssetQueryTypes.TVOD:
        if (!sessionToken) return [];
        return (
          await get<Asset[]>({
            url: contentUrl,
            headers: {
              Authorization: `Bearer ${sessionToken}`
            }
          })
        ).map(asset => ({ asset }));
      case WLCarouselAssetQueryTypes.EVENT:
        return (
          (await get<EventList>({ url: contentUrl })).items?.map(({ asset, startTime, endTime }) => ({
            asset,
            startTime,
            endTime
          })) || []
        );
      case WLCarouselAssetQueryTypes.ASSET:
        return (await get<AssetList>({ url: contentUrl })).items.map(asset => ({ asset }));
      default:
        console.warn("trying to resolve unsupported carousel");
        return [];
    }
  } catch (err) {
    console.error("failed when resolving assets", carousel, err);
    return [];
  }
}
