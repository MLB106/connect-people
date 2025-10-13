# Structure CSS Partials

Ce dossier contient tous les fichiers CSS partiels organisés par composant et par page pour une meilleure maintenabilité.

## Organisation

### Fichiers génériques
- `page-header.css` - Styles pour l'en-tête des pages
- `sections-generiques.css` - Sections communes aux pages
- `features-section.css` - Section des fonctionnalités
- `security-section.css` - Section sécurité et confiance
- `services-grid.css` - Grille des services
- `cta-section.css` - Section d'appel à l'action
- `business-plan.css` - Structure du business plan
- `process-timeline.css` - Timeline du processus
- `featured-helpers.css` - Helpers en vedette
- `about-page.css` - Styles pour la page à propos
- `recent-activity.css` - Activité récente
- `nav-entreprendre.css` - Navigation entreprendre

### Fichiers par catégorie
- `entreprendre-business-plan.css` - Styles spécifiques business plan
- `immobilier-pages.css` - Styles communs aux pages immobilier
- `traduction-pages.css` - Styles communs aux pages traduction
- `politique-cookies.css` - Styles pour la politique des cookies

## Utilisation

Tous ces fichiers sont automatiquement importés via le fichier principal `partials.css` qui est inclus dans le layout principal.

## Ajout de nouveaux styles

1. Créer un nouveau fichier dans ce dossier
2. L'importer dans `partials.css`
3. Suivre la convention de nommage et de commentaires

## Convention de nommage

- `[composant].css` - Pour les composants réutilisables
- `[categorie]-pages.css` - Pour les styles communs à une catégorie
- `page-[nom].css` - Pour les styles spécifiques à une page

## Structure des commentaires

Chaque fichier doit commencer par :
```css
/* ==========  NOM DU COMPOSANT - DESCRIPTION  ========== */
```

Et être organisé en sections avec des commentaires clairs.




