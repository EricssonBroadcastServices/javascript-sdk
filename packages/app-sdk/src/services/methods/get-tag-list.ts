import { getList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";

export async function getTagList(context: WhiteLabelServiceContext, listId: string) {
  return getList.call(context, {
    list: listId,
    headers: { Authorization: `Bearer ${await context.getAuthToken()}` }
  });
}
