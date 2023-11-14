import { useQuery } from "react-query";
import { StoreProductOffering, getOfferingsByCountry } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useCountryCode } from "./useGeolocation";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useConsumedDiscounts } from "./usePurchases";

const productOfferingsCacheTime = 1000 * 60 * 30;

export function useProductOfferings(): TApiHook<StoreProductOffering[]> {
  const { serviceContext } = useRedBeeState();
  const countryCode = useCountryCode();
  const [consumedDiscounts] = useConsumedDiscounts();

  const { data, isLoading, error } = useQuery<StoreProductOffering[]>(
    [QueryKeys.PRODUCT_OFFERINGS, countryCode],
    async () => {
      if (countryCode) {
        const { productOfferings } = await getOfferingsByCountry.call(serviceContext, {
          countryCode,
          includeSelectAssetProducts: true
        });
        return productOfferings || [];
      }
      return [];
    },
    { staleTime: productOfferingsCacheTime }
  );
  return [
    data?.map(p => {
      if (consumedDiscounts?.includes(p.id)) {
        p.discount = undefined;
      }
      return p;
    }) || [],
    isLoading,
    error
  ];
}

export function refetchProductOfferings() {
  queryClient.invalidateQueries(QueryKeys.PRODUCT_OFFERINGS);
}
