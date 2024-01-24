/* uniform return type for hooks returning data that is fetched async */

import { AppError } from "@ericssonbroadcastservices/app-sdk";

// [data, isLoading, error]
export type TApiHook<T, F = null> = [T | F, boolean, AppError | null];
