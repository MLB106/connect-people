// src/routes/web/footer.routes.ts
import { Router } from 'express';
import { SocialLink } from '../../models/socialLink.model.js';
import { AppStoreLink } from '../../models/appStoreLink.model.js';

const router = Router();

router.get('/footer', async (req, res) => {
  try {
    const socials = await SocialLink.find({ isActive: true })
      .select('platform url icon')
      .sort({ order: 1 });
    
    const stores = await AppStoreLink.find({ isActive: true })
      .select('store url')
      .sort({ order: 1 });
    
    const data = { socials, stores };
    
    // Détection du mode : HTML ou JSON
    const acceptHeader = req.get('Accept') || '';
    const isJsonRequest = acceptHeader.includes('application/json') || req.xhr;
    
    if (isJsonRequest) {
      // Mode API : Retourner du JSON
      return res.json({
        success: true,
        data
      });
    }
    
    // Mode HTML : Retourner une vue (si elle existe)
    res.render('partials/footer', data);
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

export default router;
