import { getTagsFromPreferencesList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";

export async function getTagList(context: WhiteLabelServiceContext, listId: string) {
  return getTagsFromPreferencesList.call(context, {
    list: listId,
    headers: { Authorization: `Bearer ${await context.getAuthToken()}` }
  });
}
