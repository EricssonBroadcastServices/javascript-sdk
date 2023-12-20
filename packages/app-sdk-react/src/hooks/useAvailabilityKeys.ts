import { useQuery } from "react-query";
import { useServiceContext } from "./useApi";
import { useUserSession } from "./useUserSession";
import { QueryKeys } from "../util/react-query";
import { availabilityKeys } from "@ericssonbroadcastservices/rbm-ott-sdk";

export function useAvailabilityKeys(): [string[], boolean] {
  const ctx = useServiceContext();
  const [session] = useUserSession();
  const { data, isLoading } = useQuery(
    [QueryKeys.AVAILABILITY_KEYS, session?.sessionToken],
    () => {
      if (!session?.hasSession()) return undefined;
      const headers = { Authorization: `Bearer ${session?.sessionToken}` };
      return availabilityKeys.call(ctx, { headers });
    },
    { staleTime: 1000 * 60 * 10 }
  );
  return [data?.availabilityKeys || [], isLoading];
}
