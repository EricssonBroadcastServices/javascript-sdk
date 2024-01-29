import { TagList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { get } from "../../utils/http.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";
import { IExposureWLCategoriesComponent } from "../../interfaces/exposure-wl-component.js";

export async function getCategoriesContent(
  context: WhiteLabelServiceContext,
  categoriesComponent: IExposureWLCategoriesComponent
) {
  const contentUrl = new URL(categoriesComponent.contentUrl.url, context.baseUrl);
  return await get<TagList>({ url: contentUrl });
}
