// src/utils/hbs-helpers.ts
import Handlebars from 'handlebars';
// Helper pour gérer les sections (comme head, scripts, etc.)
Handlebars.registerHelper('section', function (name, options) {
    // Si @index vaut "head" → renvoie le bloc head défini via {{#section "head"}}…{{/section}}
    if (name === 'head') {
        return options.fn(this);
    }
    // Sinon renvoie options.fn(this)
    return options.fn(this);
});
export default Handlebars;
//# sourceMappingURL=hbs-helpers.js.map