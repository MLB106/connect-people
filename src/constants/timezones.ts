// src/constants/timezones.ts
// À décommenter quand la fonctionnalité « fuseau horaire » sera activée.

export interface TimezoneEntry {
  city: string;
  country: string;
  utc: string;
}

export const TIMEZONES = Object.freeze([
  { city: 'Londres', country: 'Royaume-Uni', utc: 'UTC+0 (UTC+1 en été)' },
  { city: 'Paris', country: 'France', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Berlin', country: 'Allemagne', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Madrid', country: 'Espagne', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Rome', country: 'Italie', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Moscou', country: 'Russie', utc: 'UTC+3' },
  { city: 'Istanbul', country: 'Turquie', utc: 'UTC+3' },
  { city: 'Kiev', country: 'Ukraine', utc: 'UTC+2 (UTC+3 en été)' },
  { city: 'Amsterdam', country: 'Pays-Bas', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Vienne', country: 'Autriche', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Varsovie', country: 'Pologne', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Bucarest', country: 'Roumanie', utc: 'UTC+2 (UTC+3 en été)' },
  { city: 'Stockholm', country: 'Suède', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Budapest', country: 'Hongrie', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Lisbonne', country: 'Portugal', utc: 'UTC+0 (UTC+1 en été)' },
  { city: 'Copenhague', country: 'Danemark', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Dublin', country: 'Irlande', utc: 'UTC+0 (UTC+1 en été)' },
  { city: 'Helsinki', country: 'Finlande', utc: 'UTC+2 (UTC+3 en été)' },
  { city: 'Oslo', country: 'Norvège', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Prague', country: 'République tchèque', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Athènes', country: 'Grèce', utc: 'UTC+2 (UTC+3 en été)' },
  { city: 'Belgrade', country: 'Serbie', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Sofia', country: 'Bulgarie', utc: 'UTC+2 (UTC+3 en été)' },
  { city: 'Zurich', country: 'Suisse', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'Bruxelles', country: 'Belgique', utc: 'UTC+1 (UTC+2 en été)' },
  { city: 'New York', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Los Angeles', country: 'États-Unis', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Chicago', country: 'États-Unis', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Toronto', country: 'Canada', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Mexico', country: 'Mexique', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Vancouver', country: 'Canada', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Miami', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Montréal', country: 'Canada', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Dallas', country: 'États-Unis', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Houston', country: 'États-Unis', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Phoenix', country: 'États-Unis', utc: 'UTC-7 (pas de changement d\'heure)' },
  { city: 'San Francisco', country: 'États-Unis', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Denver', country: 'États-Unis', utc: 'UTC-7 (UTC-6 en été)' },
  { city: 'Calgary', country: 'Canada', utc: 'UTC-7 (UTC-6 en été)' },
  { city: 'Guadalajara', country: 'Mexique', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Washington D.C.', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Boston', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Atlanta', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Seattle', country: 'États-Unis', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'San Diego', country: 'États-Unis', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Las Vegas', country: 'États-Unis', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Detroit', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Philadelphia', country: 'États-Unis', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Minneapolis', country: 'États-Unis', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Ottawa', country: 'Canada', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Edmonton', country: 'Canada', utc: 'UTC-7 (UTC-6 en été)' },
  { city: 'Québec', country: 'Canada', utc: 'UTC-5 (UTC-4 en été)' },
  { city: 'Winnipeg', country: 'Canada', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Monterrey', country: 'Mexique', utc: 'UTC-6 (UTC-5 en été)' },
  { city: 'Tijuana', country: 'Mexique', utc: 'UTC-8 (UTC-7 en été)' },
  { city: 'Tokyo', country: 'Japon', utc: 'UTC+9' },
] as const);

// export const getAllTimezones = () => TIMEZONES;

// export const getTimezoneInfo = (query: string): TimezoneEntry | null => {
//   const q = query.trim().toLowerCase();
//   return TIMEZONES.find(
//     tz =>
//       tz.city.toLowerCase() === q ||
//       tz.country.toLowerCase() === q
//   ) ?? null;
// };




