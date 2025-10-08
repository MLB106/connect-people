/* ===========================  API NAV - ENTREPRENDRE  =========================== */
import { showNotification } from '../common.js';

const LANG = localStorage.getItem('selectedLanguage') || 'fr';

fetch('/api/nav/entreprendre')
  .then(r => r.json())
  .then(opts => {
    const banner = document.querySelector('.entreprendre-dropdown-banner ul');
    if (!banner) return;

    banner.innerHTML = '';

    const parents = opts.filter(o => !o.parent_code);
    const children = opts.filter(o => o.parent_code);

    parents.forEach(p => {
      const li = document.createElement('li');
      li.className = 'entreprendre-option';
      li.dataset.option = p.code;
      li.textContent = p.name[LANG] || p.code;

      const subs = children.filter(c => c.parent_code === p.code);
      if (subs.length) {
        const subUl = document.createElement('ul');
        subUl.className = 'sub-sourcing-list';
        subs.forEach(s => {
          const subLi = document.createElement('li');
          subLi.className = 'sub_sourcing';
          subLi.dataset.option = s.code;
          subLi.textContent = s.name[LANG] || s.code;
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }

      banner.appendChild(li);
    });

    banner.querySelectorAll('.entreprendre-option').forEach(opt =>
      opt.addEventListener('click', e => {
        const val = e.currentTarget.dataset.option;
        if (opt.querySelector('ul')) return;
        window.closeAllDropdowns();
        showNotification(`Option « ${val} » sélectionnée`, 'info');
      })
    );
    banner.querySelectorAll('.sub_sourcing').forEach(sub =>
      sub.addEventListener('click', e => {
        e.stopPropagation();
        window.closeAllDropdowns();
        showNotification(`Sous-option « ${sub.dataset.option} » sélectionnée`, 'info');
      })
    );
  })
  .catch(err => console.error('❌ nav-entreprendre', err));