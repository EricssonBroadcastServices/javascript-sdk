import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLHerobannerItem } from "../interfaces";
import { fit, ImageFormat } from "./image-scaling";
import { getImageByTagFromWLPresentation, getImagesFromWLPresentation } from "./wl-component";

export function getScaledHeroBannerImage(
  item: IExposureWLHerobannerItem,
  options: { language: string; width: number; height?: number; imageFormat?: ImageFormat }
) {
  const { language, width, height, imageFormat } = options;
  const fitOptions = {
    w: width,
    h: height,
    format: imageFormat
  };
  const componentImage = item.presentation && getImageByTagFromWLPresentation(item.presentation, "main", language);
  if (componentImage) {
    return fit(componentImage.url, fitOptions);
  }

  // Get all images from the content and sort by resolution & orientation. Highest resolution and Landscape should be first.
  let images =
    item.content.presentation &&
    getImagesFromWLPresentation(item.content.presentation, language)
      .sort((a, b) => (b.width && a.width ? a.width - b.width : 0))
      .sort((a, b) => (a.orientation && b.orientation ? (a.orientation === ImageOrientation.LANDSCAPE ? -1 : 1) : 0));

  // filter out portrait images if width or height isn't set as
  // both are needed to scale the image correctly.
  if (images && (!width || !height)) {
    images = images.filter(image => image.orientation === ImageOrientation.LANDSCAPE);
  }

  if (!images?.length) {
    return;
  }

  const contentImage = images.find(image => image.tags?.includes("banner")) || images[0];
  return fit(contentImage.url, fitOptions);
}

export function getHeroBannerImageList(item: IExposureWLHerobannerItem, language: string) {
  return item.content.presentation && getImagesFromWLPresentation(item.content.presentation, language);
}

export const HeroBannerHelpers = {
  getScaledImage: getScaledHeroBannerImage,
  getImageList: getHeroBannerImageList
};
