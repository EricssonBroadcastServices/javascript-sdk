import { TagList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { get } from "../../utils/http";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLCategoriesComponent } from "../../interfaces/exposure-wl-component";

export async function getCategoriesContent(
  context: WhiteLabelServiceContext,
  categoriesComponent: IExposureWLCategoriesComponent
) {
  const contentUrl = new URL(categoriesComponent.contentUrl.url, context.baseUrl);
  return await get<TagList>({ url: contentUrl });
}
