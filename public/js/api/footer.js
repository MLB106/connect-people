// footer.js
fetch('/api/footer/links')
  .then(r => r.json())
  .then(({ socials, stores }) => {
    console.log('✅ Footer JSON - Socials :', socials);
    console.log('✅ Footer JSON - Stores :', stores);
    
  })
  .catch(err => console.error('❌ Erreur footer:', err));