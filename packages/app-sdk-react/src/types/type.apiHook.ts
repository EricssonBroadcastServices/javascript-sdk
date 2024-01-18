import { AppError } from "@ericssonbroadcastservices/app-sdk";
/* uniform return type for hooks returning or mutating data that is fetched async */

type TErrorType = AppError;

export type TApiHook<TReturnData, TFallbackReturnData = null> = [
  TReturnData | TFallbackReturnData,
  boolean,
  TErrorType | null
];

export type TApiMutation<TParams, TReturnData, TFallbackReturnData = null> = [
  (params: TParams) => void,
  TReturnData | TFallbackReturnData,
  boolean,
  TErrorType | null
];
