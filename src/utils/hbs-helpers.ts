/**
 * @file src/utils/hbs-helpers.ts
 * @description Handlebars helpers with strict ES2023 syntax and TypeScript types
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import Handlebars, { type HelperOptions, type HelperDelegate } from 'handlebars';

/**
 * Handlebars context interface
 */
interface HandlebarsContext {
  [key: string]: unknown;
}

/**
 * Section helper for managing content sections (head, scripts, etc.)
 * @param {string} name - Section name
 * @param {HelperOptions} options - Handlebars helper options
 * @returns {string} Rendered section content
 */
const sectionHelper: HelperDelegate = function(
  this: HandlebarsContext, 
  name: string, 
  options: HelperOptions
): string {
  if (typeof name !== 'string') {
    throw new Error('Section name must be a string');
  }

  if (!options || typeof options.fn !== 'function') {
    throw new Error('Invalid Handlebars options');
  }

  // Store section content in the context
  if (!this.sections) {
    this.sections = {};
  }

  const sections = this.sections as Record<string, string>;
  sections[name] = options.fn(this);
  
  return '';
};

/**
 * Yield helper for rendering stored sections
 * @param {string} name - Section name to yield
 * @param {HelperOptions} options - Handlebars helper options
 * @returns {string} Rendered section content
 */
const yieldHelper: HelperDelegate = function(
  this: HandlebarsContext, 
  name: string, 
  options: HelperOptions
): string {
  if (typeof name !== 'string') {
    throw new Error('Section name must be a string');
  }

  const sections = this.sections as Record<string, string> | undefined;
  return sections?.[name] ?? '';
};

/**
 * Format date helper
 * @param {Date | string} date - Date to format
 * @param {string} format - Date format string
 * @returns {string} Formatted date
 */
const formatDateHelper: HelperDelegate = function(
  this: HandlebarsContext,
  date: Date | string,
  format: string
): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Simple date formatting - you can enhance this with a proper date library
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (format === 'short') {
    options.month = 'short';
  } else if (format === 'time') {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return dateObj.toLocaleDateString('fr-FR', options);
};

/**
 * JSON stringify helper
 * @param {unknown} obj - Object to stringify
 * @param {HelperOptions} options - Handlebars helper options
 * @returns {string} JSON string
 */
const jsonHelper: HelperDelegate = function(
  this: HandlebarsContext,
  obj: unknown,
  options: HelperOptions
): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    console.error('JSON stringify error:', error);
    return '{}';
  }
};

/**
 * Equality helper
 * @param {unknown} a - First value
 * @param {unknown} b - Second value
 * @param {HelperOptions} options - Handlebars helper options
 * @returns {string} Rendered content if equal
 */
const eqHelper: HelperDelegate = function(
  this: HandlebarsContext,
  a: unknown,
  b: unknown,
  options: HelperOptions
): string {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse ? options.inverse(this) : '';
};

/**
 * Not equality helper
 * @param {unknown} a - First value
 * @param {unknown} b - Second value
 * @param {HelperOptions} options - Handlebars helper options
 * @returns {string} Rendered content if not equal
 */
const neqHelper: HelperDelegate = function(
  this: HandlebarsContext,
  a: unknown,
  b: unknown,
  options: HelperOptions
): string {
  if (a !== b) {
    return options.fn(this);
  }
  return options.inverse ? options.inverse(this) : '';
};

/**
 * Initialize Handlebars helpers
 * @description Register all custom helpers with Handlebars
 */
const initializeHelpers = (): void => {
  Handlebars.registerHelper('section', sectionHelper);
  Handlebars.registerHelper('yield', yieldHelper);
  Handlebars.registerHelper('formatDate', formatDateHelper);
  Handlebars.registerHelper('json', jsonHelper);
  Handlebars.registerHelper('eq', eqHelper);
  Handlebars.registerHelper('neq', neqHelper);
};

// Initialize helpers
initializeHelpers();

export default Handlebars;
