import { IProductOffering, TPaymentProvider } from "@ericssonbroadcastservices/exposure-sdk";
import { useQuery } from "react-query";
import { useExposureApi } from "./useApi";
import { useGeolocation } from "./useGeolocation";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useConsumedDiscounts, usePurchases } from "./usePurchases";

const productOfferingsCacheTime = 1000 * 60 * 30;

interface IUseProductOfferings {
  paymentProvider?: TPaymentProvider;
}

export function useProductOfferings(options?: IUseProductOfferings): TApiHook<IProductOffering[]> {
  const [purchaseResponse] = usePurchases();
  const { customer, businessUnit } = useRedBeeState();
  const [userLocation] = useGeolocation();
  const [consumedDiscounts] = useConsumedDiscounts();
  const exposureApi = useExposureApi();

  const { data, isLoading, error } = useQuery<IProductOffering[]>(
    [QueryKeys.PRODUCT_OFFERINGS, userLocation?.countryCode],
    () => {
      if (userLocation?.countryCode) {
        return exposureApi.payment.getProductOfferingsByCountry({
          customer,
          businessUnit,
          countryCode: userLocation.countryCode,
          paymentProvider: options?.paymentProvider
        });
      }
      return [];
    },
    { staleTime: productOfferingsCacheTime }
  );
  return [
    data?.map(p => {
      p.activePurchase = purchaseResponse?.purchases.find(p => p.productOfferingId === p.id);
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
