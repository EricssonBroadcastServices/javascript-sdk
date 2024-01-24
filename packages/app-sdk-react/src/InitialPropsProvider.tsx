import { DeviceRegistration } from "@ericssonbroadcastservices/rbm-ott-sdk";

import React, { useEffect, useState } from "react";
import { IStorage } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { getInitialStateByCustomerAndBusinessUnit, getInitialStateByOrigin } from "./util/initial-props";
import { DeviceGroup, GetEssentialAppDataByOriginOptions } from "@ericssonbroadcastservices/app-sdk";

export const InitialPropsContext = React.createContext<IRedBeeState>({} as IRedBeeState);

interface IInitialPropsProvider {
  storage?: IStorage;
  baseUrl: string;
  customer?: string;
  businessUnit?: string;
  origin?: GetEssentialAppDataByOriginOptions;
  deviceRegistration: Required<DeviceRegistration>;
  children?: React.ReactNode;
  deviceGroup: DeviceGroup;
  onSessionValidationError?: (err: unknown) => void;
  sessionToken?: string;
}

export function InitialPropsProvider({
  children,
  storage,
  customer,
  businessUnit,
  origin,
  baseUrl,
  deviceRegistration,
  deviceGroup,
  onSessionValidationError,
  sessionToken
}: IInitialPropsProvider) {
  const [state, setState] = useState<IRedBeeState | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function initStorage() {
      if (customer && businessUnit) {
        const state = await getInitialStateByCustomerAndBusinessUnit({
          customer,
          businessUnit,
          baseUrl,
          sessionToken,
          storage,
          deviceGroup,
          deviceRegistration,
          onSessionValidationError
        });
        setState(state);
        setIsReady(true);
      } else if (origin) {
        const state = await getInitialStateByOrigin({
          origin,
          baseUrl,
          sessionToken,
          storage,
          deviceGroup,
          deviceRegistration,
          onSessionValidationError
        });
        setState(state);
        setIsReady(true);
      } else {
        console.error("Either customer & businessUnit, or origin have to be provided");
      }
    }
    initStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isReady || !state) return null;
  return <InitialPropsContext.Provider value={state}>{children}</InitialPropsContext.Provider>;
}
