import { getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { ResolvedComponent } from "../../interfaces/component-content";

export interface GetComponentByIdOptions {
  assetId: string;
}

export async function getAssetPage(
  context: WhiteLabelServiceContext,
  { assetId }: GetComponentByIdOptions
): Promise<ResolvedComponent[]> {
  const asset = await getAsset.call(context, { assetId });
  return [
    {
      presentationParameters: {
        carouselLayout: "carousel",
        density: "MEDIUM",
        imageOrientation: "landscape"
      },
      content: asset,
      component: {
        id: `generated_asset_${assetId}`,
        appType: "asset_display"
      }
    }
    // TODO: add generated carousels
  ];
}
