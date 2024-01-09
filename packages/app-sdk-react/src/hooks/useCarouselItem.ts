import { AssetHelpers, CarouselItem, ChannelAssetHelpers, getDayLocalized } from "@ericssonbroadcastservices/app-sdk";
import { AssetType, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";

export function useCarouselItem(
  item: CarouselItem,
  options: {
    orientation: ImageOrientation;
    width: number;
    height?: number;
  }
) {
  const { orientation, width, height } = options;
  const { language, defaultLanguage } = useLanguage();
  const [translations] = useTranslations();

  return {
    assetId: item.asset.assetId,
    isLive: ChannelAssetHelpers.isLive(item),
    isLiveEvent: item.asset.type === AssetType.LIVE_EVENT,
    title: AssetHelpers.getTitle(item.asset, {
      language,
      defaultLanguage
    }),
    description: AssetHelpers.getShortDescription(item.asset, {
      language,
      defaultLanguage
    }),
    tags: AssetHelpers.getAllTagIds(item.asset),
    startDate: item.startTime ? getDayLocalized(new Date(item.startTime), translations) : undefined,
    startTime: ChannelAssetHelpers.getTimeSlotString(item) || undefined,
    image: AssetHelpers.getScaledImage({
      asset: item.asset,
      imageType: "cover",
      format: "webp",
      orientation,
      width,
      height,
      language,
      defaultLanguage
    })
  };
}
