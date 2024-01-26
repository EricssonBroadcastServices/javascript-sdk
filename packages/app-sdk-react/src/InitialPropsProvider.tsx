import { DeviceRegistration } from "@ericssonbroadcastservices/rbm-ott-sdk";

import React from "react";
import { IStorage, QueryKeys } from ".";
import { IRedBeeState } from "./RedBeeProvider";
import { getInitialStateByCustomerAndBusinessUnit, getInitialStateByOrigin } from "./util/initial-props";
import { AppError, DeviceGroup, GetEssentialAppDataByOriginOptions } from "@ericssonbroadcastservices/app-sdk";
import { useQuery } from "react-query";

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
  onUnrecoverableInitialError: (err: AppError) => void;
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
  sessionToken,
  onUnrecoverableInitialError
}: IInitialPropsProvider) {
  const { data, isFetched, error } = useQuery(
    [QueryKeys.ESSENTIAL_APP_DATA],
    async () => {
      if (customer && businessUnit) {
        return await getInitialStateByCustomerAndBusinessUnit({
          customer,
          businessUnit,
          baseUrl,
          sessionToken,
          storage,
          deviceGroup,
          deviceRegistration,
          onSessionValidationError
        }).catch(err => {
          const error = AppError.fromUnknown(err);

          // communicate unrecoverable error to parent components
          onUnrecoverableInitialError(error);

          // throw error to avoid rendering children with an invalid state
          throw error;
        });
      } else if (origin) {
        return await getInitialStateByOrigin({
          origin,
          baseUrl,
          sessionToken,
          storage,
          deviceGroup,
          deviceRegistration,
          onSessionValidationError
        }).catch(err => {
          const error = AppError.fromUnknown(err);

          // communicate unrecoverable error to parent components
          onUnrecoverableInitialError(error);

          // throw error to avoid rendering children with an invalid state
          throw error;
        });
      } else {
        throw new Error("Either customer & businessUnit, or origin have to be provided");
      }
    },
    { staleTime: 1000 * 60 * 60 * 24 }
  );
  if (!isFetched || !data || !!error) return null;
  return <InitialPropsContext.Provider value={data}>{children}</InitialPropsContext.Provider>;
}
