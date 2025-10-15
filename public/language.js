// Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
  const languageMessages = {
    'fr': 'Vous avez choisi de poursuivre en français 🇫🇷',
    'en': 'You have chosen to continue in English 🇬🇧', 
    'de': 'Sie haben gewählt, auf Deutsch fortzufahren 🇩🇪',
    'es': 'Has elegido continuar en español 🇪🇸',
    'it': 'Hai scelto di continuare in italiano 🇮🇹',
    'pt': 'Você escolheu continuar em português 🇵🇹',
    'ar': 'لقد اخترت المتابعة باللغة العربية 🇸🇦'
  };
  
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.addEventListener('change', function(e) {
      const message = languageMessages[e.target.value];
      if (message) {
        alert(message);
      }
    });
    console.log('✅ Sélecteur de langue configuré');
  }
});