import {
  AssetHelpers,
  CarouselItem,
  ChannelAssetHelpers,
  getDayLocalized,
  ImageFormat
} from "@ericssonbroadcastservices/app-sdk";
import { Asset, AssetType, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { useTranslations } from "./useTranslations";

type DescriptionVariant = "MEDIUM" | "SHORT" | "LONG";

function selectDescription(
  variant: DescriptionVariant,
  asset: Asset,
  language: {
    language: string;
    defaultLanguage: string;
  }
) {
  switch (variant) {
    case "MEDIUM":
      return AssetHelpers.getMediumDescription(asset, { ...language, fallback: true });
    case "SHORT":
      return AssetHelpers.getShortDescription(asset, { ...language, fallback: true });
    case "LONG":
      return AssetHelpers.getLongDescription(asset, { ...language, fallback: true });
  }
}

export function useCarouselItem(
  item: CarouselItem,
  options: {
    orientation: ImageOrientation;
    width: number;
    height?: number;
    imageFormat?: ImageFormat;
    descriptionVariant?: DescriptionVariant;
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

  const startTime = item.startTime ?? AssetHelpers.getStartTime(item.asset);

  // as far as I can tell, this is the best way to distinguish between epg entries and events
  const isEvent = !!item.asset.event;

  return {
    assetId: item.asset.assetId,
    isLive: ChannelAssetHelpers.isLive(item),
    isLiveEvent: item.asset.type === AssetType.LIVE_EVENT || item.asset.type === AssetType.EVENT,
    title,
    description: selectDescription(options.descriptionVariant || "MEDIUM", item.asset, { language, defaultLanguage }),
    tags: AssetHelpers.getAllTagIds(item.asset),
    startDay: startTime ? getDayLocalized(new Date(startTime), translations) : undefined,
    startTime: isEvent
      ? ChannelAssetHelpers.getStartTimeString(item)
      : ChannelAssetHelpers.getTimeSlotString(item) || undefined,
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
