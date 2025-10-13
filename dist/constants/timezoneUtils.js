// src/constants/timezoneUtils.ts
// À décommenter quand la fonctionnalité « fuseau horaire » sera activée.
// import type { TimezoneEntry } from './timezones';
const validIds = Intl.supportedValuesOf('timeZone');
export const isValidTimezone = (tz) => validIds.includes(tz);
export const convertToTimezone = (date, timezone, locale = 'fr-FR', options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}) => {
    if (!isValidTimezone(timezone)) {
        throw new Error(`Fuseau horaire inconnu : ${timezone}`);
    }
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: timezone }).format(new Date(date));
};
export const getCurrentTimeInTimezone = (timezone, locale = 'fr-FR', options) => convertToTimezone(Date.now(), timezone, locale, options);
export const isDaylightSavingTime = (date, timezone) => {
    if (!isValidTimezone(timezone))
        return false;
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const stdOffset = jan.getTimezoneOffset();
    const dstOffset = jul.getTimezoneOffset();
    return stdOffset !== dstOffset && date.getTimezoneOffset() === Math.min(stdOffset, dstOffset);
};
//# sourceMappingURL=timezoneUtils.js.map