import { ExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useContext, useMemo } from "react";
import { RedBeeContext } from "..";

export function useExposureApi(): ExposureApi {
  const [{ session, customer, businessUnit, exposureBaseUrl }] = useContext(RedBeeContext);
  return useMemo(() => {
    return new ExposureApi({
      baseUrl: exposureBaseUrl,
      authHeader: () => {
        if (session?.sessionToken) {
          return { Authorization: `Bearer ${session.sessionToken}` };
        }
        return undefined;
      },
      customer,
      businessUnit,
    });
  }, [session, customer, businessUnit, exposureBaseUrl]);
}

export function useWLApi(): WhiteLabelService {
  const exposureApi = useExposureApi();
  const [{ session, customer, businessUnit, internalApiUrl, deviceGroup }] = useContext(RedBeeContext);
  return useMemo(() => {
    return new WhiteLabelService({
      baseUrl: internalApiUrl,
      authHeader: () => {
        if (session?.sessionToken) {
          return { Authorization: `Bearer ${session.sessionToken}` };
        }
        return undefined;
      },
      customer,
      businessUnit,
      deviceGroup,
      exposureApi
    });
  }, [session, customer, businessUnit, deviceGroup, internalApiUrl]);
}
