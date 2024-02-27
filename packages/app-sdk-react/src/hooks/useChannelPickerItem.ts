import { AssetHelpers, ChannelAssetHelpers, EPGHelpers, ImageFormat } from "@ericssonbroadcastservices/app-sdk";
import { ChannelStatus, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useMemo } from "react";
import { useLanguage } from "./useSelectedLanguage";

type UseChannelPickerItemOptions = {
  logo: {
    width: number;
    height?: number;
    format?: ImageFormat;
  };
  image: {
    width: number;
    height?: number;
    format?: ImageFormat;
  };
};

export function useChannelPickerItem(
  { channel, assets: programs = [] }: ChannelStatus,
  options: UseChannelPickerItemOptions
) {
  const language = useLanguage();

  const minute = new Date().getMinutes();

  const program = useMemo(() => programs.find(program => ChannelAssetHelpers.isLive(program)), [programs, minute]);
  const progress = useMemo(() => EPGHelpers.getCurrentProgramProgress(programs), [programs, minute]);

  let title = channel ? AssetHelpers.getTitle(channel, language) : "";
  let timeSlot: string | undefined;

  if (program) {
    timeSlot = ChannelAssetHelpers.getTimeSlotString(program) ?? undefined;
    title = program.asset ? AssetHelpers.getTitle(program.asset, language) : title;
  }

  const logo = channel
    ? AssetHelpers.getScaledImage({
        asset: channel,
        orientation: ImageOrientation.LANDSCAPE,
        imageType: "logo",
        ...options.logo,
        ...language
      })
    : undefined;

  const imageSettings = {
    orientation: ImageOrientation.LANDSCAPE,
    imageType: "cover",
    ...options.image,
    ...language
  };

  const programImage =
    program?.asset &&
    AssetHelpers.getScaledImage({
      asset: program.asset,
      ...imageSettings
    });

  const channelImage =
    channel &&
    AssetHelpers.getScaledImage({
      asset: channel,
      ...imageSettings
    });

  return {
    title,
    timeSlot,
    logo: programImage ? logo : undefined,
    image: programImage || channelImage,
    progress
  };
}
