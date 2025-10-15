// Fichier : public/js/api/header.js

fetch('/api/search/categories')
  .then(r => r.json())
  .then(cats => {
    console.log('✅ Header JSON - Categories:', cats);
    const sel = document.getElementById('search-category-select');
    if (sel) {
      sel.innerHTML = '';
      cats.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.textContent = c.name[localStorage.getItem('selectedLanguage') || 'fr'];
        sel.appendChild(opt);
      });
    }
  })
  .catch(err => console.error('❌ Erreur header:', err));