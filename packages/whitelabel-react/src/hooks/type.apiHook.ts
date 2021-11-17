export type TApiHook<T, E extends any[] = []> = [T | null, boolean, ...E];
