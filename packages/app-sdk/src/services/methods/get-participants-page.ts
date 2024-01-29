import { WhiteLabelService } from "../white-label-service";
import { ResolvedComponent } from "../../interfaces/component-content.js";
import { getGeneratedParticipantCarousel } from "./get-participants-carousel.js";

export interface GetParticipantPageOptions {
  participantName: string;
}

export async function getParticipantPage(
  service: WhiteLabelService,
  { participantName }: GetParticipantPageOptions
): Promise<ResolvedComponent[]> {
  const generatedComponents: Promise<ResolvedComponent>[] = [];

  generatedComponents.push(getGeneratedParticipantCarousel({ service, participantName }));

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
        id: `generator-text-participant-${participantName}`,
        appType: "text",
        presentation: {
          fallback: {
            title: "",
            body: `## ${participantName}`,
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
