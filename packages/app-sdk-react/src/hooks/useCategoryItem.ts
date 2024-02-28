import { TagType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useLanguage } from "./useSelectedLanguage";
import { ImageFormat, TagHelpers, fit } from "@ericssonbroadcastservices/app-sdk";
import { useMemo } from "react";

export function useCategoryItem(
  tag: TagType,
  options: {
    width: number;
    height?: number;
    imageFormat?: ImageFormat;
  }
) {
  const { width, height, imageFormat } = options;
  const { language } = useLanguage();
  return useMemo(() => {
    const tagImage = TagHelpers.getImages(tag, language)?.find(i => i.url);
    return {
      title: TagHelpers.getTitle(tag, language),
      image: tagImage?.url ? fit(tagImage.url, { w: width, h: height, format: imageFormat }) : undefined
    };
  }, [height, imageFormat, language, tag, width]);
}
