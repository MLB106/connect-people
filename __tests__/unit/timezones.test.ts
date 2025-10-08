// __tests__/unit/timezones.test.ts
describe('🌍 timezones', () => {
  it('✅ TIMEZONES est un tableau non vide et readonly', () => {
    const { TIMEZONES } = require('../../src/constants/timezones');
    expect(Array.isArray(TIMEZONES)).toBe(true);
    expect(TIMEZONES.length).toBeGreaterThan(0);
    expect(() => (TIMEZONES as any[]).push({})).toThrow();
  });

  it('✅ chaque entrée possède la structure TimezoneEntry', () => {
    const { TIMEZONES } = require('../../src/constants/timezones');
    TIMEZONES.forEach((tz: { city: string; country: string; utc: string }) => {
      expect(typeof tz.city).toBe('string');
      expect(typeof tz.country).toBe('string');
      expect(typeof tz.utc).toBe('string');
      expect(tz.city.length).toBeGreaterThan(0);
    });
  });

  it('✅ contient quelques villes clés', () => {
    const { TIMEZONES } = require('../../src/constants/timezones');
    const cities = TIMEZONES.map((tz: { city: string }) => tz.city);
    expect(cities).toContain('Paris');
    expect(cities).toContain('New York');
    expect(cities).toContain('Tokyo'); // même si pas dans la liste courte, tu peux l’ajouter
  });
});