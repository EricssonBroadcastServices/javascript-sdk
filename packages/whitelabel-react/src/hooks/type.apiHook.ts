/* uniform return type for hooks returning data that is fetched async */

export type TApiHook<T, E extends any[] = []> = [T | null, boolean, ...E];
