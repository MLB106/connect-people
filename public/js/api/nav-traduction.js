/* ===========================  API NAV - TRADUCTION  =========================== */
import { showNotification } from '../common.js';

const LANG = localStorage.getItem('selectedLanguage') || 'fr';

fetch('/api/nav/traduction')
  .then(r => r.json())
  .then(opts => {
    const banner = document.querySelector('.traduction-dropdown-banner ul');
    if (!banner) return;

    banner.innerHTML = '';

    const parents = opts.filter(o => !o.parent_code);
    const children = opts.filter(o => o.parent_code);

    parents.forEach(p => {
      const li = document.createElement('li');
      li.className = 'traduction-option';
      li.dataset.option = p.code;
      li.textContent = p.name[LANG] || p.code;

      const subs = children.filter(c => c.parent_code === p.code);
      if (subs.length) {
        const subUl = document.createElement('ul');
        subUl.className = 'sub-acts-list';
        subs.forEach(s => {
          const subLi = document.createElement('li');
          subLi.className = 'sub_acts_list';
          subLi.dataset.option = s.code;
          subLi.textContent = s.name[LANG] || s.code;
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }

      banner.appendChild(li);
    });

    banner.querySelectorAll('.traduction-option').forEach(opt =>
      opt.addEventListener('click', e => {
        const val = e.currentTarget.dataset.option;
        if (opt.querySelector('ul')) return;
        window.closeAllDropdowns();
        showNotification(`Option « ${val} » sélectionnée`, 'info');
      })
    );
    banner.querySelectorAll('.sub_acts_list').forEach(sub =>
      sub.addEventListener('click', e => {
        e.stopPropagation();
        window.closeAllDropdowns();
        showNotification(`Sous-option « ${sub.dataset.option} » sélectionnée`, 'info');
      })
    );
  })
  .catch(err => console.error('❌ nav-traduction', err));