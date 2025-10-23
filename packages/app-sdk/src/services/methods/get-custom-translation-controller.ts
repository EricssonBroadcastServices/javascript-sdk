import { getTranslationTemplate } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { Translations } from "../../utils";

export async function getCustomTranslationController(context: WhiteLabelServiceContext, language: string) {
  return await getTranslationTemplate
    .call(context, {
      language,
      configId: "sandwich"
    })
    .then(data => new Translations(data));
}
