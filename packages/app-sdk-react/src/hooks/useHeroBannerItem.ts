import {
  HeroBannerHelpers,
  IExposureWLHerobannerItem,
  ImageFormat,
  WLComponentHelpers
} from "@ericssonbroadcastservices/app-sdk";
import { useLanguage } from "./useSelectedLanguage";

export function useHeroBannerItem(
  item: IExposureWLHerobannerItem,
  options: { width: number; height?: number; imageFormat?: ImageFormat }
) {
  const { width, height, imageFormat } = options;
  const { language } = useLanguage();

  const image = HeroBannerHelpers.getScaledImage(item, {
    language,
    width,
    height,
    imageFormat
  });

  const imageList = HeroBannerHelpers.getImageList(item, language);

  return {
    title: WLComponentHelpers.getTitle(item, language),
    description: WLComponentHelpers.getDescription(item, language),
    action: item.actions?.default,
    image,
    imageList,
    trailerAssetId: WLComponentHelpers.getTrailerAssetId(item, language)
  };
}
