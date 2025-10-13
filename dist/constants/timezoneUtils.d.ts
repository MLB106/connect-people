export declare const isValidTimezone: (tz: string) => boolean;
export declare const convertToTimezone: (date: Date | string | number, timezone: string, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
export declare const getCurrentTimeInTimezone: (timezone: string, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
export declare const isDaylightSavingTime: (date: Date, timezone: string) => boolean;
