// scripts/seed.ts
import { initializeDatabase } from '../src/config/database.js';
import { User } from '../src/models/user.model.js';
import { AdminUser } from '../src/models/adminUser.model.js';
import { SearchCategory } from '../src/models/searchCategory.model.js';
import { SocialLink } from '../src/models/socialLink.model.js';
import { AppStoreLink } from '../src/models/appStoreLink.model.js';
import { NavOption } from '../src/models/navOption.model.js';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  try {
    console.log('🌱 Démarrage du seed de la base de données...');
    
    // Initialiser la connexion MongoDB
    await initializeDatabase();
    
    // Nettoyer les collections existantes
    await User.deleteMany({});
    await AdminUser.deleteMany({});
    await SearchCategory.deleteMany({});
    await SocialLink.deleteMany({});
    await AppStoreLink.deleteMany({});
    await NavOption.deleteMany({});
    
    console.log('🧹 Collections nettoyées');
    
    // 1. Créer des utilisateurs
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        email: 'user1@example.com',
        password: hashedPassword,
        firstName: 'Jean',
        lastName: 'Dupont',
        role: 'user',
        isActive: true,
        emailVerified: true,
      },
      {
        email: 'user2@example.com',
        password: hashedPassword,
        firstName: 'Marie',
        lastName: 'Martin',
        role: 'premium',
        isActive: true,
        emailVerified: true,
      },
      {
        email: 'user3@example.com',
        password: hashedPassword,
        firstName: 'Pierre',
        lastName: 'Durand',
        role: 'admin',
        isActive: true,
        emailVerified: false,
      },
    ]);
    
    console.log(`✅ ${users.length} utilisateurs créés`);
    
    // 2. Créer des administrateurs
    const adminUsers = await AdminUser.create([
      {
        email: 'admin1@connect-people.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Principal',
        role: 'president',
        isActive: true,
      },
      {
        email: 'admin2@connect-people.com',
        password: hashedPassword,
        firstName: 'Moderator',
        lastName: 'Test',
        role: 'moderator',
        isActive: true,
      },
    ]);
    
    console.log(`✅ ${adminUsers.length} administrateurs créés`);
    
    // 3. Créer des catégories de recherche
    const searchCategories = await SearchCategory.create([
      {
        code: 'help',
        name: {
          fr: 'Centre d\'aide',
          en: 'Help Center',
          ar: 'مركز المساعدة',
          de: 'Hilfezentrum',
          es: 'Centro de ayuda',
          it: 'Centro assistenza',
          pt: 'Centro de ajuda',
        },
        order: 1,
        isActive: true,
      },
      {
        code: 'contact',
        name: {
          fr: 'Contact',
          en: 'Contact',
          ar: 'اتصل بنا',
          de: 'Kontakt',
          es: 'Contacto',
          it: 'Contatto',
          pt: 'Contato',
        },
        order: 2,
        isActive: true,
      },
      {
        code: 'about',
        name: {
          fr: 'À propos',
          en: 'About',
          ar: 'حول',
          de: 'Über uns',
          es: 'Acerca de',
          it: 'Chi siamo',
          pt: 'Sobre',
        },
        order: 3,
        isActive: true,
      },
    ]);
    
    console.log(`✅ ${searchCategories.length} catégories de recherche créées`);
    
    // 4. Créer des liens sociaux
    const socialLinks = await SocialLink.create([
      {
        platform: 'Facebook',
        url: 'https://facebook.com/connect-people',
        icon: 'fab fa-facebook',
        order: 1,
        isActive: true,
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com/connect-people',
        icon: 'fab fa-twitter',
        order: 2,
        isActive: true,
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/company/connect-people',
        icon: 'fab fa-linkedin',
        order: 3,
        isActive: true,
      },
    ]);
    
    console.log(`✅ ${socialLinks.length} liens sociaux créés`);
    
    // 5. Créer des liens d'app stores
    const appStoreLinks = await AppStoreLink.create([
      {
        store: 'App Store',
        url: 'https://apps.apple.com/app/connect-people',
        order: 1,
        isActive: true,
      },
      {
        store: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.connectpeople',
        order: 2,
        isActive: true,
      },
    ]);
    
    console.log(`✅ ${appStoreLinks.length} liens d'app stores créés`);
    
    // 6. Créer des options de navigation
    const navOptions = await NavOption.create([
      // Options entreprendre
      {
        code: 'business-plan',
        name: {
          fr: 'Business Plan',
          en: 'Business Plan',
          ar: 'خطة العمل',
          de: 'Geschäftsplan',
          es: 'Plan de negocio',
          it: 'Piano aziendale',
          pt: 'Plano de negócios',
        },
        menu: 'entreprendre',
        order: 1,
        isActive: true,
      },
      {
        code: 'funding',
        name: {
          fr: 'Financement',
          en: 'Funding',
          ar: 'التمويل',
          de: 'Finanzierung',
          es: 'Financiación',
          it: 'Finanziamento',
          pt: 'Financiamento',
        },
        menu: 'entreprendre',
        order: 2,
        isActive: true,
      },
      // Options immobilier
      {
        code: 'buy',
        name: {
          fr: 'Acheter',
          en: 'Buy',
          ar: 'شراء',
          de: 'Kaufen',
          es: 'Comprar',
          it: 'Acquistare',
          pt: 'Comprar',
        },
        menu: 'immobilier',
        order: 1,
        isActive: true,
      },
      {
        code: 'rent',
        name: {
          fr: 'Louer',
          en: 'Rent',
          ar: 'إيجار',
          de: 'Mieten',
          es: 'Alquilar',
          it: 'Affittare',
          pt: 'Alugar',
        },
        menu: 'immobilier',
        order: 2,
        isActive: true,
      },
      // Options traduction
      {
        code: 'document-translation',
        name: {
          fr: 'Traduction de documents',
          en: 'Document translation',
          ar: 'ترجمة الوثائق',
          de: 'Dokumentübersetzung',
          es: 'Traducción de documentos',
          it: 'Traduzione documenti',
          pt: 'Tradução de documentos',
        },
        menu: 'traduction',
        order: 1,
        isActive: true,
      },
      {
        code: 'certified-translation',
        name: {
          fr: 'Traduction certifiée',
          en: 'Certified translation',
          ar: 'ترجمة معتمدة',
          de: 'Beglaubigte Übersetzung',
          es: 'Traducción certificada',
          it: 'Traduzione certificata',
          pt: 'Tradução certificada',
        },
        menu: 'traduction',
        order: 2,
        isActive: true,
      },
    ]);
    
    console.log(`✅ ${navOptions.length} options de navigation créées`);
    
    console.log('🎉 Seed terminé avec succès !');
    console.log('\n📊 Résumé des données créées :');
    console.log(`- ${users.length} utilisateurs`);
    console.log(`- ${adminUsers.length} administrateurs`);
    console.log(`- ${searchCategories.length} catégories de recherche`);
    console.log(`- ${socialLinks.length} liens sociaux`);
    console.log(`- ${appStoreLinks.length} liens d'app stores`);
    console.log(`- ${navOptions.length} options de navigation`);
    
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Exécuter le seed
seedDatabase();






