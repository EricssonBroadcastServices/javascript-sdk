import { ExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useContext, useMemo } from "react";
import { RedBeeContext } from "..";

// TODO: could probably be part of the RedBeeProvider
export function useExposureApi(): ExposureApi {
  const [{ session, customer, businessUnit, baseUrl }] = useContext(RedBeeContext);

  return useMemo(() => {
    return new ExposureApi({
      baseUrl,
      authHeader: () => {
        if (session?.sessionToken) {
          return { Authorization: `Bearer ${session.sessionToken}` };
        }
        return undefined;
      },
      customer,
      businessUnit,
    });
  }, [session, customer, businessUnit, baseUrl]);
}

export function useWLApi(): WhiteLabelService {
  const exposureApi = useExposureApi();
  const [{ session, customer, businessUnit, baseUrl, deviceGroup }] = useContext(RedBeeContext);
  return useMemo(() => {
    return new WhiteLabelService({
      baseUrl,
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
  }, [session, customer, businessUnit, deviceGroup, baseUrl]);
}
