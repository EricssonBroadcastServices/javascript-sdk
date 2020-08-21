export interface Duration {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export declare const parseSecondsToDuration: (input: number) => Duration;
export declare const parseISOStringToDuration: (durationString: string | undefined) => Duration;
export declare const getTimeString: (date: Date) => string;
export declare const getDurationLocalized: (input: number) => string;
