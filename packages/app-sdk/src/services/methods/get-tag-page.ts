import { Image, TagType, getTagById } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService } from "../white-label-service.js";
import { ResolvedComponent } from "../../interfaces/component-content.js";
import { getGeneratedCarouselByTagId } from "./get-generated-carousel-by-tag-id.js";
import { TagHelpers } from "../../utils/tag.js";
import { IExposureComponent, IExposureWLImageComponent } from "../../interfaces/exposure-wl-component.js";
import { IImage } from "../../interfaces/image.js";
export interface GetTagPageOptions {
  tagId: string;
  locale: string;
}

function selectTagPageImageComponentImage(images: Image[]): IImage[] {
  return [images.find(i => i.type === "banner") || images[0]] as IImage[];
}

export function getTagPageTextComponent(tag: TagType, locale: string): IExposureComponent {
  const component: IExposureComponent = {
    id: `generator-text-tag-${tag.tagId}`,
    appType: "text",
    presentation: {
      fallback: {
        title: TagHelpers.getTitle(tag, locale),
        body: `## ${TagHelpers.getTitle(tag, locale)} \n ${TagHelpers.getDescription(tag, locale) || ""}`,
        images: []
      },
      localized: {}
    }
  };
  return component;
}

export function getTagImageComponent(tag: TagType, locale: string): IExposureWLImageComponent {
  const component: IExposureWLImageComponent = {
    id: `generator-image-tag-${tag.tagId}`,
    appType: "image",
    actions: {
      default: undefined
    },
    presentation: {
      fallback: {
        title: TagHelpers.getTitle(tag, locale) || "",
        body: TagHelpers.getDescription(tag, locale),
        images: TagHelpers.getImages(tag, locale)?.length
          ? selectTagPageImageComponentImage(TagHelpers.getImages(tag, locale) as Image[])
          : []
      },
      localized: {}
    }
  };
  return component;
}

export function getTagPageTopComponent(tag: TagType, locale: string) {
  if (TagHelpers.getImages(tag, locale)?.length) {
    return getTagImageComponent(tag, locale);
  }
  return getTagPageTextComponent(tag, locale);
}

export async function getTagPage(
  service: WhiteLabelService,
  { locale, tagId }: GetTagPageOptions
): Promise<ResolvedComponent[]> {
  const tag = await getTagById.call(service.context, { tagId });

  const generatedComponents: Promise<ResolvedComponent>[] = [];

  generatedComponents.push(getGeneratedCarouselByTagId(service, { tagId, locale, carouselLayout: "grid" }));

  const resolvedGeneratedComponents = await (
    await Promise.allSettled(generatedComponents)
  )
    .filter((val): val is PromiseFulfilledResult<ResolvedComponent> => {
      if (val.status === "rejected") {
        console.warn("generated carousel failed to resolve");
      }
      return val.status === "fulfilled";
    })
    .map(res => res.value);
  return [
    {
      component: getTagPageTopComponent(tag, locale),
      content: undefined,
      presentationParameters: {
        carouselLayout: "carousel",
        density: "MEDIUM",
        imageOrientation: "landscape"
      }
    },
    ...resolvedGeneratedComponents
  ];
}
