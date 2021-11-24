import { useCallback, useEffect, useState } from "react";
import { useSetSession } from "./useUserSession";
import { useExposureApi } from "./useApi";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { IDeviceInfo } from "@ericssonbroadcastservices/exposure-sdk";

interface IActivationCodeData {
  code: string;
  expires: Date;
  isOverDeviceLimit: boolean;
  refresh: () => void;
}

interface IActionvationCodeOptions {
  updateInterval?: number;
}

export function useActivationCode({ updateInterval = 5000 }: IActionvationCodeOptions): TApiHook<IActivationCodeData> {
  const { customer, businessUnit, device } = useRedBeeState();
  const setSession = useSetSession();
  const exposureApi = useExposureApi();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isOverDeviceLimit, setIsOverDeviceLimit] = useState(false);
  const [data, setData] = useState<{ code: string; expires: Date } | null>(null);
  const [codeError, setCodeError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [timeoutAttempt, setTimeoutAttempt] = useState<number>(1);

  // refresh function to get new code
  const refresh = useCallback(() => {
    if (!isLoading) {
      setIsOverDeviceLimit(false);
      setRefreshCounter(prevState => ++prevState);
    }
  }, [isLoading]);

  // Poll code every 5s
  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        exposureApi.user
          .consumeActivationCode({
            customer,
            businessUnit,
            code: data.code,
            device: device as IDeviceInfo
          })
          .then(loginResponse => {
            if (loginResponse.isOverDeviceLimit) {
              setRefreshCounter(prevState => ++prevState);
              setIsOverDeviceLimit(true);
            } else {
              clearTimeout(timeout);
              setSession(loginResponse);
            }
          })
          .catch(err => {
            setTimeoutAttempt(timeoutAttempt + 1);
          });
      }, updateInterval);
      return () => {
        clearTimeout(timeout);
      };
    }
    return;
    // can't, and don't need to, add exposure as dependancy
  }, [data, timeoutAttempt, device, customer, businessUnit, setSession]);

  // Get the login code
  useEffect(() => {
    if (customer && businessUnit) {
      setData(null);
      setCodeError(null);
      setIsLoading(true);
      exposureApi.user
        .getActivationCode({
          customer,
          businessUnit
        })
        .then(data => {
          setData({
            code: data.code,
            expires: new Date(data.expires)
          });
        })
        .catch(err => {
          setCodeError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // can't, and don't need to, add exposure as dependancy
  }, [customer, businessUnit, refreshCounter]);

  return [{ ...(data as IActivationCodeData), refresh, isOverDeviceLimit }, isLoading, codeError];
}
