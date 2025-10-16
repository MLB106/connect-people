// src/routes/api/i18n.routes.ts
import { Router } from 'express';
import i18n from '../../config/i18n.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
// Route pour obtenir les traductions d'une langue spécifique
router.get('/translations', async (req, res) => {
    try {
        const { lang = 'fr' } = req.query;
        // Vérifier que la langue est supportée
        const supportedLocales = i18n.getLocales();
        if (!supportedLocales.includes(lang)) {
            return res.status(400).json({
                success: false,
                error: 'Langue non supportée',
                supportedLocales
            });
        }
        // Charger le fichier de traduction
        const localesPath = path.join(__dirname, '..', '..', 'locales', `${lang}.json`);
        try {
            const translationData = await fs.readFile(localesPath, 'utf-8');
            const translations = JSON.parse(translationData);
            return res.json({
                success: true,
                data: translations,
                language: lang
            });
        }
        catch (fileError) {
            console.error(`Erreur lors du chargement du fichier de traduction pour ${lang}:`, fileError);
            // Fallback: utiliser i18n si disponible
            if (i18n.getCatalog && typeof i18n.getCatalog === 'function') {
                const catalog = i18n.getCatalog(lang);
                return res.json({
                    success: true,
                    data: catalog || {},
                    language: lang
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    error: 'Fichier de traduction non trouvé'
                });
            }
        }
    }
    catch (error) {
        console.error('Erreur dans la route /api/i18n/translations:', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
});
// Route pour obtenir toutes les langues supportées
router.get('/languages', (_req, res) => {
    try {
        const supportedLocales = i18n.getLocales();
        const languageNames = {
            fr: 'Français',
            en: 'English',
            es: 'Español',
            it: 'Italiano',
            de: 'Deutsch',
            pt: 'Português',
            ar: 'العربية'
        };
        const languages = supportedLocales.map(locale => ({
            code: locale,
            name: languageNames[locale] || locale,
            flag: getFlagForLanguage(locale)
        }));
        res.json({
            success: true,
            data: languages
        });
    }
    catch (error) {
        console.error('Erreur dans la route /api/i18n/languages:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur'
        });
    }
});
function getFlagForLanguage(locale) {
    const flags = {
        fr: '🇫🇷',
        en: '🇬🇧',
        es: '🇪🇸',
        it: '🇮🇹',
        de: '🇩🇪',
        pt: '🇵🇹',
        ar: '🇸🇦'
    };
    return flags[locale] || '🌐';
}
export default router;
//# sourceMappingURL=i18n.routes.js.map