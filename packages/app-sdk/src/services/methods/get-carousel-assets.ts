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

    const userTagList = await getTagList(context, "tagfeed").catch(() => null);
    if (userTagList === null) return [];

    let urlString = carousel.contentPreferencesUrl.url;

    // each urlVariable is already encoded, hence we have to replace it before
    // creating a new URL, since that will add an extra layer of encoding
    carousel.contentPreferencesUrl?.fields.forEach(urlVariable => {
      urlString = urlString.replace(`{${urlVariable}}`, userTagList[`${urlVariable}`]);
    });

    const url = new URL(urlString, context.baseUrl);
    // fieldSet=ALL is missing, at least on BSBU. TODO: check with meta.
    url.searchParams.set("fieldSet", "ALL");

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
        const result = await get<AssetList>({
          url: contentUrl,
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        });
        return result.items.map(asset => ({ asset, totalCount: result.totalCount }));
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
