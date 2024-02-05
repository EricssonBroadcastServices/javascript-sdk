import { AppError, TErrorType } from "@ericssonbroadcastservices/app-sdk";
import { useMemo } from "react";

export function useAppError(error: unknown, errorType?: TErrorType): AppError | null {
  const err = useMemo(() => {
    return !!error ? AppError.fromUnknown(error, errorType) : null;
  }, [error, errorType]);
  return err;
}
