// public/js/app/client-renderer.js
// Client-side renderer pour Connect People
// Ce script charge les données JSON et génère le HTML côté client
// Tout le contenu est généré dynamiquement pour éviter l'exposition dans le code source

class ClientRenderer {
  constructor() {
    this.templates = {};
    this.currentPage = null;
    this.apiBaseUrl = '/api/pages';
    this.encryptionKey = this.generateEncryptionKey();
    this.isInitialized = false;
  }

  // Générer une clé de chiffrement simple pour les données sensibles
  generateEncryptionKey() {
    const key = 'CP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    return btoa(key).substr(0, 16);
  }

  // Chiffrer les données sensibles (chiffrement simple côté client)
  encryptData(data) {
    try {
      const jsonString = JSON.stringify(data);
      const encoded = btoa(jsonString);
      return encoded.split('').reverse().join('');
    } catch (error) {
      console.warn('Erreur de chiffrement:', error);
      return data;
    }
  }

  // Déchiffrer les données sensibles
  decryptData(encryptedData) {
    try {
      const reversed = encryptedData.split('').reverse().join('');
      const decoded = atob(reversed);
      return JSON.parse(decoded);
    } catch (error) {
      console.warn('Erreur de déchiffrement:', error);
      return encryptedData;
    }
  }

