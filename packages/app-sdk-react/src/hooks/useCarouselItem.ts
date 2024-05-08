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
import { useOnNowForChannel } from "./useOnNow";
import { useChannelPickerItem } from "./useChannelPickerItem";

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

interface IUseChannelPickerItem {
  assetId: string;
  isLive: boolean;
  isLiveEvent: boolean;
  title?: string;
  description?: string;
  tags: string[];
  startDay?: string;
  startTime?: string;
  /** @description a channel logo. Will be defined if the main image is taken from the currently live program */
  logo?: string;
  /** @description the main image for the asset. In case of a channel, the image could be from the currently live program */
  image?: string;
  /** @description represents the progress of the asset. Currently only set for programs on TV_CHANNELS */
  progress: number;
}

export function useCarouselItem(
  item: CarouselItem,
  options: {
    orientation: ImageOrientation;
    width: number;
    height?: number;
    imageFormat?: ImageFormat;
    descriptionVariant?: DescriptionVariant;
    useProgramInfoForLiveChannels?: boolean;
    /** @description The interval for updating program info for live channels, in millisec. Defaults to 10 mins  */
    onNowInfoUpdateInterval?: number;
  }
): IUseChannelPickerItem {
  const { orientation, width, height, imageFormat, useProgramInfoForLiveChannels = true } = options;
  const { language, defaultLanguage } = useLanguage();
  const [translations] = useTranslations();

  const { tvShowId, season, episode, type } = item.asset;

  let title = AssetHelpers.getTitle(item.asset, {
    language,
    defaultLanguage
  });
  if (tvShowId && season && episode) {
    title = `S${season} E${episode} ${title}`;
  }

  const startTime = item.startTime ?? AssetHelpers.getStartTime(item.asset);

  const [channelStatus] = useOnNowForChannel({
    channelId: useProgramInfoForLiveChannels && item.asset.type === "TV_CHANNEL" ? item.asset.assetId : undefined,
    updateInterval: options.onNowInfoUpdateInterval
  });

  const channelItem = useChannelPickerItem(channelStatus || {}, {
    image: { width, height, format: imageFormat },
    logo: { width: Math.round(width / 4), height: height ? Math.round(height / 4) : undefined, format: imageFormat }
  });
  // as far as I can tell, this is the best way to distinguish between epg entries and events
  const isEvent = !!item.asset.event;

  // startTime for the actual asset
  const assetStartTimeString = isEvent
    ? ChannelAssetHelpers.getStartTimeString(item) || undefined
    : ChannelAssetHelpers.getTimeSlotString(item) || undefined;

  // if there is a channelItem, that takes precedence
  const startTimeString = channelItem.timeSlot || assetStartTimeString;

  return {
    assetId: item.asset.assetId,
    isLive: ChannelAssetHelpers.isLive(item),
    isLiveEvent: item.asset.type === AssetType.LIVE_EVENT || item.asset.type === AssetType.EVENT,
    title: channelItem.title && channelItem.title !== title ? `${title} - ${channelItem.title}` : title,
    description: selectDescription(options.descriptionVariant || "MEDIUM", item.asset, { language, defaultLanguage }),
    tags: AssetHelpers.getAllTagIds(item.asset),
    startDay: startTime && type !== "TV_CHANNEL" ? getDayLocalized(new Date(startTime), translations) : undefined,
    startTime: startTimeString,
    logo: channelItem.logo,
    progress: channelItem.progress,
    image:
      channelItem.image ||
      AssetHelpers.getScaledImage({
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
