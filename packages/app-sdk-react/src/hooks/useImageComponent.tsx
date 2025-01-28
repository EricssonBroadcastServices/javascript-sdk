import {
  fitToWidth,
  IExposureWLImageComponent,
  ImageFormat,
  WLComponentHelpers
} from "@ericssonbroadcastservices/app-sdk";
import { useLanguage } from "./useSelectedLanguage";

export function useImageComponent(
  component: IExposureWLImageComponent,
  {
    width,
    imageFormat
  }: {
    width: number;
    imageFormat?: ImageFormat;
  }
) {
  const { language } = useLanguage();
  const image =
    WLComponentHelpers.getImageByTag(component, "image", language) || component.presentation?.fallback?.images?.[0];

  const title = WLComponentHelpers.getTitle(component, language);
  const description = WLComponentHelpers.getDescription(component, language);

  const imageList = WLComponentHelpers.getImageList(component, language);

  return {
    title,
    description,
    image: fitToWidth(image?.url, width, imageFormat),
    imageList,
    originalHeight: image?.height,
    originalWidth: image?.width
  };
}
