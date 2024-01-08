/* uniform return type for hooks returning data that is fetched async */

/**
 * [data, isLoading, error]
 * T = return data
 * F = fallback return data
 */
export type TApiHook<T, F = null> = [T | F, boolean, unknown | null];
