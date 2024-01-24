import {
  AssetHelpers,
  CarouselItem,
  ChannelAssetHelpers,
  getDayLocalized,
  ImageFormat
} from "@ericssonbroadcastservices/app-sdk";
import { AssetType, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";

export function useCarouselItem(
  item: CarouselItem,
  options: {
    orientation: ImageOrientation;
    width: number;
    height?: number;
    imageFormat?: ImageFormat;
  }
) {
  const { orientation, width, height, imageFormat } = options;
  const { language, defaultLanguage } = useLanguage();
  const [translations] = useTranslations();

  const { tvShowId, season, episode } = item.asset;

  let title = AssetHelpers.getTitle(item.asset, {
    language,
    defaultLanguage
  });
  if (tvShowId && season && episode) {
    title = `S${season} E${episode} ${title}`;
  }

  return {
    assetId: item.asset.assetId,
    isLive: ChannelAssetHelpers.isLive(item),
    isLiveEvent: item.asset.type === AssetType.LIVE_EVENT || item.asset.type === AssetType.EVENT,
    title,
    description: AssetHelpers.getShortDescription(item.asset, {
      language,
      defaultLanguage
    }),
    tags: AssetHelpers.getAllTagIds(item.asset),
    startDay: item.startTime ? getDayLocalized(new Date(item.startTime), translations) : undefined,
    startTime: ChannelAssetHelpers.getTimeSlotString(item) || undefined,
    image: AssetHelpers.getScaledImage({
      asset: item.asset,
      imageType: "cover",
      format: imageFormat,
      orientation,
      width,
      height,
      language,
      defaultLanguage
    })
  };
}
