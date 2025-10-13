// src/utils/hbs-helpers.ts
import Handlebars from 'handlebars';

// Helper pour gérer les sections (comme head, scripts, etc.)
Handlebars.registerHelper('section', function(this: any, name: string, options: any) {
  // Si @index vaut "head" → renvoie le bloc head défini via {{#section "head"}}…{{/section}}
  if (name === 'head') {
    return options.fn(this);
  }
  // Sinon renvoie options.fn(this)
  return options.fn(this);
});

export default Handlebars;
