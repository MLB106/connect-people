// nav-immobilier.js
/* ===========================  API NAV - IMMOBILIER  =========================== */
import { showNotification } from '../common.js';

const LANG = localStorage.getItem('selectedLanguage') || 'fr';

fetch('/api/nav/immobilier')
  .then(r => r.json())
  .then(opts => {
    const banner = document.querySelector('.immobilier-dropdown-banner ul');
    if (!banner) return;

    banner.innerHTML = ''; // vide le HTML statique

    /* groupe par parent_code */
    const parents = opts.filter(o => !o.parent_code);
    const children = opts.filter(o => o.parent_code);

    parents.forEach(p => {
      const li = document.createElement('li');
      li.className = 'immobilier-option';
      li.dataset.option = p.code;
      li.textContent = p.name[LANG] || p.code;

      /* sous-options */
      const subs = children.filter(c => c.parent_code === p.code);
      if (subs.length) {
        const subUl = document.createElement('ul');
        subUl.className = 'sub-vente-list'; // on utilise la même classe pour tous les sous-menus
        subs.forEach(s => {
          const subLi = document.createElement('li');
          subLi.className = 'sub_vente';
          subLi.dataset.option = s.code;
          subLi.textContent = s.name[LANG] || s.code;
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }

      banner.appendChild(li);
    });

    /* attache les events sur les nouveaux éléments */
    banner.querySelectorAll('.immobilier-option').forEach(opt =>
      opt.addEventListener('click', e => {
        const val = e.currentTarget.dataset.option;
        if (opt.querySelector('ul')) return; // a des enfants
        window.closeAllDropdowns();
        showNotification(`Option « ${val} » sélectionnée`, 'info');
      })
    );
    banner.querySelectorAll('.sub_vente').forEach(sub =>
      sub.addEventListener('click', e => {
        e.stopPropagation();
        window.closeAllDropdowns();
        showNotification(`Sous-option « ${sub.dataset.option} » sélectionnée`, 'info');
      })
    );
  })
  .catch(err => console.error('❌ nav-immobilier', err));