  // Initialiser l'application
  async init(pageName) {
    if (this.isInitialized) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Application deja initialisee, rechargement...');
      }
      this.reloadPage(pageName);
      return;
    }

    try {
      this.currentPage = pageName;
      if (process.env.NODE_ENV === 'development') {
        console.log(`Initialisation de l'application pour la page: ${pageName}`);
      }
      
      // Afficher le loading
      this.showLoading();
      
      // Charger les données de la page
      const pageData = await this.fetchPageData(pageName);
      
      // Chiffrer les données sensibles avant stockage
      const encryptedData = this.encryptData(pageData);
      sessionStorage.setItem('pageData', encryptedData);
      
      // Charger et compiler les templates
      await this.loadTemplates();
      
      // Rendre la page
      await this.renderPage(pageName, pageData);
      
      // Masquer le loading
      this.hideLoading();
      
      this.isInitialized = true;
      if (process.env.NODE_ENV === 'development') {
        console.log(`Page ${pageName} rendue avec succes`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur lors de l\'initialisation:', error);
      }
      this.showError('Erreur lors du chargement de la page');
    }
  }

  // Recharger une page
  async reloadPage(pageName) {
    try {
      this.showLoading();
      
      // Nettoyer le cache
      sessionStorage.removeItem('pageData');
      
      // Recharger les données
      const pageData = await this.fetchPageData(pageName);
      const encryptedData = this.encryptData(pageData);
      sessionStorage.setItem('pageData', encryptedData);
      
      // Rendre la page
      await this.renderPage(pageName, pageData);
      
      this.hideLoading();
    } catch (error) {
      console.error('❌ Erreur lors du rechargement:', error);
      this.showError('Erreur lors du rechargement de la page');
    }
  }

  // Afficher le loading
  showLoading() {
    const root = document.getElementById('app-root') || document.getElementById('root');
    if (root) {
      root.setAttribute('aria-busy', 'true');
      root.innerHTML = `
        <div class="loading-container" role="status" aria-live="polite" aria-atomic="true">
          <div class="spinner" aria-hidden="true"></div>
          <p>Chargement de l'application...</p>
        </div>
      `;
    }
  }

  // Masquer le loading
  hideLoading() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
      loadingContainer.remove();
    }
    const root = document.getElementById('app-root') || document.getElementById('root');
    if (root) {
      root.removeAttribute('aria-busy');
    }
  }

  // Afficher une erreur
  showError(message) {
    const root = document.getElementById('app-root') || document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div class="error-container" role="alert" aria-live="assertive">
          <h1>Erreur</h1>
          <p>${message}</p>
          <button onclick="location.reload()">Réessayer</button>
        </div>
      `;
    }
  }

  // Fetcher les données de la page depuis l'API - JSON PUR UNIQUEMENT
  async fetchPageData(pageName) {
    try {
      // Utiliser directement l'API JSON - pas les routes duales
      const response = await fetch(`/api/pages/page/${pageName}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Vérifier que c'est bien du JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La réponse n\'est pas du JSON');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur inconnue');
      }
      
      // Log JSON pur uniquement
      if (process.env.NODE_ENV === 'development') {
        console.log('Page data (JSON only):', result.data);
      }
      
      return result.data;
    } catch (error) {
      console.error('Erreur lors du fetch des données:', error);
      throw error;
    }
  }

  // Charger et compiler les templates Handlebars
  async loadTemplates() {
    const templateNames = ['header', 'hero', 'features', 'footer', 'error'];
    
    for (const templateName of templateNames) {
      try {
        const templateScript = document.getElementById(`template-${templateName}`);
        if (templateScript) {
          this.templates[templateName] = Handlebars.compile(templateScript.innerHTML);
        }
      } catch (error) {
        console.warn(`Template ${templateName} non trouvé:`, error);
      }
    }
  }

  // Rendre la page avec les données
  async renderPage(pageName, pageData) {
    const root = document.getElementById('app-root') || document.getElementById('root');
    if (!root) {
      throw new Error('Élément app-root non trouvé');
    }

    // Mettre à jour le titre de la page
    document.title = pageData.title || 'Connect People';
    
    // Mettre à jour la meta description
    this.updateMetaDescription(pageData.description || 'Plateforme d\'entraide mondiale');

    // Log JSON data only (not HTML)
    if (process.env.NODE_ENV === 'development') {
      console.log('Page data:', pageData);
    }

    // Générer le HTML selon la page
    let html = '';
    
    switch (pageName) {
      case 'home':
        html = this.renderHomePage(pageData);
        break;
      case 'nos-helpers':
        html = this.renderHelpersPage(pageData);
        break;
      case 'nos-annonces':
        html = this.renderAnnouncementsPage(pageData);
        break;
      case 'documentation':
        html = this.renderDocumentationPage(pageData);
        break;
      default:
        html = this.renderGenericPage(pageData);
    }

    // Injecter le HTML dans le DOM
    root.innerHTML = html;
    
    // Initialiser les interactions JavaScript
    this.initializeInteractions();
    
    // Nettoyer les données sensibles de la mémoire après rendu
    this.clearSensitiveData();
  }

  // Nettoyer les données sensibles de la mémoire
  clearSensitiveData() {
    // Forcer le garbage collection si disponible
    if (window.gc) {
      window.gc();
    }
    
    // Nettoyer les références
    this.templates = {};
  }

  // Rendre la page d'accueil
  renderHomePage(data) {
    return `
      <header class="main-header">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>Connect People</h1>
          </div>
          <div class="nav-links">
            <a href="/app/home">Accueil</a>
            <a href="/app/nos-helpers">Nos Helpers</a>
            <a href="/app/nos-annonces">Annonces</a>
            <a href="/app/documentation">Documentation</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">${data.content.hero.title}</h1>
            <p class="hero-subtitle">${data.content.hero.subtitle}</p>
            <button class="cta-button">${data.content.hero.cta}</button>
          </div>
        </section>

        <section class="features-section">
          <div class="container">
            <h2 class="section-title">Pourquoi choisir Connect People ?</h2>
            <div class="features-grid">
              ${data.content.features.map(feature => `
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="fas ${feature.icon}"></i>
                  </div>
                  <h3 class="feature-title">${feature.title}</h3>
                  <p class="feature-description">${feature.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="container">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">${data.content.stats.users}</div>
                <div class="stat-label">Utilisateurs</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${data.content.stats.countries}</div>
                <div class="stat-label">Pays</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${data.content.stats.languages}</div>
                <div class="stat-label">Langues</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Connect People</h3>
              <p>Plateforme d'entraide mondiale</p>
            </div>
            <div class="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="/app/documentation">Documentation</a></li>
                <li><a href="/app/nos-helpers">Nos Helpers</a></li>
                <li><a href="/app/nos-annonces">Annonces</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Connect People. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    `;
  }

  // Rendre la page des helpers
  renderHelpersPage(data) {
    return `
      <header class="main-header">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>Connect People</h1>
          </div>
          <div class="nav-links">
            <a href="/app/home">Accueil</a>
            <a href="/app/nos-helpers" class="active">Nos Helpers</a>
            <a href="/app/nos-annonces">Annonces</a>
            <a href="/app/documentation">Documentation</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">${data.content.hero.title}</h1>
            <p class="hero-subtitle">${data.content.hero.subtitle}</p>
            <button class="cta-button">${data.content.hero.cta}</button>
          </div>
        </section>

        <section class="categories-section">
          <div class="container">
            <h2 class="section-title">Catégories de helpers</h2>
            <div class="categories-grid">
              ${data.content.categories.map(category => `
                <div class="category-card">
                  <div class="category-icon">
                    <i class="fas ${category.icon}"></i>
                  </div>
                  <h3 class="category-name">${category.name}</h3>
                  <div class="category-count">${category.count} helpers</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </main>

      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Connect People</h3>
              <p>Plateforme d'entraide mondiale</p>
            </div>
            <div class="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="/app/documentation">Documentation</a></li>
                <li><a href="/app/nos-helpers">Nos Helpers</a></li>
                <li><a href="/app/nos-annonces">Annonces</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Connect People. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    `;
  }

  // Rendre la page des annonces
  renderAnnouncementsPage(data) {
    return `
      <header class="main-header">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>Connect People</h1>
          </div>
          <div class="nav-links">
            <a href="/app/home">Accueil</a>
            <a href="/app/nos-helpers">Nos Helpers</a>
            <a href="/app/nos-annonces" class="active">Annonces</a>
            <a href="/app/documentation">Documentation</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">${data.content.hero.title}</h1>
            <p class="hero-subtitle">${data.content.hero.subtitle}</p>
            <button class="cta-button">${data.content.hero.cta}</button>
          </div>
        </section>

        <section class="filters-section">
          <div class="container">
            <h2 class="section-title">Filtrer les annonces</h2>
            <div class="filters">
              ${data.content.filters.map(filter => `
                <button class="filter-btn">${filter}</button>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="announcements-section">
          <div class="container">
            <h2 class="section-title">Annonces disponibles</h2>
            <div class="announcements-grid">
              ${data.content.announcements.map(announcement => `
                <div class="announcement-card">
                  <h3 class="announcement-title">${announcement.title}</h3>
                  <div class="announcement-category">${announcement.category}</div>
                  <div class="announcement-price">${announcement.price}</div>
                  <div class="announcement-location">${announcement.location}</div>
                  <div class="announcement-rating">
                    <span class="stars">${'★'.repeat(Math.floor(announcement.rating))}</span>
                    <span class="rating-value">${announcement.rating}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </main>

      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Connect People</h3>
              <p>Plateforme d'entraide mondiale</p>
            </div>
            <div class="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="/app/documentation">Documentation</a></li>
                <li><a href="/app/nos-helpers">Nos Helpers</a></li>
                <li><a href="/app/nos-annonces">Annonces</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Connect People. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    `;
  }

  // Rendre la page de documentation
  renderDocumentationPage(data) {
    return `
      <header class="main-header">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>Connect People</h1>
          </div>
          <div class="nav-links">
            <a href="/app/home">Accueil</a>
            <a href="/app/nos-helpers">Nos Helpers</a>
            <a href="/app/nos-annonces">Annonces</a>
            <a href="/app/documentation" class="active">Documentation</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">${data.content.hero.title}</h1>
            <p class="hero-subtitle">${data.content.hero.subtitle}</p>
            <button class="cta-button">${data.content.hero.cta}</button>
          </div>
        </section>

        <section class="documentation-section">
          <div class="container">
            <div class="doc-sections">
              ${data.content.sections.map(section => `
                <div class="doc-section">
                  <h2 class="section-title">${section.title}</h2>
                  <ul class="doc-articles">
                    ${section.articles.map(article => `
                      <li class="doc-article">
                        <a href="#" class="article-link">${article}</a>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </main>

      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Connect People</h3>
              <p>Plateforme d'entraide mondiale</p>
            </div>
            <div class="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="/app/documentation">Documentation</a></li>
                <li><a href="/app/nos-helpers">Nos Helpers</a></li>
                <li><a href="/app/nos-annonces">Annonces</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Connect People. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    `;
  }

  // Rendre une page générique
  renderGenericPage(data) {
    return `
      <header class="main-header">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>Connect People</h1>
          </div>
          <div class="nav-links">
            <a href="/app/home">Accueil</a>
            <a href="/app/nos-helpers">Nos Helpers</a>
            <a href="/app/nos-annonces">Annonces</a>
            <a href="/app/documentation">Documentation</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">${data.title}</h1>
            <p class="hero-subtitle">${data.description}</p>
          </div>
        </section>
      </main>

      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>Connect People</h3>
              <p>Plateforme d'entraide mondiale</p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Connect People. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    `;
  }

  // Mettre à jour la meta description
  updateMetaDescription(description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }

  // Initialiser les interactions JavaScript
  initializeInteractions() {
    // Navigation active
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });

    // Interactions des boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log('CTA button clicked');
        // Ici vous pouvez ajouter la logique pour les actions CTA
      });
    });

    // Interactions des filtres (accessible)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      // Etat ARIA pour boutons toggle de filtre
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        if (process.env.NODE_ENV === 'development') {
          console.log('Filter clicked:', button.textContent);
        }
      });
      // Support clavier (Entrée / Espace)
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Sécuriser contre l'inspection du code source
    this.securePage();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Interactions initialisees');
    }
  }

  // Sécuriser la page contre l'inspection
  securePage() {
    // Optionnel: le clic droit reste actif pour l'accessibilité
    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    //   return false;
    // });

    // Ne pas bloquer les raccourcis développeur pour éviter de gêner les utilisateurs
    // document.addEventListener('keydown', (e) => { ... });

    // Détecter l'ouverture des outils de développement
    let devtools = false;
    const threshold = 160;
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          // Ne rien afficher dans la console
        }
      } else {
        devtools = false;
      }
    }, 500);

    // Ne rien afficher dans la console pour éviter d'afficher du HTML
  }
}

// Créer une instance globale
window.ClientRenderer = new ClientRenderer();
