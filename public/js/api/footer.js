// footer.js
fetch('/api/footer/links')
  .then(r => r.json())
  .then(({ socials, stores }) => {
    // Affiche le JSON dans la console
    console.log('✅ Footer JSON - Socials :', socials);
    console.log('✅ Footer JSON - Stores :', stores);
  })
  .catch(err => console.error('❌ Erreur footer:', err));