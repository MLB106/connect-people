// __tests__/unit/timezoneUtils.test.ts
/**
 * @jest-environment jsdom
 * fournit Intl.supportedValuesOf + Intl.DateTimeFormat
 */
import { describe, test, expect } from '@jest/globals';
import {
  isValidTimezone,
  convertToTimezone,
  getCurrentTimeInTimezone,
  isDaylightSavingTime,
} from '../../src/constants/timezoneUtils.js';   // <-- extension .js requise en ESM

describe('timezoneUtils (ES2022)', () => {
  test('isValidTimezone accepte un fuseau réel', () => {
    expect(isValidTimezone('Europe/Paris')).toBe(true);
  });

  test('isValidTimezone rejette un faux fuseau', () => {
    expect(isValidTimezone('Fake/Zone')).toBe(false);
  });

  test('convertToTimezone retourne une chaîne formatée', () => {
    const res = convertToTimezone('2024-06-01T12:00:00Z', 'Europe/Paris');
    expect(res).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
  });

  test('convertToTimezone lève sur fuseau inconnu', () => {
    expect(() => convertToTimezone(new Date(), 'Bad/Zone')).toThrow(/Fuseau horaire inconnu/);
  });

  test('getCurrentTimeInTimezone retourne une chaîne', () => {
    expect(typeof getCurrentTimeInTimezone('Europe/Berlin')).toBe('string');
  });

  test('isDaylightSavingTime retourne un booléen', () => {
    expect(typeof isDaylightSavingTime(new Date('2024-07-01'), 'Europe/Paris')).toBe('boolean');
  });
});