import { useQuery } from "react-query";
import {
  PaymentProvider,
  StoreProductOffering,
  StorePromotionProductOfferings,
  getOfferings,
  getOfferingsByVoucher
} from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useCountryCode } from "./useGeolocation";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { queryClient, QueryKeys } from "../util/react-query";
import { useConsumedDiscounts } from "./usePurchases";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

const productOfferingsCacheTime = 1000 * 60 * 30;

export function useProductOfferings({
  paymentProvider
}: {
  paymentProvider?: PaymentProvider;
}): TApiHook<StoreProductOffering[]> {
  const { serviceContext } = useRedBeeState();
  const countryCode = useCountryCode();
  const [consumedDiscounts] = useConsumedDiscounts();

  const { data, isLoading, error } = useQuery<StoreProductOffering[]>(
    [QueryKeys.PRODUCT_OFFERINGS, countryCode],
    async () => {
      if (countryCode) {
        const productOfferings = await getOfferings.call(serviceContext, {
          countryCode,
          includeSelectAssetProducts: true,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          paymentProvider: paymentProvider as PaymentProvider
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
    !!error ? AppError.fromUnknown(error) : null
  ];
}

export function useProductOfferingsByVoucherCode(code?: string): TApiHook<StoreProductOffering[]> {
  const ctx = useServiceContext();
  const [userSession] = useUserSession();
  const { data, isLoading, error } = useQuery<StorePromotionProductOfferings | undefined>(
    [QueryKeys.PRODUCT_OFFERINGS, code, userSession?.sessionToken],
    async () => {
      if (!userSession?.sessionToken || !code) return undefined;
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${userSession?.sessionToken}`);
      const productOfferings = await getOfferingsByVoucher.call(ctx, {
        voucherCode: code,
        headers
      });
      return productOfferings || [];
    },
    { staleTime: productOfferingsCacheTime }
  );
  return [data?.productOfferings || [], isLoading, !!error ? AppError.fromUnknown(error, "VOUCHER") : null];
}

export function refetchProductOfferings() {
  queryClient.invalidateQueries(QueryKeys.PRODUCT_OFFERINGS);
}
