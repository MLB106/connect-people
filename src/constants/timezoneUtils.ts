// src/constants/timezoneUtils.ts
// À décommenter quand la fonctionnalité « fuseau horaire » sera activée.
// import type { TimezoneEntry } from './timezones';

const validIds = Intl.supportedValuesOf('timeZone');

export const isValidTimezone = (tz: string): boolean =>
  validIds.includes(tz);

export const convertToTimezone = (
  date: Date | string | number,
  timezone: string,
  locale = 'fr-FR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
): string => {
  if (!isValidTimezone(timezone)) {
    throw new Error(`Fuseau horaire inconnu : ${timezone}`);
  }
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: timezone }).format(
    new Date(date)
  );
};

export const getCurrentTimeInTimezone = (
  timezone: string,
  locale = 'fr-FR',
  options?: Intl.DateTimeFormatOptions
): string => convertToTimezone(Date.now(), timezone, locale, options);

export const isDaylightSavingTime = (date: Date, timezone: string): boolean => {
  if (!isValidTimezone(timezone)) return false;
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const stdOffset = jan.getTimezoneOffset();
  const dstOffset = jul.getTimezoneOffset();
  return stdOffset !== dstOffset && date.getTimezoneOffset() === Math.min(stdOffset, dstOffset);
};