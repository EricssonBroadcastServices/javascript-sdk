import { useCallback, useEffect, useState } from "react";
import { consumeActivationCode, createActivationCode } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useSetSession } from "./useUserSession";
import { useRedBeeState } from "../RedBeeProvider";
import { TApiHook } from "../types/type.apiHook";
import { AppError } from "@ericssonbroadcastservices/app-sdk";

interface IActivationCodeData {
  code?: string;
  expires?: Date;
  isOverDeviceLimit: boolean;
  refresh: () => void;
}

interface IActionvationCodeOptions {
  updateInterval?: number;
}

export function useActivationCode({
  updateInterval = 5000
}: IActionvationCodeOptions): TApiHook<IActivationCodeData, IActivationCodeData> {
  const { customer, businessUnit, serviceContext, deviceRegistration } = useRedBeeState();
  const setSession = useSetSession();
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
      const timeout = setTimeout(async () => {
        consumeActivationCode
          .call(serviceContext, { device: deviceRegistration, activationCode: data.code })
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
    // can't, and don't need to, add exposure as dependency
  }, [data, timeoutAttempt, deviceRegistration, customer, businessUnit, setSession, updateInterval, serviceContext]);

  // Get the login code
  useEffect(() => {
    if (customer && businessUnit) {
      setData(null);
      setCodeError(null);
      setIsLoading(true);
      createActivationCode
        .call(serviceContext)
        .then(data => {
          setData({
            code: data.code,
            expires: new Date(data.expires)
          });
        })
        .catch(err => {
          setCodeError(AppError.fromUnknown(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // can't, and don't need to, add exposure as dependency
  }, [customer, businessUnit, refreshCounter, serviceContext]);

  return [{ ...data, refresh, isOverDeviceLimit }, isLoading, codeError];
}
