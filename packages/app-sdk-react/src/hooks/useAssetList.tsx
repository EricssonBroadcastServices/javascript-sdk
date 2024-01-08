import { useQuery } from "react-query";
import { AssetListItemResponse, getAssetList } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { TApiHook } from "../types/type.apiHook";
import { QueryKeys } from "../util/react-query";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";

export function useAssetList(listId: string): TApiHook<AssetListItemResponse[]> {
  const serviceContext = useServiceContext();
  const [session] = useUserSession();
  const { data, isLoading, error } = useQuery(
    [QueryKeys.FAVORITE_ASSET_IN_LIST, listId, serviceContext, session?.sessionToken],
    () => {
      if (!listId || !session?.sessionToken) return;
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return getAssetList.call(serviceContext, { list: listId, headers });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data || null, isLoading, error];
}
