import { IExposureWLCarousel, ResolvedComponent } from "../../interfaces";
import { WhiteLabelService } from "../white-label-service";

export async function getGeneratedParticipantCarousel({
  participantName,
  service
}: {
  participantName: string;
  service: WhiteLabelService;
}): Promise<ResolvedComponent<"carousel">> {
  const query = `participant.name:${participantName}`;

  const searchParams = new URLSearchParams({
    pageSize: "100",
    fieldSet: "ALL",
    query
  });

  console.log(query);

  const component: IExposureWLCarousel = {
    id: `generated-participant-${participantName}`,
    appType: "carousel",
    contentUrl: {
      type: "AssetQuery",
      url: `/v1/customer/${service.context.customer}/businessunit/${
        service.context.businessUnit
      }/content/asset?${searchParams.toString()}`,
      authorized: false
    },
    presentation: {
      fallback: {
        title: "",
        body: "",
        images: []
      },
      localized: {}
    }
  };
  const content = await service.getCarouselAssets(component);
  return {
    component,
    content,
    presentationParameters: {
      density: "MEDIUM",
      carouselLayout: "carousel",
      imageOrientation: "landscape"
    }
  };
}
