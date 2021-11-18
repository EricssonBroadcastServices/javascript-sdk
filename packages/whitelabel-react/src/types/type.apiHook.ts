/* uniform return type for hooks returning data that is fetched async */

// [data, isLoading, error]
export type TApiHook<T> = [T | null, boolean, unknown | null];
