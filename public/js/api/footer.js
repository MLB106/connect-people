// footer.js
fetch('/api/footer/links')
  .then(r => r.json())
  .then(({ socials, stores }) => {
    // injecte dynamiquement les icônes sociaux + boutons store si tu veux
    console.log('Socials :', socials, 'Stores :', stores);
  });