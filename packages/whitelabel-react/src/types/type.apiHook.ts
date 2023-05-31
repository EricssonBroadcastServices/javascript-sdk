/* uniform return type for hooks returning data that is fetched async */

// [data, isLoading, error]
export type TApiHook<T, F = null> = [T | F, boolean, unknown | null];
