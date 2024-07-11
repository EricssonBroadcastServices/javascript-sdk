import { WhiteLabelService } from "../white-label-service";
import { ResolvedComponent } from "../../interfaces/component-content";
import { getSeeAllCarousel } from "./get-see-all-caorusel";

export async function getSeeAllPage(service: WhiteLabelService, tagId: string): Promise<ResolvedComponent[]> {
  const generatedComponents: Promise<ResolvedComponent>[] = [];

  generatedComponents.push(getSeeAllCarousel(service, tagId));

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
      component: {
        id: `generator-text-seeAll-${tagId}`,
        appType: "text",
        presentation: {
          fallback: {
            title: "",
            body: `## ${tagId}`,
            images: []
          },
          localized: {}
        }
      },
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
