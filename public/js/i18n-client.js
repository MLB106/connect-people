/* ===========================  CLIENT I18N SYSTEM  =========================== */

class ClientI18n {
  constructor() {
    this.translations = {};
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    this.loadTranslations();
  }

  async loadTranslations() {
    try {
      const response = await fetch(`/api/i18n/translations?lang=${this.currentLanguage}`);
      if (response.ok) {
        this.translations = await response.json();
      } else {
        // Fallback: charger les traductions depuis les fichiers statiques
        await this.loadFallbackTranslations();
      }
    } catch (error) {
      console.warn('Impossible de charger les traductions depuis l\'API, utilisation du fallback:', error);
      await this.loadFallbackTranslations();
    }
  }

  async loadFallbackTranslations() {
    try {
      const response = await fetch(`/locales/${this.currentLanguage}.json`);
      if (response.ok) {
        this.translations = await response.json();
      }
    } catch (error) {
      console.error('Impossible de charger les traductions de fallback:', error);
      // Utiliser les traductions par défaut
      this.translations = {
        modal: {
          languageConfirmation: {
            title: "Confirmation de langue",
            activated: "Langue {{language}} activée",
            success: "La langue a été changée avec succès"
          }
        }
      };
    }
  }

  setLanguage(languageCode) {
    this.currentLanguage = languageCode;
    localStorage.setItem('selectedLanguage', languageCode);
    this.loadTranslations();
  }

  translate(key, variables = {}) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Traduction manquante pour la clé: ${key}`);
        return key; // Retourner la clé si la traduction n'existe pas
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Valeur de traduction invalide pour la clé: ${key}`);
      return key;
    }

    // Remplacer les variables {{variable}} dans la traduction
    return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return variables[variable] || match;
    });
  }

  getLanguageNames() {
    return {
      fr: 'Français',
      en: 'English',
      es: 'Español',
      it: 'Italiano',
      de: 'Deutsch',
      pt: 'Português',
      ar: 'العربية'
    };
  }
}

// Instance globale
window.i18n = new ClientI18n();

// Fonction utilitaire pour les traductions
window.__ = (key, variables = {}) => {
  return window.i18n.translate(key, variables);
};
