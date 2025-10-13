import { NavOption } from '../models/navOption.model.js';
export const getTraductionOptions = async (_req, res) => {
    try {
        const options = await NavOption.find({
            menu: 'traduction',
            isActive: true
        })
            .select('code name parentCode')
            .sort({ parentCode: 1, order: 1 });
        res.json(options);
    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erreur lors de la recuperation des options traduction:', error instanceof Error ? error.message : 'Erreur inconnue');
        }
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
//# sourceMappingURL=nav-traduction.controller.js.map