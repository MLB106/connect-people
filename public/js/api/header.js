// Fichier : public/js/api/header.js

fetch('/api/search/categories')
  .then(r => r.json())
  .then(cats => {
    const sel = document.getElementById('search-category-select');
    sel.innerHTML = '';
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = c.name[localStorage.getItem('selectedLanguage') || 'fr'];
      sel.appendChild(opt);
    });   // ← 1 seule accolade : fin du forEach
  });       // ← 1 seule accolade : fin du .then
  

