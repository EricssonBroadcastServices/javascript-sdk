/* uniform return type for hooks returning data that is fetched async */

export type TApiHook<T> = [T | null, boolean, unknown | null];
